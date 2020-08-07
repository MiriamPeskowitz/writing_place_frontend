const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const notesEndPoint = "http://localhost:3000/api/v1/notes"
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

 	 	}) 		
 	 }).catch(error => console.log(error))
}

//4 event listener for "save-note-button", grabs data, sends to PostFetch request 
// Check all the values, it's something like this 
function createNoteFormHandler(e) {
	e.preventDefault()
	const noteBodyInput = document.querySelector("#note-body").value
	// console.log(noteBodyInput)
	if (e.target.className == "save-note-button") {
		let siteId = e.target.dataset.id
		// console.log(siteId)
		let topic_id = 
		postNote(noteBodyInput, siteId)
	}
}

// Start here on Thursday 
function postNote(body, site_id) {
	console.log('body, site_id: ', body, site_id)
	let bodyData = {body, site_id}
	//need to add topic
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
		console.log(newNote)
		document.querySelector("#notes").innerHTML =+ newNote.renderNoteCard();
	})
	.catch(error => console.log(error))
}
// will be something like this: make sure names fit backend Ruby 
// function postSyllabus(title, description, image_url, category_id) {
// 	//make image_url and category_id snakecase, even though it's JS => 
//   // confirm these values are coming through properly
//   console.log(title, description, image_url, category_id);
//   // build body object
//   let bodyData = {title, description, image_url, category_id}
//   fetch(endPoint, {
// 	    // POST request
// 	    method: "POST",
// 	    headers: {"Content-Type": "application/json"},
// 	    body: JSON.stringify(bodyData)
// 	  })
// 	  .then(response => response.json())
// 	  .then(syllabus => {
// 		console.log(syllabus)
// 		const syllabusData = syllabus.data
// 		//becuase of how it's nested 
// 	  	let newSyllabus = new Syllabus(syllabusData, syllabusData.attributes)
// 		document.querySelector('#syllabus-container').innerHTML += newSyllabus.renderSyllabusCard();

// 	   //  console.log("new data: ", syllabus);
// 	   //  const syllabusData = syllabus.data
// 	   //  // render JSON response
// 	   // render(syllabusData)
//   	})
// 	.catch(error => console.log(error))
//  }




