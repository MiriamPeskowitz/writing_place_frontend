const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')

	fetchTopics()
	writeButtonHandler()

//when topic button is clicked, sites show up on the page
//put it belo
	// document.querySelector(".write-button")
})


function fetchTopics() {
	console.log("fetch Topics")
	fetch(topicsEndPoint)
	.then(response => response.json())
	.then(topics => {
		console.log("topics data: ", topics)
		// structure = data.attributes.name
		topics.data.forEach(topic => {
			
			let newTopic = new Topic(topic, topic.attributes)
			console.log("topic: ", newTopic.name)
		
			document.querySelector('#topics').innerHTML += newTopic.renderTopicCard()

		})
		//add catch
	})
}

//add button handler to get the id from e.target.dataset 
function writeButtonHandler() {
	document.addEventListener('click', (e) => {
		if (e.target.className == "write-button") {
			// console.log(e.target.dataset.id)
			//found the exact id of that whole class that I want: 
			let id = e.target.dataset.id
			fetchSites(id)
		}
	} )
}
// 'http://localhost:3000/users/`${current_user.id}`/events',
//start here -- get the endpoint right 
function fetchSites(id) {
	// console.log(id)
	console.log(topicsEndPoint +`/${id}`)
	fetch(topicsEndPoint +`/${id}`) 
	//check association, can i do topic.relationships.sites.data.id ---- 
	//or call data.relationships.topic.data.id == id

	// .then(console.log("fetch sites worked"))
	//next: get full topic.site data to fetch, and make cards to render each of the 8
	//do a fetch topics like the fetch sites above, with class and renderTopicsCard 
 
 	 .then(response => response.json())
 	 .then(sites => {
 	 	let allSites = sites.data.attributes.sites
 	 	allSites.forEach(site => {
 	 			// console.log(site.name, site.id)
 	 			let newSite = new Site(site)
 	 			// console.log(newSite)
	 			document.querySelector('#sites').innerHTML += newSite.renderSiteCard()
	 			document.querySelector("#topics").innerHTML = " "; 
				//feature: add "Return to Topics "button that puts the TOPic buttons back 
				//next: make write button work so note space appears 
 	 	}) 	 // add catch 	
 	 })
 	
}


