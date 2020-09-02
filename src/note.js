class Note {
	constructor(note, noteAttributes) {
		this.id = parseInt(note.id)
		this.body = noteAttributes.body
		this.title = noteAttributes.title
		this.siteId = noteAttributes.site.id

		Note.all.push(this)
	}
	
}
Note.all = []