const sitesEndPoint = "http://localhost:3000/api/v1/sites"
const topicsEndPoint = "http://localhost:3000/api/v1/topics"
const notesEndPoint = "http://localhost:3000/api/v1/notes"
const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('loaded')
	fetchTopics()
	seeSitesButtonHandler()
})


// 1 -- DOM loads and topic list is fetched and put on the DOM 
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


//2 A button handler is added to each topic, so that a user can click the button and see that topic's list of sites. EventListener is attached to the document/parent, uses e.target matching to catch the correct button click. 
function seeSitesButtonHandler() {
	console.log('writeButtonHandler')
	document.addEventListener('click', (e) => {
		if (e.target.className == "see-sites-button") {
			let topicId = e.target.dataset.id
			console.log("topicId: ", topicId)
			fetchSites(topicId)
		}
	})
}

// 3 This function is called by SeeSitesButtonHandler. It fetches the list of sites, creates the object through sites.js. The topicId is passed in, and then a matcher is used to filter only sites that match that topic's id number

function fetchSites(topicId) {
	console.log('sites fetched')

	fetch(sitesEndPoint)  
 	 .then(response => response.json())
 	 .then(sites => {
 	 		let allSites = sites.data
 	 	// console.log("allSites: ", allSites)

 	 	//render the sites
 	 		allSites.forEach(site => {
 	 		if (site.relationships.topic.data.id === topicId) {
	 		let newSite = new Site(site)

 			document.querySelector('#sites').innerHTML += newSite.renderSiteList()
 
 			hideTopicList()
			
			//prepare to send ids to the button 
			let siteId = newSite.id
			let topicId = newSite.topicId
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
		hideExploreAndWriteButton()
		hideSiteList()
		//two other buttons are included in form render 			
	})
}

//was getNoteData(siteId)
//this is what I'm trying to figure out. 
//5 this function gives functionality to the Save note button. It collects the value in the note's content, and adds an event listener and calls postNote. 
function handleSaveNoteButton(siteId) {
	// console.log("siteId: ",  siteId)


	document.getElementsByClassName("save-note").addEventListener('submit', (e) => {
		e.preventDefault()
		console.log("here")
		if (e.target.className === "save-note") {
			alert('yes')
			// console.log(e.target.dataset.id)
			//found the exact id of that whole class that I want: 
			const id = e.target.dataset.id
			const noteBodyInput = document.querySelector("#noteBody").value
			console.log("id: ", id)
			console.log("noteBody :", noteBodyInput)

			alert('ready to post')
			// postNote(noteBodyInput, id)	
		}
	})
}


//user picks a site and starts to write a note. Need features: make sure the button has an event listener' maybe add back in fetchsites, or in sites.js 
function postNote(body, site_id) {
	// e.preventDefault()
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
		// clear()
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

function hideExploreAndWriteButton() {
	document.querySelector('.explore-and-write-button').style.display = "none";
}

function hideTopicList() {
	document.querySelector("#topics").style.display = "none"; 
}

function hideSiteList() {
	document.querySelector('#sites').style.display = "none";
}
// function addShowSiteListButton() {
// 	// return-to-sites"
// 	const sites = document.querySelector("#sites")
// 	sites.addEventListener('click', (e) => {
// 		e.preventDefault()
// 		sites.style.display = "block"
	
// 		document.querySelector('#topics').style.display = "none";
// 	})
// 	// console.log("Back to Sites --showSiteListButton")
// 	// something.appendChild(showSiteListButton)
// }

function backToTopicsButton() {
	console.log("back to topics")
	document.querySelector('#topics').style.display = "block";
	//attach eventHandler to button 
	//hid sites, show Topics 
	// section id="notes" => style.display = "none"
	document.querySelector("#sites").style.display = "none"; 
	// Try display: unset or display: revert or display: normal or display: block 
}


function hideOtherSites() {
	console.log("Coming Soon:hideOtherSites")
	if (site.id !== this.id) {

	}
}

function showallSites() {
	document.querySelector('#sites').style.display = "block";

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
function fetchNotes(siteId){
	// console.log('fetchNotes')
	console.log('fetchnotes')
	document.querySelector('#writing-form').innerHTML = renderNoteForm(siteId)
	// document.querySelector("#sites").style.display = "none";  
	// renderNoteForm(siteId)
}

//feature, edit the content in the form 
//Feature: if the form already has some content, fetch that. 
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

// function renderNoteForm(siteId) {
// 		return  `
// 			<div ${siteId}>
// 				<h3>${this.name} ${siteId}</h3>
// 				<img src=${this.image}>
// 				<p>${this.description}</p>
// 				<form id="note-form" data-id=${this.id}>
// 		  	       <label>Reflecting near ${this.name}</label
// 		  	       <textarea id="noteBody" name="note" rows="20" cols="50"${this.noteBody}></textarea>
// 					<br>
// 					<button class="save-note" type='submit'>Save Note</button>
// 				</form>
// 			</div>	`
// }



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

