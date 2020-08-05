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
			   <button class="write-button" data-id=${this.id}>Write</button>
			</div>	`
	}
}
Topic.all = []

// Feature Add: add image_url to Topics
//Feature Add: CSS so the line up vertically 