import Image from 'next/image'
import { useState } from 'react'

import { BOOK_URL } from '../constants/constants'
import AddBookBtn from './AddBookBtn'
import Authors from './Authors'
import BookDetails from './BookDetails'
import DownloadBtn from './DownloadBtn'
import LanguageTags from './LanguageTags'

const Book = ({ book }) => {
	const { id, authors, title, mediaType, languages, cover } = book

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			className={`relative mx-auto flex h-28 w-full justify-between rounded-md border-l-[6px] bg-zinc-50 text-xs drop-shadow-sm 
        ${
					mediaType === 'ebook'
						? 'border-red-400'
						: mediaType === 'audiobook'
						? 'border-blue-400'
						: 'border-green-400'
				}
      `}
		>
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
					<div title={title} className={'mb-1 text-sm font-bold line-clamp-2'}>
						{title}
					</div>
					<Authors authors={authors} isDetails={false} isTranslators={false} />
				</div>
				<LanguageTags langArr={languages} />
			</div>

			<div className='absolute bottom-0 right-0 flex items-center justify-center gap-2 pr-2 pb-2'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.7}
					stroke='currentColor'
					className='h-4 w-4 cursor-pointer'
					onClick={() => setIsOpen(!isOpen)}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
					/>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
					/>
				</svg>

				<BookDetails isOpen={isOpen} setIsOpen={setIsOpen} book={book} />
				<AddBookBtn id={id} />
				<DownloadBtn book_url={BOOK_URL} id={id} />
			</div>
		</div>
	)
}

export default Book
