const endPoint = "http://localhost:3000/api/v1/sites"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')
	fetchSites()
	
})

function fetchSites() {
	fetch(endPoint)
 	 .then(response => response.json())
 	 .then(sites => {
 	 	console.log("sites: ", sites )
 	 })
 	 // add catch
}