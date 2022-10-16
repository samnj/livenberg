const langColors = {
	english: 'bg-red-400',
	french: 'bg-blue-400',
	italian: 'bg-green-400',
	spanish: 'bg-orange-400',
	german: 'bg-yellow-400',
	other: 'bg-violet-400',
}

const LanguageTags = ({ langArr }) => {
	return (
		<div className='space-x-1'>
			{langArr.map((lang) => (
				<span
					key={lang}
					className={`w-min rounded-lg px-2 py-px text-xs lowercase drop-shadow-sm
	          ${
							langColors.hasOwnProperty(lang)
								? langColors[lang]
								: langColors['other']
						}
	        `}
				>
					{lang}
				</span>
			))}
		</div>
	)
}

export default LanguageTags
