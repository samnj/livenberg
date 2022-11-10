import { useEffect, useState } from 'react'

import BookList from '../components/BookList'
import FilterBar from '../components/FilterBar'
import { useFetchUserBooks } from '../utils/queryTools'
import { useCountBooks } from '../utils/queryTools'

const Library = () => {
	const [filter, setFilter] = useState('')
	const [isDoneFetching, setIsDoneFetching] = useState(false)

	const {
		data: books,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		fetchNextPage,
	} = useFetchUserBooks()

	const { data: countQuery } = useCountBooks()

	useEffect(() => {
		if (books) {
			const scrollPosition = sessionStorage.getItem('scrollPosition')
			if (scrollPosition) {
				window.scrollTo(0, parseInt(scrollPosition, 10))
				sessionStorage.removeItem('scrollPosition')
			}
		}
	}, [books])

	if (!books) return <></>

	if (isLoading && isFetching)
		return (
			<div className='text-xl font-bold mt-20'>Looking for your books...</div>
		)

	if (books) {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
			sessionStorage.setItem('scrollPosition', window.pageYOffset)
		}

		if (!hasNextPage && books.pages[0].count > 0 && !isDoneFetching) {
			setIsDoneFetching(true)
		}

		const booklist = isDoneFetching
			? books.pages.flatMap((page) => page.books)
			: books

		return (
			<div className='max-w-md mt-3 grow lg:mt-8 md:max-w-2xl w-full lg:max-w-7xl'>
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
