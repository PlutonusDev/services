import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	if(req.session.user) {
		res.json({
			authorised: true,
			...req.session.user
		});
	} else {
		res.json({
			authorised: false,
		});
	}
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
