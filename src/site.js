class Site {
	constructor(data) {
		
		this.id = parseInt(data.id)
		this.name = data.attributes.name
		this.image = data.attributes.image_url
		this.description = data.attributes.description
		this.topicId = parseInt(data.relationships.topic.data.id)
		this.notes = data.attributes.notes
	

		Site.all.push(this)
	}


	renderSiteList() {
		const notes = this.notes.map(note => {	
			return `<li> ${note.body} </li>`
		})
		
		const joinedNotes = notes.join()
		// console.log(joinedNotes)

		return  `
				<h3> ${this.name} </h3>
				<img src=${this.image} width="100" height="100">
				<p>${this.description}</p>
				<br>
		  		<ul id="newest-note"></ul>
				<ul id="notes">${joinedNotes} </ul>
				<div id="new-note"></div>
				<button class="explore-and-write-button" data-id=${this.id}>Explore and Write</button>
				<p>**************</p>
			</div>`
	}



//Decided to renderNoteForm here, as part of site.js
	renderNoteForm() {
		return  `
			<div id="note-card" data-id=${this.id}>
				<h3> ${this.name} </h3>
				<img src=${this.image} width="100" height="100">
				<p>${this.description}</p>
				<br>
				<ul id="newest-note"></ul>
				<form id="note-form">
		  	       <label>Reflecting near ${this.name}</label>
		  	       <br>
		  	       <ul id="newest-note"></ul>
		  	       <textarea id="note-body" rows="20" cols="50" ></textarea>
					<br>
					<div id="buttons">
						<button type='submit' id="save-note" data-id=${this.id} >Save Note</button>
						 <br>
						 <br>	

						<button type="button" id="return-to-sites">Back to Site List</button>
						<button type="button" id="return-to-topics">Back to Topics</button>	
					</div>
				</form>
			</div>	`
	}

	static findById(id) {
		return this.all.find(site => site.id === id)
	}
}
Site.all = []