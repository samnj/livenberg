import { useRouter } from 'next/router'
import { useFetchBooks } from '../../utils/query'
import BookList from '../../components/BookList'
import InvalidQuery from '../../components/InvalidQuery'

const Books = () => {
	const router = useRouter()

	const validateQuery = (query) => {
		return query.books === 'books' && query?.search?.length > 3 ? true : false
	}

	const { data, isLoading } = useFetchBooks({
		query: router.query.search,
		isEnabled: validateQuery(router.query),
	})

	if (data) return <BookList data={data} />

	if (!validateQuery(router.query)) return <InvalidQuery />
}

export default Books
