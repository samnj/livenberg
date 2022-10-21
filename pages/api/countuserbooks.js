import { unstable_getServerSession } from 'next-auth'

import prisma from '../../lib/prismadb'
import { authOptions } from '../api/auth/[...nextauth]'

const countUserBooks = async (req, res) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ msg: 'Please log in' })
		return
	}

	try {
		const count = await prisma.user.findMany({
			where: {
				email: session.user.email,
			},
			include: {
				_count: {
					select: {
						books: true,
					},
				},
			},
		})
		res.status(200).send(count[0]._count.books)
	} catch (error) {
		res.status(500).json({ error: 'Failed to count user books' })
	}
}

export default countUserBooks
