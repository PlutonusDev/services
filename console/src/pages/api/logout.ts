import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { UserInfo } from "../../lib/session";

async function logoutRoute(req: NextApiRequest, res: NextApiResponse<UserInfo>) {
	await req.session.destroy();

	res.json({
		authorized: false
	});
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
