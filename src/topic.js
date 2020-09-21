class Topic {
	constructor(topic, topicAttributes){
		this.id = topic.id
		this.name = topicAttributes.name

		Topic.all.push(this)
	}
	renderTopicCard() {
		return `
			<div data-id=${this.id}>
			   <h3>${this.name}</h3>
			   <button type="button" class="see-sites-button" data-id=${this.id}>See Sites</button>
				<button type="button" id="show-writing-button">Coming Soon: Show My Writing</button>
			</div>	`
	}
}
Topic.all = []

// Feature Add: add image_url to Topics
//Feature Add: CSS so the line up vertically 