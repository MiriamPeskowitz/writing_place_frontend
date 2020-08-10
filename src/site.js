class Site {
	constructor(site) {
		this.topicId = site.topic_id
		this.id = site.id
		this.name = site.name
		this.image = site.image_url
		this.description = site.description


		Site.all.push(this)
	}
	renderSiteCard() {
		return  `
			<p>${this.id}. ${this.name}</p>
			<img src=${this.image}>
			<p>${this.description}</p>
			
			<form>
			   <label>My Writing, near ${this.name}</label><br><br>
			   <p id="completed-text"></p>
	  	       <textarea id="noteBody" name="note" rows="30" cols="50"></textarea>
				<br>
				<button class="save-note" type='submit' data-id=${this.id}>Save Note</button>
			</form>	
			
			<button id="return-to-topics">Coming Soon: Back to Topics</button>	
			`	
	}	

// <button class="site-to-show-page-button" data-id=${this.id}>Visit/Write about this site</button>

//how to do the note 
	// renderNoteForm() {
	// 	return ` 
	// 		<form data-id=${this.id}>
	// 		   <label>My Writing, near ${this.name}</label><br><br>
	//   	       <textarea id="noteBody" name="note" rows="50" cols="50"></textarea>
	// 			<button type='submit'>Save Note</button>
	// 			<button id="return-to-list">Return to List (w/o saving)</button>
	// 		</form>	
	// 		`
	// }

}
			//feature make this button return to topics and make them visible, and make the sites cards disappear 

			// feature: in CSS, add border around each card, get them to stack up, etc
	
// 	renderSiteNotesCord() {
// 		console.log('render site notes card ')
// 		const writingCard =  `
// 			<form data-id=${this.noteId}>
// 			   <label>My Writing, near ${this.name}</label><br><br>
// 	  	       <textarea id="noteBody" name="note" rows="50" cols="50"></textarea>
		   
// 				<button type='submit'>Save Note</button>
// 				<button id="return-to-list">Return to List (w/o saving)</button>
// 			</form>`
// 		return writingCard	
// }
//then put it somewhere in the DOM -- right beneath, appended below the data already there. 
Site.all = []