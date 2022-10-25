import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { API_URL } from '../constants/constants'
import { formatData } from './formatBookData'

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

// USER	HOOKS

const fetchUserBooks = async (query, { pageParam = 0 }) => {
	const url = pageParam || API_URL + query

	if (query === 'books?ids=') {
		return { count: 0, books: [], next: null }
	}

	const res = await axios.get(url)
	const results = res.data.results
	const formatedResults = results.map((result) => formatData(result))
	return {
		count: res.data.count,
		books: formatedResults,
		next: res.data.next,
	}
}

export const useFetchUserBooks = () => {
	const savedBooks = useQuery(
		['savedBooks'],
		async () => {
			return await axios.get('/api/userbooks')
		},

		{ refetchOnWindowFocus: true }
	)

	const ids =
		savedBooks.data !== undefined && savedBooks.data.data.length > 0
			? savedBooks.data.data.map((book) => book.bookId).join(',')
			: ''

	const query = `books?ids=${ids}`

	const books = useInfiniteQuery(
		['fetchedUserBooks', query],
		(queryFnCtx) => fetchUserBooks(query, queryFnCtx),
		{
			getNextPageParam: (lastPage) => lastPage.next ?? undefined,
			keepPreviousData: true,
			refetchOnMount: false,
			refetchOnWindowsFocus: false,
		}
	)

	return books
}

export const useAddBook = () => {
	const queryClient = useQueryClient()

	return useMutation(
		(data) => {
			return axios.patch('/api/addbooks', data)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['savedBooks'])
				queryClient.invalidateQueries(['booksCount'])
				toast.success('book added to library')
			},
		}
	)
}

export const useDeleteBook = () => {
	const queryClient = useQueryClient()

	return useMutation(
		(data) => {
			return axios.delete('/api/deletebook', { data })
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['savedBooks'])
				queryClient.invalidateQueries(['booksCount'])
				toast.success('book deleted from library')
			},
		}
	)
}

export const useCountBooks = () => {
	return useQuery(['booksCount'], async () => {
		return await axios.get('/api/countuserbooks')
	})
}
