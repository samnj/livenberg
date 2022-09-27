import Image from 'next/future/image'
import { Fragment } from 'react'
import { BOOK_URL } from '../constants/constants'
import AddBookBtn from './AddBookBtn'
import LanguageTags from './LanguageTags'

const BookList = ({ data }) => {
	return (
		<div className='my-10 flex w-full grow flex-col items-center justify-center gap-x-2 gap-y-4 px-4'>
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

const Book = ({ book }) => {
	const { id, authors, translators, title, mediaType, languages, cover } = book

	return (
		<div className='relative mx-auto flex h-28 w-full justify-between rounded-md bg-zinc-50 text-xs drop-shadow-sm'>
			<div className='flex w-20 shrink-0'>
				<Image
					src={cover}
					width={200}
					height={200}
					alt=''
					className='rounded-sm drop-shadow-md'
				/>
			</div>

			<div className='flex grow flex-col justify-between p-2'>
				<div>
					<div className={'mb-1 text-sm font-bold'}>{title}</div>
					{authors.map((author) => (
						<div
							key={author}
							className={'text-sm italic underline underline-offset-1'}
						>
							{author}
						</div>
					))}
				</div>
				<LanguageTags langArr={languages} />
			</div>

			{/* <div>{translators}</div> */}
			<div className='absolute bottom-0 right-0 flex justify-center gap-2 pr-2 pb-2'>
				<AddBookBtn id={id} />
				<a
					title='download book'
					rel='noreferrer'
					target='_blank'
					href={BOOK_URL + id}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						className='h-4 w-4 stroke-emerald-600'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
						/>
					</svg>
				</a>

				{/* <div>{mediaType}</div> */}
			</div>
		</div>
	)
}

export default BookList
