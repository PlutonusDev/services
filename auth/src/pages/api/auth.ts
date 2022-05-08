import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { UserInfo } from "../../lib/session";

async function authRoute(req: NextApiRequest, res: NextApiResponse<UserInfo>) {
	if(req.session.user && req.session.user.token) {
		return res.json({
			authorised: true,
			...req.session.user
		});
	} else {
		return res.json({
			authorised: false
		});
	}
}

export default withIronSessionApiRoute(authRoute, sessionOptions);
