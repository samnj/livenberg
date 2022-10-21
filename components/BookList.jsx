import { Fragment } from 'react'

import { useCountBooks } from '../utils/query'
import Book from './Book'
import BookListHeader from './BookListHeader'
import BookTypeLegend from './BookTypeLegend'

const BookList = ({ data }) => {
	const results = data.pages[0].count
	const query = data.pages[0].originalQuery

	const { data: countQuery } = useCountBooks()

	return (
		<div className='mb-10 flex w-full grow flex-col items-center justify-start gap-x-2 gap-y-4 px-4'>
			<BookListHeader results={results} query={query} countQuery={countQuery} />

			<BookTypeLegend />
			{data.pages.map((page) => (
				<Fragment key={page.next}>
					{page.books.map((book) => (
						<Book key={book.id} book={book} />
					))}
				</Fragment>
			))}
		</div>
	)
}

export default BookList
