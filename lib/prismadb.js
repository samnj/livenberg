import { PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

const prisma =
	global.prisma ||
	new PrismaClient({
		log: ['query'],
	})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
