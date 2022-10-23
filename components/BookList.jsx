import { Fragment } from 'react'

import { filterBooks } from '../utils/filterBooks'
import Book from './Book'
import BookListHeader from './BookListHeader'
import BookTypeLegend from './BookTypeLegend'

const BookList = ({ data, countQuery, isDoneFetching, filter, setFilter }) => {
	const { count, originalQuery } = isDoneFetching ? '' : data.pages[0]

	return (
		<div className='mb-10 max-w-md flex grow flex-col items-center justify-start gap-x-2 gap-y-4 px-4'>
			<BookListHeader
				results={count}
				query={originalQuery}
				countQuery={countQuery}
				filter={filter}
				setFilter={setFilter}
			/>

			<BookTypeLegend />

			{isDoneFetching
				? filterBooks(data, filter).map((book) => (
						<Book key={book.id} book={book} />
				  ))
				: data.pages.map((page) => (
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
