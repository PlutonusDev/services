import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function AuthorizeRoute(req: NextApiRequest, res: NextApiResponse) {
	const { token } = await req.query;

	try {
		const user = await prisma.user.findUnique({
			where: { auth: token }
		});
		if(!user) return res.status(400).json({ authorized: false });

		req.session.user = {
			authorised: true,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email
		}
		await req.session.save();
		res.json({ authorised: true, firstName: user.firstName });
	} catch(error) {
		console.log(error);
		return res.status(500).json({ authorized: false, message: (error as Error).message });
	}
}

export default withIronSessionApiRoute(AuthorizeRoute, sessionOptions);
