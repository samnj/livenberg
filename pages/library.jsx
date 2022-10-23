import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import BookList from '../components/BookList'
import FilterBar from '../components/FilterBar'
import { useFetchUserBooks } from '../utils/queryTools'
import { useCountBooks } from '../utils/queryTools'

const Library = () => {
	const router = useRouter()
	const session = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/')
		},
	})

	const [filter, setFilter] = useState('')
	const [isDoneFetching, setIsDoneFetching] = useState(false)

	const {
		data: books,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		fetchNextPage,
	} = useFetchUserBooks(session.status === 'authenticated')

	const { data: countQuery } = useCountBooks()

	if (!books) return <></>

	if (isLoading && isFetching)
		return (
			<div className='text-xl font-bold mt-20'>Looking for your books...</div>
		)

	if (books) {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}

		if (!hasNextPage && books.pages[0].count > 0 && !isDoneFetching) {
			setIsDoneFetching(true)
		}

		const booklist = isDoneFetching
			? books.pages.flatMap((page) => page.books)
			: books

		return (
			<div className='max-w-md'>
				<FilterBar
					setFilter={setFilter}
					isDisabled={isDoneFetching ? false : true}
				/>
				<BookList
					data={booklist}
					countQuery={countQuery}
					isDoneFetching={isDoneFetching}
					filter={filter}
					setFilter={setFilter}
				/>
			</div>
		)
	}
}

export default Library
