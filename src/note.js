class Note {
	constructor(note, noteAttributes) {
		this.noteId = note.id 
		this.body = noteAttributes.body
		this.title = noteAttributes.title
		this.siteId = noteAttributes.site_id
		//this.site_id =

		Note.all.push(this)
	}

	renderNoteCard() {
	
		console.log("cc")
	}
}
Note.all = []