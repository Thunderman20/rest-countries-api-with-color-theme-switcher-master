searchBar.addEventListener("input", () => {
	const searchText = searchBar.value.trim().toLowerCase()
	const results = data.filter(country =>
		fuzzyMatch(country.name.common.toLowerCase(), searchText),
	)
	if (results.length > 0) {
		const country = [results[0]]
		renderCards(country)
	}
	if (results.length > 1) {
		const countries = [...results]
		renderCards(countries)
	}
})

function fuzzyMatch(str, searchText) {
	return str.startsWith(searchText)
}
