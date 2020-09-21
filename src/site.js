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
				<button class="explore-and-write-button" data-id=${this.id}>Explore and Write</button>
				<p>**************</p>
			</div>`
	}

	renderNoteForm() {
		return  `
			<div id="note-card" data-id=${this.id}>
				<h3> ${this.name} </h3>
				<img src=${this.image} width="100" height="100">
				<p>${this.description}</p>
				<br>
				<form id="note-form">
		  	       <label>Reflecting near ${this.name}</label>
		  	       <br>
		  	       <textarea  name="note" rows="20" cols="50" ></textarea>
					<br>
					<div id="buttons">
						<button type='submit' class="save-note" data-id=${this.id} >Save Note</button>
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