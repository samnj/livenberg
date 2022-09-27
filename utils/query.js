import axios from 'axios'
import {
	useInfiniteQuery,
	useQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { formatData } from '../utils/formatBookData'
import { API_URL } from '../constants/constants'
import { toast } from 'react-hot-toast'

const fetchBooks = async ({ queryKey, pageParam = 0, signal }) => {
	const url = pageParam || API_URL + queryKey[1]
	const res = await axios.get(url, { signal })
	const results = res.data.results
	if (results.length === 0) {
		throw new Error('no results found')
	}
	const formatedResults = results.map((result) => formatData(result))
	return {
		count: res.data.count,
		books: formatedResults,
		next: res.data.next,
	}
}

const formatQuery = (query) => {
	return 'books?search=' + query?.replaceAll('+', '%20')
}

export const useFetchBooks = ({ query, isEnabled }) => {
	const books = useInfiniteQuery(['books', formatQuery(query)], fetchBooks, {
		getNextPageParam: (lastPage) => lastPage.next ?? undefined,
		keepPreviousData: true,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: isEnabled,
	})
	return books
}

const fetchUserBooks = async (query, { pageParam = 0 }) => {
	const url = pageParam || API_URL + query
	const res = await axios.get(url)
	const results = res.data.results
	const formatedResults = results.map((result) => formatData(result))
	return {
		count: res.data.count,
		books: formatedResults,
		next: res.data.next,
	}
}

export const useFetchUserBooks = (isSession) => {
	const bookIds = useQuery(
		['userBooksIds'],
		async () => {
			const res = await axios.get('/api/userbooks')
			const ids = res?.data.map((obj) => obj.book_id)
			return ids
		},

		{ refetchOnWindowFocus: false, enabled: isSession }
	)

	const ids = bookIds.data !== undefined ? bookIds.data.join(',') : null
	const query = `books?ids=${ids}`

	const isEnabled = ids !== null && isSession ? true : false

	const books = useInfiniteQuery(
		['userBooks'],
		(queryFnCtx) => fetchUserBooks(query, queryFnCtx),
		{
			getNextPageParam: (lastPage) => lastPage.next ?? undefined,
			keepPreviousData: true,
			refetchOnWindowsFocus: false,
			enabled: isEnabled,
		}
	)

	return books
}

export const useAddBook = () => {
	const queryClient = useQueryClient()

	return useMutation(
		(bookId) => {
			return axios.post('/api/addbooks', bookId)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['userBooksIds'])
				queryClient.invalidateQueries(['userBooks'])
				toast.success('book added to library')
			},
		}
	)
}
