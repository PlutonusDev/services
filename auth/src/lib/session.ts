import type { IronSessionOptions } from "iron-session";

export type UserInfo = {
	authorized: boolean,
	username?: string,
}

export const sessionOptions: IronSessionOptions = {
	password: process.env.COOKIE_PWD as string,
	cookieName: "nyxa-auth",
	cookieOptions: {
		secure: true
	}
}

declare module "iron-session" {
	interface IronSessionData {
		user?: UserInfo
	}
}
