const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const notesEndPoint = "http://localhost:3000/api/v1/notes"
const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')

	fetchTopics()
	writeButtonHandler()
	

})


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
function writeButtonHandler() {
	document.addEventListener('click', (e) => {
		if (e.target.className == "write-button") {
			// console.log(e.target.dataset.id)
			//found the exact id of that whole class that I want: 
			let id = e.target.dataset.id
			console.log("id: ", id)
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
			const button = document.querySelector(".save-note")
			button.addEventListener('click', (e) => getNoteData(e))

 	 	}) 	
 	 }).catch(error => console.log(error))
}
// function makeNoteSaveButton() {

// }

function getNoteData(e) {
	e.preventDefault()

	const noteBodyInput = document.querySelector("#noteBody").value
	console.log("noteBody :", noteBodyInput)

	document.addEventListener('click', (e) => {
		if (e.target.className == "save-note") {
			// console.log(e.target.dataset.id)
			//found the exact id of that whole class that I want: 
			let id = e.target.dataset.id
			console.log("site-id: ", id)
			postNote(noteBodyInput, id)	
		}
	})
}


//4 user picks a site and starts to write a note. Need features: make sure the button has an event listener' maybe add back in fetchsites, or in sites.js 
function postNote(body, site_id) {
	console.log("got to postNote")
	console.log('body, site_id: ', body, site_id)
	let bodyData = {body, site_id}
	fetch(notesEndPoint, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(bodyData)
	})
	.then(response => response.json())
	.then(note => {
		console.log("note: ", note)
		const noteData = note.data
		let newNote = new Note(noteData, noteData.attributes)
		console.log("newNote: ", newNote)
// 		//what's the goal: keep it in the area, start collecting it for the big one. 
		document.querySelector("#notes").innerHTML =+ newNote
		document.querySelector("#noteBody").value = ""
	})
	.catch(error => console.log(error))
}
// should be site: 
		//At the end: feature: text appears, above where the note was, #noteBody.innerHTML = ''
