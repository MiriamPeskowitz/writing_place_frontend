class Site {
	constructor(data) {
		
		this.id = parseInt(data.id)
		this.name = data.attributes.name
		this.image = data.attributes.image_url
		this.description = data.attributes.description
		this.topicId = parseInt(data.relationships.topic.data.id)
		this.noteBody = data.attributes.notes
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
				<br>
				<button class="explore-and-write-button" data-id=${this.id}>Explore and Write</button>
				<p>**************</p>
			</div>`
	}

	renderNoteForm(id) {
		return  `
			<div ${this.id}>
				<h3>${this.name}</h3>
				<img src=${this.image}>
				<p>${this.description}</p>
				<form id="note-form" data-id=${this.id}>
		  	       <label>Writing near ${this.name}</label
		  	       <textarea id="noteBody" name="note" rows="20" cols="50"${this.noteBody}></textarea>
					<br>
					<button class="save-note" type='submit'>Save</button>
				</form>
			</div>	`
	}
		 //  <section>	
			// <h3>${this.id}. ${this.name}</h3>
			// <img src=${this.image}>
			// <p>${this.description}</p>
			// <h4>My Writing, near ${this.name}</h4>
			// <br><br>
			// <div id="completed-text"></div>
			// <form id="note-form" data-id=${this.id}>
	  // 	       <label>Writing near ${this.name}</label
	  // 	       <textarea id="noteBody" name="note" rows="20" cols="50"${this.noteBody}></textarea>
			// 	<br>
			// 	<button class="save-note" type='submit'>Save</button>
			// </form>	
			// <div id="buttons">
			// 	<button id="return-to-topics">Coming Soon: Back to Topics</button>	
			// </div>
		 //  </section>

	

	static findById(id) {
		return this.all.find(note => note.id === id)
	}
}
	// this.topicId = site.relationships.topic.data.id
// 		this.id = site.id
// 		this.name = site.attributes.name
// 		this.image = site.attributes.image_url
// 		this.description = site.attributes.description

Site.all = []