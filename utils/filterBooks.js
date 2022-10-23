export const filterBooks = (books, filter) => {
	return filter
		? books.filter(
				({ title, authors }) =>
					title.toLowerCase().includes(filter) ||
					authors.some((author) => author.toLowerCase().includes(filter))
		  )
		: books
}
