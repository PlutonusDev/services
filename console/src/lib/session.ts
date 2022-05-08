import type { IronSessionOptions } from "iron-session";

export type UserInfo = {
	authorized: boolean,
	tokens?: {
		access?: string,
		refresh?: string
	},
	ids?: {
		alyn: string,
		discord: string
	},
	username?: string,
	avatarUrl?: string,
}

export const sessionOptions: IronSessionOptions = {
	password: process.env.COOKIE_PWD as string,
	cookieName: "alyn-auth",
	cookieOptions: {
		secure: true
	}
}

declare module "iron-session" {
	interface IronSessionData {
		user?: UserInfo
	}
}
