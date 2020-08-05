class Topic {
	constructor(topicAttributes){
		this.id = topicAttributes.id
		this.name = topicAttributes.name
		Topic.all.push(this)
	}
	renderTopicCard() {
		return `
			<div data-id=${this.id}>
			   <h3>${this.name}</h3>
			   <button data-id=${this.id}>Write</button>
			</div>	`
	}
}
Topic.all = []

// Feature Add: add image_url to Topics
//Feature Add: CSS so the line up vertically 