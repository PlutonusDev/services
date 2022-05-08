import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "./user";

async function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	await req.session.destroy();

	res.json({
		authorized: false
	});
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
