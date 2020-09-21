const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const notesEndPoint = "http://localhost:3000/api/v1/notes"
const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')
	fetchTopics()
	seeSitesButtonHandler()
	showMyWritingButtonHandler()
})


// 1 -- DOM loads and topic list is fetched and put on the DOM 
function fetchTopics() {
	// console.log("fetch Topics")
	fetch(topicsEndPoint)
	.then(response => response.json())
	.then(topics => {
		console.log("topics data: ", topics)
		topics.data.forEach(topic => {
			
			const newTopic = new Topic(topic, topic.attributes)
			// console.log("topic: ", newTopic.name)
		
			document.querySelector('#topics').innerHTML += newTopic.renderTopicCard()
		})
	})
	.catch(error => console.log(error))
}


//2 A button handler is added to each topic, so that a user can click the button and see that topic's list of sites. EventListener is attached to the document/parent, uses e.target matching to catch the correct button click. 
function seeSitesButtonHandler() {
	console.log('writeButtonHandler')
	document.addEventListener('click', (e) => {
		if (e.target.className === "see-sites-button") {
			let topicId = e.target.dataset.id
			// console.log("topicId: ", topicId)
			fetchSites(topicId)
		}
	})
}

//additional button handler, for the showMyWriting Feature-- shows all notes on a topic, so you can edit them. 
//add feature: show only when there is content in the notes 
function showMyWritingButtonHandler() {
	console.log('showMyWritingButtonHandler')
	document.addEventListener('click', (e) => {
		if (e.target.id === "show-writing-button") {
		alert("ShowMyWriting button clicked")
	//feature: build this out
		}
	})
}


// 3 This function is called by SeeSitesButtonHandler. It fetches the list of sites, creates the object through sites.js. The topicId is passed in, and then a matcher is used to filter only sites that match that topic's id number
function fetchSites(topicId) {
	console.log('sites fetched')
	fetch(sitesEndPoint)  
 	 .then(response => response.json())
 	 .then(sites => {
 	 	const allSites = sites.data
 	 	// console.log("allSites: ", allSites)

 	 //render the sites
 	 		allSites.forEach(site => {
 	 		if (site.relationships.topic.data.id === topicId) {
	 		let newSite = new Site(site)

 			document.querySelector('#sites').innerHTML += newSite.renderSiteList()
 			//bug to fix: on previously clicked on element in list, button is not visible. 
 			showExploreAndWriteButton()

 	//UI features:
 			hideTopicList()
 	//add showSites() for loading after initial fetch. Can add: 
 		//if document.querySelector('#sites').style.display = "none";, then showSites()
 			showSites()
	
	//grab to send ids to the handleExploreAndWrite button 
			const siteId = newSite.id
			const topicId = newSite.topicId
			// console.log("siteId", siteId)
	//do I need this second one, if already have topicId on top? 
			handleExploreAndWriteButton(siteId, topicId)
			}
 	 	}) 	
 	 }).catch(error => console.log(error))
}

//4 User clicks Explore and Write button and a form renders so user can write a note. The event listener is attached to the document/parent, and the siteId is generated using e.target.dataset.id, and uses the static function Site.findById(id) to render the form.
function handleExploreAndWriteButton(siteId) {
	document.getElementById("sites").addEventListener('click', (e) => {
		const siteId = parseInt(e.target.dataset.id)
		const site = Site.findById(siteId)
	// console.log("site:", site)

	//Bug: it's going through 10 times... deal with this later 
		document.querySelector('#writing-form').innerHTML = site.renderNoteForm()
		console.log("note opened", siteId)

		hideSiteList()
		handleReturnToSitesButton()
		handleReturnToTopicsButton()
		handleSaveNoteButton(siteId)			
	})
}

//5 Two navigation buttons. Add: something modal about how the note content won't be saved 
function handleReturnToSitesButton() {
	document.getElementById('return-to-sites').addEventListener('click', () => {	
			// console.log('here at RTS button')
			hideNoteForm()
			showSites()
		})
}

function handleReturnToTopicsButton() {
	document.getElementById('return-to-topics').addEventListener('click', () => {
			// console.log('here at RTT button')
			hideNoteForm()
			hideSiteList()
			showTopics()			
		})
}
 
//6 User clicks Save note button. This function adds an event listener, collects the value in the note's content,  and calls postNote. 
function handleSaveNoteButton(siteId) {
	document.getElementById("note-form").addEventListener('submit', e => {
		e.preventDefault();
		const id = siteId
		const noteBodyInput = e.target.querySelector('textarea').value
		console.log("id: ", id)
		console.log("noteBody:", noteBodyInput)
		saveNote(noteBodyInput, id)	
	})
}

//7.Save note to db
function saveNote(body, site_id) {	
	console.log('here at PostNote: body, site_id: ', body, site_id)
	const bodyData = {body, site_id}
	fetch(notesEndPoint, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(bodyData)
	})
	.then(response => response.json())
	.then(note => {
		
		const noteData = note.data
		const newNote = new Note(noteData, noteData.attributes)
		console.log("newNote: ", newNote)
		
		clear()
	})
	.catch(error => console.log(error))
}

//bug: user clicks edit button and it remakes itself! 
function showEditButton() {
	let editButton = document.createElement("button")
	editButton.innerHTML = (`Coming Soon: Edit/Add More </button>`)	
	// editButton.addAttribute -- data-id
	let buttonSection = document.getElementById("buttons")
	buttonSection.appendChild(editButton)
}



// A series of UI buttons for showing and hiding sections
function clear() {
		// emptyNoteBody()
		// hideNoteForm()
		showEditButton()
		// showMyWritingButton() -- add back	
		// showSites()
}

function emptyNoteBody() {
	document.querySelector("#noteBody").value = ""
}

function hideNoteForm() {
	document.querySelector('#note-card').style.display = "none";
}


function hideExploreAndWriteButton() {
	document.querySelector('.explore-and-write-button').style.display = "none";
}

function showExploreAndWriteButton() {
	document.querySelector('.explore-and-write-button').style.display = "block";
}

function hideTopicList() {
	document.querySelector("#topics").style.display = "none"; 
}

function showTopics() {
	document.querySelector("#topics").style.display = "block";
}

function hideSiteList() {
	document.querySelector('#sites').style.display = "none";
}

function showSites() {
	document.querySelector("#sites").style.display = "block";
	// "return-to-sites"
}

//TODO
//1. add field so that your new writing/note will appear next time fetch is called on. 
//2. add section so you can see all your notes together, and edit them. -- fetchNotes

 
//Works for site #1, but not for the others. Figure out why, and fix
// function fetchNotes(siteId){
// 	// console.log('fetchNotes')
// 	console.log('fetchnotes')
// 	document.querySelector('#writing-form').innerHTML = renderNoteForm(siteId)
// 	// document.querySelector("#sites").style.display = "none";  
// 	// renderNoteForm(siteId)
// }

// placeNote = document.getElementById("completed-text")
// 		placeNote.innerHTML = newNote.body
		// placeNote.setAttribute('data-id',newNote.id)