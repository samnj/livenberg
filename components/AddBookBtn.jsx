import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { useAddBook, useDeleteBook } from '../utils/queryTools'

const AddBookBtn = ({ id }) => {
	const session = useSession()
	const addMutation = useAddBook()
	const deleteMutation = useDeleteBook()
	const queryClient = useQueryClient()

	const isSession = session.status === 'authenticated'
	const isAdded =
		isSession &&
		queryClient.getQueryData(['savedBooks']).data.filter((b) => b.bookId === id)
			.length > 0

	const handleClick = (e) => {
		e.preventDefault()

		if (!isSession) {
			toast.error('Log in to add book')
			return
		}

		if (isAdded) {
			deleteMutation.mutate({ bookId: id })
			return
		}
		addMutation.mutate({ bookId: id })
	}

	return (
		<button
			title={isAdded ? 'remove book' : 'save book'}
			className=''
			onClick={(e) => handleClick(e)}
		>
			{isAdded ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={2}
					className='h-4 w-4 stroke-red-400'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5'
					/>
				</svg>
			) : (
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
						d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
					/>
				</svg>
			)}
		</button>
	)
}

export default AddBookBtn
