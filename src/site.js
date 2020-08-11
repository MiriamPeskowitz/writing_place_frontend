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
		  <section data-id=${this.id}>	
			<h3>${this.id}. ${this.name}</h3>
			<img src=${this.image}>
			<p>${this.description}</p>
			<h4>My Writing, near ${this.name}</h4>
			<br><br>
			<div id="completed-text"></div>
			<form id="note-form" data-id=${this.id}>
	  	       <textarea id="noteBody" name="note" rows="20" cols="50"></textarea>
				<br>
				<button class="save-note" type='submit' data-id=${this.id}>Save Note</button>
			</form>	
			<div id="buttons">
				<button id="return-to-topics">Coming Soon: Back to Topics</button>	
			</div>
		  </section>`	
	}
}	
Site.all = []