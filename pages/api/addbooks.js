import prisma from '../../lib/prismadb'

const addbooks = async (req, res) => {
	try {
		await prisma.user.update({
			where: {
				email: req.body.userEmail,
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
		res.status(500).json({ error: 'Failed to add book' })
	}
}

export default addbooks
