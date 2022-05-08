import type { User } from "../user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const emptyUser = {
	loggedIn: false,
	id: "",
	username: "",
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	const { body } = req;
	let check = await prisma.user.findUnique({
		where: { email: body.email }
	});
	if(check) return res.status(400).json({ msg: "A member with that email already exists!", ...emptyUser });

	const salt = bcrypt.genSaltSync(10); // 10 iterations
	const password = bcrypt.hashSync(body.password, salt)

	const user = await prisma.user.create({
		data: {
			firstName: body.firstName,
			lastName: body.lastName,
			dob: body.dob,
			email: body.email,
			password,
			auth: crypto.randomBytes(32).toString("hex")
		}
	});

	const userObj = {
		authorised: true,
		firstName: user.firstName,
		token: user.auth
	}

	req.session.user = userObj;
	await req.session.save();

	return res.status(200).json(userObj);
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
