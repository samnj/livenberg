import { dataTypes } from '../constants/constants'
import audiobookCover from '../public/audiobookCover.png'
const languageName = new Intl.DisplayNames(['en'], { type: 'language' })

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
		.map((lang) => languageName.of(lang))
		.join(', ')
	const coverUrl = setCover(book.formats['image/jpeg'])

	const formats = book.formats

	return {
		id,
		authors,
		translators,
		title,
		mediaType,
		languages,
		coverUrl,
		formats,
	}
}

const setCover = (url) => {
	if (url) {
		return url.includes('small') ? url.replace('small', 'medium') : url
	}
	return audiobookCover
}
