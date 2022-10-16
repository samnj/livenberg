import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import BookList from '../../components/BookList'
import InvalidQuery from '../../components/InvalidQuery'
import { useFetchBooks } from '../../utils/query'
import { useFetchUserBooks } from '../../utils/query'

const Books = () => {
	const session = useSession()
	useFetchUserBooks(session.status === 'authenticated')

	const router = useRouter()

	const validateQuery = (query) => {
		return query.books === 'books' && query?.search?.length > 3 ? true : false
	}

	const { data, isLoading, isFetching } = useFetchBooks({
		query: router.query.search,
		isEnabled: validateQuery(router.query),
	})

	if (data) return <BookList data={data} />

	if (Object.keys(router.query).length !== 0 && !validateQuery(router.query))
		return <InvalidQuery />
}

export default Books
