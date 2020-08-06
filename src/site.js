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
			<img src=${this.image} height="300" width="300">
			<p>${this.description}</p>
			
			<form data-id=${this.id}>
			   <label>My Writing, near ${this.name}</label><br><br>
	  	       <textarea id="note-body" name="note" rows="30" cols="50"></textarea>
				<br>
				<button class="save-note-button" data-id=${this.id} >Save Note</button>
			</form>	
			
			<button id="return-to-topics">Coming Soon: Back to Topics</button>	
			`	
	}
}
Site.all = []
//feature make this button return to topics and make them visible, and make the sites cards disappear 

// feature: in CSS, add border around each card, get them to stack up, etc
	