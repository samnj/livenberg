import { unstable_getServerSession } from 'next-auth'

import prisma from '../../lib/prismadb'
import { authOptions } from '../api/auth/[...nextauth]'

const addbooks = async (req, res) => {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		res.status(401).json({ msg: 'Please log in' })
		return
	}

	try {
		await prisma.user.update({
			where: {
				email: session.user.email,
			},
			data: {
				books: {
					create: {
						bookId: req.body.bookId,
					},
				},
			},
		})

		res.status(200).json({ msg: `Succesfully added book ${req.body.bookId}` })
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: 'Failed to add book' })
	}
}

export default addbooks
