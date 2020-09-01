class Note {
	constructor(note, noteAttributes) {
		this.id = parseInt(note.id)
		this.body = noteAttributes.body
		this.title = noteAttributes.title
		this.siteId = noteAttributes.site.id

		Note.all.push(this)
	}
	renderNoteForm(id) {
		return  `
			<div ${this.id}>
				<h3>${this.name}</h3>
				<img src=${this.image}>
				<p>${this.description}</p>
				<form id="note-form" data-id=${this.id}>
		  	       <label>Writing near ${this.name}</label
		  	       <textarea id="noteBody" name="note" rows="20" cols="50"${this.noteBody}></textarea>
					<br>
					<button class="save-note" type='submit'>Save</button>
				</form>
			</div>	`
	}
}
Note.all = []