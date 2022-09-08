import { useRouter } from 'next/router'
import { useGetBooks } from '../utils/query'
import { useQueryClient } from '@tanstack/react-query'
import BookList from '../components/BookList'
import { lastSuccessfulQuery } from '../utils/helpers'

const Books = () => {
	const queryClient = useQueryClient()
	const queryCache = queryClient.getQueryCache()

	const router = useRouter()
	const { data, isLoading } = useGetBooks({
		query: router.asPath,
		isEnabled: true,
	})
	if (data) return <BookList data={data} />
	return <div>[books]</div>
}

export default Books
