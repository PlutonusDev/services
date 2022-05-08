import type { UserInfo } from "../../lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	const { email, password } = await req.body;

	try {
		let user = await prisma.user.findUnique({ where: { email } });

		if(!user) return res.status(401).json({ authorized: false });

		bcrypt.compare(password, user.password).then(async match => {
			if(!match) return res.status(401).json({ authorized: false });

			req.session.user = {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				token: user.auth
			};
			await req.session.save();
			res.json({ authorised: true, firstName: user.firstName, token: user.auth });
		});
	} catch(e) {
		console.log(e);
		res.status(500).json({ authorized: false, message: (e as Error).message });
	}
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
