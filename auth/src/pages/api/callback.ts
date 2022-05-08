import type { UserInfo } from "../../lib/session";
import fetch from "node-fetch";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	const { code } = await req.query;

	const tokens = await fetch("https://discord.com/api/oauth2/token", {
		method: "POST",
		body: new URLSearchParams({
			client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT,
			client_secret: process.env.DISCORD_SECRET,
			code,
			grant_type: "authorization_code",
			redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI,
			scope: "identify email guilds guilds.join"
		}),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(resp => resp.json()).catch(()=>{});
	if(!tokens) return res.status(400).json({ authorized: false });

	const userResp = await fetch("https://discord.com/api/users/@me", {
		headers: {
			authorization: `Bearer ${tokens.access_token}`
		}
	}).then(resp => resp.json()).catch(()=>{});
	if(!userResp.username) return res.status(400).json({ authorized: false });

	// TODO: Check if user is in DB and if not, add them.
	const user = await prisma.user.findUnique({
		where: { discord: userResp.id }
	});
	if(!user) {
		await prisma.user.create({
			data: {
				discord: userResp.id,
				email: userResp.email,
				username: userResp.username,
				password: "",
				avatarUrl: `https://cdn.discordapp.com/${userResp.avatar ? `avatars/${userResp.id}/${userResp.avatar}.${userResp.avatar.startsWith("a_") ? "gif" : "png"}?size=512` : `.png?size=512`}`,
				auth: tokens.access_token
			}
		});
	} else {
		await prisma.user.update({
			where: { discord: userResp.id },
			data: { auth: tokens.access_token }
		});
	}

	try {
		const resp = {
			authorized: true,
			tokens: {
				access: tokens.access_token,
				refresh: tokens.refresh_token
			},
			ids: {
				alyn: "NOT IMPLEMENTED",
				discord: userResp.id
			},
			username: userResp.username,
			avatarUrl: `https://cdn.discordapp.com/${userResp.avatar ? `avatars/${userResp.id}/${userResp.avatar}.${userResp.avatar.startsWith("a_") ? "gif" : "png"}?size=512` : `.png?size=512`}`
		} as UserInfo;

		req.session.user = resp;
		await req.session.save();
		res.json(resp);
	} catch(error) {
		res.status(500).json({ message: (error as Error).message });
	}
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
