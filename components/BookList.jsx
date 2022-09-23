import Image from 'next/future/image'
import { Fragment } from 'react'
import { useAddBook } from '../utils/query'

const BookList = ({ data }) => {
	return data ? (
		<div className='my-10 flex w-2/3 grow flex-col items-center justify-center gap-x-2 gap-y-4'>
			{data.pages.map((page) => (
				<Fragment key={page.next}>
					{page.books.map((book) => (
						<Book key={book.id} book={book} />
					))}
				</Fragment>
			))}
		</div>
	) : (
		<div>no hay data</div>
	)
}

const Book = ({ book }) => {
	const { id, authors, translators, title, mediaType, languages, coverUrl } =
		book

	const mutation = useAddBook()

	const handleAdd = (e) => {
		e.preventDefault()
		mutation.mutate({ id })
	}

	return (
		<div className='mx-auto flex w-full flex-col rounded-md bg-zinc-50 py-4 px-2 text-xs drop-shadow-sm'>
			<div className='mb-4 flex justify-center'>
				<Image
					src={coverUrl}
					width={200}
					height={200}
					alt=''
					className='w-40 rounded-sm drop-shadow-md'
				/>
			</div>
			<div className={'pt-1 text-base font-bold'}>{title}</div>
			<div className={' text-sm italic underline underline-offset-1'}>
				{authors.map((author) => (
					<span key={author} className={'block'}>
						{author}
					</span>
				))}
			</div>
			{/* <div>{translators}</div> */}
			<div>{languages}</div>
			<div>{mediaType}</div>
			<button onClick={(e) => handleAdd(e)}>+</button>
		</div>
	)
}

export default BookList
