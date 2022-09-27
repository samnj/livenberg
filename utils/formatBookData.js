import { dataTypes } from '../constants/constants'
import audiobookCover from '../public/audiobookCover.png'

export const formatData = (book) => {
	const id = book.id
	const authors = []
	book.authors.forEach((author) => {
		authors.push(author.name)
	})

	const title = book.title
	// const translators = []
	// book.translators.forEach((translator) => translators.push(translator.name))
	const translators = book.translators
		.map((translator) => translator.name)
		.join('; ')

	const mediaType = dataTypes[book.media_type]
	const languages = book.languages

	const cover = setCover(book.formats['image/jpeg'])

	const formats = book.formats

	return {
		id,
		authors,
		translators,
		title,
		mediaType,
		languages,
		cover,
		formats,
	}
}

const setCover = (link) => {
	if (link) {
		return link.includes('small') ? link.replace('small', 'medium') : link
	}
	return audiobookCover
}
