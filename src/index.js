const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const notesEndPoint = "http://localhost:3000/api/v1/notes"
const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')
	fetchTopics()
	seeSitesButtonHandler()
})


// 1 -- fetches topic list  and puts onto DOM 
function fetchTopics() {
	// console.log("fetch Topics")
	fetch(topicsEndPoint)
	.then(response => response.json())
	.then(topics => {
		console.log("topics data: ", topics)
		// structure = data.attributes.name
		topics.data.forEach(topic => {
			
			let newTopic = new Topic(topic, topic.attributes)
			// console.log("topic: ", newTopic.name)
		
			document.querySelector('#topics').innerHTML += newTopic.renderTopicCard()
		})
	})
	.catch(error => console.log(error))
}


//2 add button handler to get the id from e.target.dataset and call up the sites within a topic 
function seeSitesButtonHandler() {
	console.log('writeButtonHandler')
	document.addEventListener('click', (e) => {
		if (e.target.className == "see-sites-button") {
			let topicId = e.target.dataset.id
			console.log(topicId)
			fetchSites(topicId)
		}
	} )
}

// 3 fetch the list of 8 sites, through sites -- and change render site card to renderSiteList
//passing topicId is how the code makes sure to get only the sites for the chosen topic, see first line in allSites.forEach 
function fetchSites(topicId) {
	console.log('sites fetched')

	fetch(sitesEndPoint)  
 	 .then(response => response.json())
 	 .then(sites => {
 	 	//if (site.topic_id === id)
 	 	let allSites = sites.data
 	 	// console.log("allSites: ", allSites)

 	 	allSites.forEach(site => {
 	 		if (site.relationships.topic.data.id === topicId) {
	 		let newSite = new Site(site)

 			document.querySelector('#sites').innerHTML += newSite.renderSiteList()
 
 			//hide the topics: 
 			document.querySelector("#topics").style.display = "none";  
			//feature: find the css that collapses the space, too, display = none, visibility = visible
			
			let siteId = newSite.id
			// let topicId = newSite.topicId
			//do I need this second one, if already have topicId on top? 
		
			document.addEventListener('click', handleExploreAndWriteButton(siteId, topicId))
			//why does document work here as the parent, and hEAWB still knows which button 
			//to attach to? 
			}
 	 	}) 	
 	 }).catch(error => console.log(error))
}

//4 what happens after the button for each site is clicked: form opens up for user to record notes on
//namely: call renderFormCard() and hide the rest 
function handleExploreAndWriteButton(siteId, topicId) {
	console.log('here')
	console.log(siteId, topicId)
	document.querySelector('#writing-form').innerHTML = renderNoteForm(siteId)
	document.querySelector("#sites").style.display = "none";  
	// renderNoteForm(siteId)
}
	// if (e.target.className == "see-sites-button") {
	// 		let topicId = e.target.dataset.id
	// 		console.log(topicId)
	// 		fetchSites(topicId)
	// 	}
// function seeSitesButtonHandler() {
// 	console.log('writeButtonHandler')
// 	document.addEventListener('click', (e) => {
// 		if (e.target.className == "see-sites-button") {
// 			let topicId = e.target.dataset.id
// 			console.log(topicId)
// 			fetchSites(topicId)
// 		}
// 	} )

function renderNoteForm(siteId) {
		return  `
			<div ${this.id}>
				<h3>${this.name}</h3>
				<img src=${this.image}>
				<p>${this.description}</p>
				<form id="note-form" data-id=${this.id}>
		  	       <label>Reflecting near ${this.name}</label
		  	       <textarea id="noteBody" name="note" rows="20" cols="50"${this.noteBody}></textarea>
					<br>
					<button class="save-note" type='submit'>Save Note</button>
				</form>
			</div>	`
}



	// console.log("here")
	// console.log("siteId, topicId: ", siteId, topicId)
	//for this siteId, render the note form
	//for this function to work, I have to instantiate the object, with a fetch?  
	//that sounds right: fetchNote. It's like fetchNote for this single site and render the data in the Note form 
	//like the fetch above... use that syntax 
	// renderNoteForm() 
			// `<div ${this.id}>
			// 	<h3>${this.name}</h3>
			// 	<img src=${this.image}>
			// 	<p>${this.description}</p>
			// 	<form id="note-form" data-id=${this.id}>
		 //  	       <label>Reflecting near ${this.name}</label
		 //  	       <textarea id="noteBody" name="note" rows="20" cols="50"${this.noteBody}></textarea>
			// 		<br>
			// 		<button class="save-note" type='submit'>Save Note</button>
			// 	</form>
			// </div>	`


	//any render pulls the data with it, so the form includes the element and any data
	//there can by multiple notes for each one. 
	
		// if (e.target.className = "explore-and-write-button") {
		// 	// console.log(e.target.dataset.id)
		// 	let id = e.target.dataset.id
		// 	console.log("id: ", id)
		// }
 	// })
 

	// console.log("siteId, topciId:" , id, topicId)	


			// const seeSitesButton = document.getElementById("open-form")
			// // let siteId = site.id
			
			// let topicId = newSite.topicId
			// // console.log(siteId)
			// const seeSitesButton = document.getElementById("open-form")
			// seeSitesButton.addEventListener('click', (e) => handleExploreAndWriteButton(e,  topicId))


//this function grabs the values in the note -- ie, what the user wrote -- and passes it to postNote to be saved 
function getNoteData(siteId) {
	console.log("siteId: ",  siteId)
	// e.preventDefault()
	
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


//user picks a site and starts to write a note. Need features: make sure the button has an event listener' maybe add back in fetchsites, or in sites.js 
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
	// document.querySelector('topics').style.display = "block";
	//attach eventHandler to button 
	//hid sites, show Topics 
	// section id="notes" => style.display = "none"
	//toggle this: document.querySelector("#topics").style.display = "none"; Try display: unset or display: revert or display: normal or display: block 
}

//HANDLE FORM SUBMIT
 // handleFormSubmit(e) {
 //    e.preventDefault();
 //    const id = e.target.dataset.id;
 //    const note = Note.findById(id);
 //    const title = $(e.target)
 //      .find('input')
 //      .val();
 //    const content = $(e.target)
 //      .find('textarea')
 //      .val();

 //    const bodyJSON = { title, content };
 //    this.adapter.updateNote(note.id, bodyJSON)
 //    .then(updatedNote => {
 //      const note = Note.findById(updatedNote.id);
 //      note.update(updatedNote);
 //      this.addNotes();
 //    });
 //  }
//Works for site #1, but not for the others. Figure out why, and fix
