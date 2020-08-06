const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')

	fetchTopics()
	sitesButtonHandler()
	

})

// what to do with this? Clarify document.addEventListener noteButtonHandler()
function noteButtonHandler() {
	const openNote = document.querySelector("#notes-button")
	openNote.addEventListener("click", () => renderNoteForm())
	document.querySelector('#notes').innerHTML = site.renderNoteForm()
}
// 1
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
	})
	.catch(error => console.log(error))
}


//2 add button handler to get the id from e.target.dataset 
function sitesButtonHandler() {
	document.addEventListener('click', (e) => {
		if (e.target.className == "write-button") {
			// console.log(e.target.dataset.id)
			//found the exact id of that whole class that I want: 
			let id = e.target.dataset.id
			fetchSites(id)
		}
	} )
}

// 3
function fetchSites(id) {
	console.log(topicsEndPoint +`/${id}`)
	fetch(topicsEndPoint +`/${id}`)  
 	 .then(response => response.json())
 	 .then(sites => {
 	 	let allSites = sites.data.attributes.sites 	
 	 	allSites.forEach(site => {
	 		let newSite = new Site(site)
 			document.querySelector('#sites').innerHTML += newSite.renderSiteCard()
 			//hide the topics: 
 			document.querySelector("#topics").style.display = "none"; 
			//find the css that collapses the space, too, display = none, visibility = visible
			//next: make write button work so note space appears 
			const button = document.querySelector(".save-note-button")
			button.addEventListener('click', (e) => createNoteFormHandler(e))

 	 	}) 	 // add catch 	
 	 })
}

//4 event listener for "save-note-button"

//Wed night: FIGURE OUT HOW I GET HERE USER CLICKS THE SAVE BUTTON -
// Check all the values, it's something like this 
function createNoteFormHandler(e) {
	e.preventDefault()
	const noteBodyInput = document.querySelector("#note-body").value
	console.log(noteBodyInput)
	if (e.target.className == "save-note-button") {
		let siteId = e.target.dataset.id
		postNote(noteBodyInput, siteId)
	}
}

function postNote() {
	console.log('got to postNote')
}
// const saveNote = document.querySelector("#notes-button")
// 	openNote.addEventListener("click", () => renderNoteForm())
// 	document.querySelector('#notes').innerHTML = site.renderNoteForm()
// }



