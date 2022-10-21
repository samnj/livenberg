import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import BookList from '../components/BookList'
import { useFetchUserBooks } from '../utils/query'

const Library = () => {
	const router = useRouter()
	const session = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/')
		},
	})

	const {
		data: books,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		fetchNextPage,
	} = useFetchUserBooks(session.status === 'authenticated')

	if (!books) return <></>

	if (isLoading && isFetching)
		return (
			<div className='text-xl font-bold mt-20'>Looking for your books...</div>
		)

	if (books) {
		console.log(books.pages[0].count)
		return <BookList data={books} />
	}

	if (hasNextPage && !isFetchingNextPage) {
		console.count('fetching next page...')
		fetchNextPage()
	}
}

export default Library
