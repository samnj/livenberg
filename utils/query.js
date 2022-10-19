import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { API_URL } from '../constants/constants'
import { formatData } from '../utils/formatBookData'

const fetchBooks = async ({ queryKey, pageParam = 0, signal }) => {
	const originalQuery = queryKey[1]
	const query = formatQuery(queryKey[1])
	const url = pageParam || API_URL + query
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
		originalQuery,
	}
}

const formatQuery = (query) => {
	return 'books?search=' + query?.replaceAll('+', '%20')
}

export const useFetchBooks = ({ query, isEnabled }) => {
	const books = useInfiniteQuery(['books', query], fetchBooks, {
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

// USER	HOOKS

export const useFetchUserBooks = (isSession) => {
	const savedBooks = useQuery(
		['savedBooks'],
		async () => {
			return await axios.get('/api/userbooks')
		},

		{ refetchOnWindowFocus: false, enabled: isSession }
	)

	const ids =
		savedBooks.data !== undefined
			? savedBooks.data.data.map((book) => book.bookId).join(',')
			: null

	const query = `books?ids=${ids}`

	const isEnabled = ids !== null && isSession

	const books = useInfiniteQuery(
		['fetchedUserBooks'],
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
		(data) => {
			return axios.post('/api/addbooks', data)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['savedBooks'])
				queryClient.invalidateQueries(['fetchedUserBooks'])
				toast.success('book added to library')
			},
		}
	)
}
