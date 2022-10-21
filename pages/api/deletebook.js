import { unstable_getServerSession } from 'next-auth'

import prisma from '../../lib/prismadb'
import { authOptions } from '../api/auth/[...nextauth]'

const deleteBook = async (req, res) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ msg: 'Please log in' })
		return
	}

	try {
		await prisma.book.deleteMany({
			where: {
				bookId: req.body.bookId,
				ownerEmail: session.user.email,
			},
		})
		res.status(200).json({ msg: `deleted book ${req.body.bookId}` })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Failed to remove book' })
	}
}

export default deleteBook
