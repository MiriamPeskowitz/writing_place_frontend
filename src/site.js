class Site {
	constructor(data) {
		
		this.id = parseInt(data.id)
		this.name = data.attributes.name
		this.image = data.attributes.image_url
		this.description = data.attributes.description
		this.topicId = parseInt(data.relationships.topic.data.id)
		// this.noteBody = data.attributes.notes
		// add these so that 
		// add note.body = site
		// //add this.noteId = site.
		// constructor(note, noteAttributes) {
		// this.id = parseInt(note.id)
		// this.body = noteAttributes.body
		// this.title = noteAttributes.title
		// this.siteId = noteAttributes.site.id




		Site.all.push(this)
	}
	renderSiteList() {
		return  `
		  	<div id="site-card">
				<h3> ${this.name} </h3>
				<img src=${this.image} width="100" height="100">
				<p>${this.description}</p>
				<br>
				<div id="writing-form"></div>
				<button class="explore-and-write-button" data-id=${this.id}>Explore and Write</button>
				<p>**************</p>
			</div>`
	}

	renderNoteForm() {
		return  `
			<div>
				<form id="note-form" data-id=${this.id}>
		  	       <label>Reflecting near ${this.name}</label>
		  	       <br>
		  	       <textarea id=${this.noteBody} name="note" rows="20" cols="50" ></textarea>
					<br>
					<div id="buttons">
						<button class="save-note" type='submit'>Save Note</button>
						 <br>
						 <br>	
						<button id="return-to-sites">Coming Soon: Back to Site List</button>
						<button id="return-to-topics">Coming Soon: Back to Topics</button>	
					</div>
				</form>
			</div>	`
	}

	static findById(id) {
		return this.all.find(site => site.id === id)
	}
}
Site.all = []