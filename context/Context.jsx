import { createContext, useContext, useState } from 'react'

const BooksContext = createContext()

export const BooksProvider = (props) => {
	const [searchQuery, setSearchQuery] = useState('')
	return (
		<BooksContext.Provider value={{ searchQuery, setSearchQuery }}>
			{props.children}
		</BooksContext.Provider>
	)
}

export const useBooksContext = () => useContext(BooksContext)
