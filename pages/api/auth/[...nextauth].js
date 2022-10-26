import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import prisma from '../../../lib/prismadb'

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	debug: true,
	events: {
		async signIn(message) {
			/* on successful sign in */
		},
		async signOut(message) {
			/* on signout */
		},
		async createUser(message) {
			/* user created */
		},
		async updateUser(message) {
			/* user updated - e.g. their email was verified */
		},
		async linkAccount(message) {
			/* account (e.g. Twitter) linked to a user */
		},
		async session(message) {
			/* session is active */
		},
	},
}

export default NextAuth(authOptions)
