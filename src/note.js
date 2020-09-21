
//think about how I would use this: as a way to show all notes? 
//would have to parse through the notes. where would I do this? 
class Note {
	constructor(note, noteAttributes) {
		this.id = parseInt(note.id)
		this.body = noteAttributes.body
		// this.title = noteAttributes.title
		this.siteId = noteAttributes.site.id

		Note.all.push(this)
	}

	static findById(id) {
		return this.all.find(note => note.id === id)
	}

}
Note.all = []