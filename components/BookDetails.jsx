import { Dialog } from '@headlessui/react'
import Image from 'next/image'

import { BOOK_URL } from '../constants/constants'
import AddBookBtn from './AddBookBtn'
import Authors from './Authors'
import DownloadBtn from './DownloadBtn'

const BookDetails = ({ isOpen, setIsOpen, book }) => {
	const {
		id,
		authors,
		translators,
		title,
		mediaType,
		languages,
		cover,
		downloadCount,
		copyright,
	} = book

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className='fixed inset-0 z-50 flex items-center justify-center bg-zinc-50/60 backdrop-blur-sm'
		>
			<Dialog.Panel className='flex max-w-md items-center overflow-y-auto max-h-5/6 w-4/5 flex-col rounded-sm border border-zinc-200  bg-zinc-100 py-6 px-2'>
				<div className='mb-4 flex h-36 w-28 self-center md:h-44 md:w-36'>
					<Image
						src={cover}
						width={200}
						height={200}
						alt=''
						className='rounded-sm drop-shadow-md'
					/>
				</div>
				<div
					title={title}
					className='mb-1 md:mt-2 text-lg md:text-xl self-center text-center font-bold max-w-sm w-full'
				>
					{title}
				</div>

				<div className='flex flex-col md:mt-4 md:text-xl gap-1 w-full max-w-sm'>
					<Authors authors={authors} isDetails={true} isTranslators={false} />
					{translators.length > 0 && (
						<Authors
							authors={translators}
							isDetails={true}
							isTranslators={true}
						/>
					)}
					<div>
						<span className='font-semibold'>Media type:</span> {mediaType}
					</div>
					<div>
						<span className='font-semibold'>Languages:</span>{' '}
						{languages.join(', ')}
					</div>
					<div>
						<span className='font-semibold'>Copyright:</span>{' '}
						{copyright ? 'yes' : 'no'}
					</div>
					<div>
						<span className='font-semibold'>Downloads:</span> {downloadCount}
					</div>
				</div>

				<div className='flex mt-4 md:mt-6 md:gap-3 gap-2 max-w-sm w-full'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.7}
						stroke='currentColor'
						className='w-4 md:w-5 md:h-5 h-4 cursor-pointer'
						onClick={() => setIsOpen(false)}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
						/>
					</svg>
					<AddBookBtn id={id} />
					<DownloadBtn book_url={BOOK_URL} id={id} />
				</div>
			</Dialog.Panel>
		</Dialog>
	)
}

export default BookDetails
