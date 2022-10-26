import { PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ['query', 'info', 'warn', 'error'],
	})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
