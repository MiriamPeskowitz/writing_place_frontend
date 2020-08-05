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
			<p><button class="site-to-show-page-button" data-id=${this.id}>Visit/Write about this site</button></p>	
			<p><button class="return-to-topics">Back</button></p>	
			//feature make this button return to topics and make them visible, and make the sites cards disappear 
			

			`

			// feature: in CSS, add border around each card, get them to stack up, etc
	}
}

Site.all = []