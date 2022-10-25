import { dataTypes } from '../constants/constants'
import no_cover from '../public/no_cover.png'

export const formatData = (book) => {
	const id = book.id

	// Some authors have a weird 'graf' word in them
	const authors = book.authors.map((author) =>
		author.name.replace(', graf', '')
	)

	const translators = book.translators.map((translator) => translator.name)

	const title = book.title

	const mediaType = dataTypes[book.media_type]

	const languageName = new Intl.DisplayNames(['en'], { type: 'language' })
	const languages = book.languages.map((lang) =>
		languageName.of(lang).toLowerCase()
	)

	const cover = setCover(book.formats['image/jpeg'])
	const formats = book.formats
	const subjects = book.subjects
	const downloadCount = book.download_count
	const copyright = book.copyright

	return {
		id,
		authors,
		translators,
		title,
		mediaType,
		languages,
		cover,
		formats,
		subjects,
		downloadCount,
		copyright,
	}
}

const setCover = (link) => {
	if (link) {
		return link.includes('small') ? link.replace('small', 'medium') : link
	}
	return no_cover
}
