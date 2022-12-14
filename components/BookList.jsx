import { Fragment } from 'react'

import { filterBooks } from '../utils/filterBooks'
import Book from './Book'
import BookListHeader from './BookListHeader'

const BookList = ({ data, countQuery, isDoneFetching, filter, setFilter }) => {
	const { count, originalQuery } = isDoneFetching ? '' : data.pages[0]

	return (
		<div className='mb-4 max-w-md md:max-w-2xl lg:max-w-7xl flex grow flex-col items-center justify-start'>
			<BookListHeader
				results={count}
				query={originalQuery}
				countQuery={countQuery}
				filter={filter}
				setFilter={setFilter}
			/>

			<div className='lg:gap-x-16 w-full lg:gap-y-10 md:gap-x-6 md:gap-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 flex grow flex-col justify-start self-start gap-x-2 gap-y-4 px-4'>
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
		</div>
	)
}

export default BookList
