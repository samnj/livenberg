import { unstable_getServerSession } from 'next-auth'

import prisma from '../../lib/prismadb'
import { authOptions } from '../api/auth/[...nextauth]'

const getUserBooks = async (req, res) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ msg: 'Please log in' })
		return
	}

	try {
		const getBooks = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
			include: {
				books: true,
			},
		})
		res.send(getBooks.books)
	} catch (error) {
		res.status(500).json({ error: 'Failed to retrieve user books' })
	}
}

export default getUserBooks
