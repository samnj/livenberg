import { Fragment } from 'react'

import Book from './Book'

const BookList = ({ data }) => {
	const results = data.pages[0].count
	const query = data.pages[0].originalQuery

	return (
		<div className='mb-10 flex w-full grow flex-col items-center justify-start gap-x-2 gap-y-4 px-4'>
			<div className='self-start text-xs line-clamp-1'>
				{results} results for &apos;{query}&apos;
			</div>
			<div className='my-2 flex gap-2 self-start text-xs drop-shadow-md'>
				<div className='flex gap-1 items-center'>
					<span className={`bg-red-400 h-2 w-2 rounded`}></span>
					<div className='mb-1'>ebook</div>
				</div>

				<div className='flex gap-1 items-center'>
					<span className={`bg-blue-400 h-2 w-2 rounded`}></span>
					<div className='mb-1'>audio</div>
				</div>

				<div className='flex gap-1 items-center'>
					<span className={`bg-green-400 h-2 w-2 rounded`}></span>
					<div className='mb-1'>other</div>
				</div>
			</div>
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
