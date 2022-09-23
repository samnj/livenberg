import Database from 'better-sqlite3'

const getUserBooks = (req, res) => {
	const db = new Database('./tempdb')
	const books = db.prepare('SELECT * FROM Books').all()
	db.close()
	res.status(200).send(books)
}

export default getUserBooks
