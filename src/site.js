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
			<button class="site-to-show-page-button" data-id=${this.id}>Visit/Write about this site</button>	
			`
	}
}

Site.all = []