import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import BookList from '../../components/BookList'
import InvalidQuery from '../../components/InvalidQuery'
import { useFetchBooks } from '../../utils/queryTools'
import { useFetchUserBooks } from '../../utils/queryTools'

const Books = () => {
	const session = useSession()
	useFetchUserBooks(session.status === 'authenticated')

	const router = useRouter()
	const { ref, inView } = useInView({
		rootMargin: '600px',
	})

	const validateQuery = (query) => {
		return query.books === 'books' && query?.search?.length > 3 ? true : false
	}

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useFetchBooks({
			query: router.query.search,
			isEnabled: validateQuery(router.query),
		})

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
			sessionStorage.setItem('scrollPosition', window.pageYOffset)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView])

	useEffect(() => {
		if (data) {
			const scrollPosition = sessionStorage.getItem('scrollPosition')
			if (scrollPosition) {
				window.scrollTo(0, parseInt(scrollPosition, 10))
				sessionStorage.removeItem('scrollPosition')
			}
		}
	}, [data])

	if (data)
		return (
			<div>
				<BookList data={data} />
				<div
					className='text-center h-4 mb-4 lg:text-2xl lg:h-10 text-lg animate-pulse text-neutral-800 font-semibold'
					ref={ref}
				>
					{isFetchingNextPage ? 'Loading...' : ''}
				</div>
			</div>
		)

	if (Object.keys(router.query).length !== 0 && !validateQuery(router.query))
		return <InvalidQuery />
}

export default Books
