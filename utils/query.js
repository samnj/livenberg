import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { formatData } from '../utils/formatBookData'
import { API_URL } from '../constants/constants'

export const fetchBooks = async ({ queryKey, pageParam = 0, signal }) => {
	const queryStr = queryKey[0]
	const url = pageParam || API_URL + queryStr
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

export const useGetBooks = ({ query, isEnabled }) => {
	const books = useInfiniteQuery([query], fetchBooks, {
		getNextPageParam: (lastPage) => lastPage.next ?? undefined,
		keepPreviousData: true,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: isEnabled,
	})
	return books
}
