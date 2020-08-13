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
	// console.log("fetch Topics")
	fetch(topicsEndPoint)
	.then(response => response.json())
	.then(topics => {
		// console.log("topics data: ", topics)
		// structure = data.attributes.name
		topics.data.forEach(topic => {
			
			let newTopic = new Topic(topic, topic.attributes)
			// console.log("topic: ", newTopic.name)
		
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
			// console.log("id: ", id)
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
			let siteId = site.id
			button.addEventListener('click', (e) => getNoteData(e, siteId))
 	 	}) 	
 	 }).catch(error => console.log(error))
}


function getNoteData(e, siteId) {
	console.log(e)
	e.preventDefault()
	
	const noteBodyInput = document.querySelector("#noteBody").value
	// console.log("noteBody :", noteBodyInput)

	document.addEventListener('click', (e) => {
		if (e.target.className == "save-note") {
			// console.log(e.target.dataset.id)
			//found the exact id of that whole class that I want: 
			let id = e.target.dataset.id
			console.log("site-id: ", id)
			postNote(e, noteBodyInput, id)	
		}
	})
}


//4 user picks a site and starts to write a note. Need features: make sure the button has an event listener' maybe add back in fetchsites, or in sites.js 
function postNote(e, body, site_id) {
	e.preventDefault()
	console.log('body, site_id: ', body, site_id)
	let bodyData = {body, site_id}
	fetch(notesEndPoint, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(bodyData)
	})
	.then(response => response.json())
	.then(note => {
		
		// console.log("note: ", note)
		const noteData = note.data
		let newNote = new Note(noteData, noteData.attributes)
		console.log("newNote: ", newNote)
		placeNote = document.getElementById("completed-text")
		placeNote.innerHTML = newNote.body
		// placeNote.setAttribute('data-id',newNote.id)
		clear()
	})
	.catch(error => console.log(error))
}
//add it so that your new writing will appear next time fetch is called on. 

		// give form an id and close it up. If id
function clear() {
		emptyNoteBody()
		hideNoteForm()
		addEditButton()	
}

function emptyNoteBody() {
	document.querySelector("#noteBody").value = ""
}

function hideNoteForm() {
	document.querySelector('form').style.display = "none";
}

function addEditButton() {
	let editButton = document.createElement("button")
	editButton.innerHTML = (`Coming Soon: Edit/Add More </button>`)	
	// editButton.addAttribute -- data-id
	let buttonSection = document.getElementById("buttons")
	buttonSection.appendChild(editButton)
}

function backToTopicsButton() {
	console.log("back to topics")
	//attach eventHandler to button 
	//hid sites, show Topics 
	// section id="notes" => style.display = "none"
	//toggle this: document.querySelector("#topics").style.display = "none"; Try display: unset or display: revert or display: normal or display: block 
}


//Works for site #1, but not for the others. Figure out why, and fix
