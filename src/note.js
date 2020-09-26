
//think about how I would use this: as a way to show all notes? 
//would have to parse through the notes. where would I do this? 
class Note {
	constructor(note) {
		this.id = parseInt(note.id)
		this.body = note.attributes.body
		this.siteId = note.attributes.site.id
		this.topicId = note.attributes.site.topic_id

		Note.all.push(this)
	}

	renderNote() {
		return  `<li id="newest-note">${this.body} <button id="edit-button">Edit</button></li>`
	}

	renderAllNotes() {
		//for each note, get this.body and send to theDOM 

	}

	static findById(id) {
		return this.all.find(note => note.id === id)
	}

}
Note.all = []