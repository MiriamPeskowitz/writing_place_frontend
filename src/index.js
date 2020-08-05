const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')

	fetchTopics()
	fetchSites()


	
})

// "topics"
function fetchTopics() {
	console.log("fetch Topics")
	fetch(topicsEndPoint)
	.then(response => response.json())
	.then(topics => {
		
		// data.attributes.name
		topics.data.forEach(topic => {
			
			let newTopic = new Topic(topic.attributes)
			console.log("topics: ", newTopic.name)
			//put it on the DOME
			document.querySelector('#topics').innerHTML += newTopic.renderTopicCard()

		})
		// MAKE TOPIC CLASS 
		
		})
}


function fetchSites() {
	fetch(sitesEndPoint)
 	 .then(response => response.json())
 	 .then(sites => {
 	 	console.log("sites: ", sites )
 	 })
 	 // add catch
}