const languageName = new Intl.DisplayNames(['en'], { type: 'language' })

const langColors = {
	en: 'bg-red-400',
	fr: 'bg-blue-400',
	it: 'bg-green-400',
	es: 'bg-orange-400',
	de: 'bg-yellow-400',
}

const LanguageTags = ({ langArr }) => {
	return (
		<div>
			{langArr.map((lang) => (
				<span
					key={lang}
					className={`w-min rounded px-[2px] py-px text-xs drop-shadow-sm
	          ${
							langColors.hasOwnProperty(lang)
								? langColors[lang]
								: 'bg-violet-400'
						}
	        `}
				>
					{languageName.of(lang)}
				</span>
			))}
		</div>
	)
}

export default LanguageTags
