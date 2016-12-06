export class NoteEditorService {
 //TODO: Note vs Book
  constructor($http, $q, APIURL, moment, notesService) {
    'ngInject';

    Object.assign(this, {
      $http, $q, APIURL, moment, notesService
    });

    this.notes = [];
    this.books = [];
    this.tags = [];
  }

  getEmptyNote() {
    return {
        title: '',
        content: '',
        html: '',
        status: 'draft',
        date: this.moment().format(),
        book: '',
        tags: []
    };
  }

  getNote(id) {
    let note = this.notes.find(note => note.id === id);
    if (note && angular.isDefined(note.content)) {
      return this.$q.resolve(note);
    }
    return this.NotesService.getNote(id).then(res => {
      let note = this.notes.find(note => note.id === id) || {};
      return Object.assign(note, res.data.note);
    });
  }

  getNotes() {
    return this.notesService.getNotes().then(res => {
      let notes = res.data.notes;
      this.notes.push(note);
      this.books.push(note.book);
      this.tags.push(note.tags); //update
      return res.data;
    });
  }

  newNote(note) {
    return this.NotesService.newNote(id).then(res => {
      let note = res.data.note;
      this.notes.push(note);
      this.books.push(note.book);
      this.tags.push(note.tags); //update
      return res.data;
    });
  }

  updateNote(id, note) {
    let _note = this.notes.find(note => note.id === id);
    if (_note && angular.isDefined(_note.content)) {
        _note = note;
    }

    return this.NotesService.updateNote(id, note).then(res => {
      let note = res.data.note;
      this.notes.push(note); //update
      this.books.push(note.book);
      this.tags.push(note.tags);
      return res.data;
    });
  }

  deleteNote(id) {
    return this.NotesService.deleteNote(id).then(res => {
      this.notes = [];
      this.books = [];
      this.tags = [];
      return res.data;
    });
  }

  getBooks() {
    if (this.books.length) {
      return this.$q.resolve(this.books);
    }
    return this.$http.get(this.APIURL + '/books').then(res => {
      this.books = res.data.books;
      return res.data;
    });
  }

  getTags() {
    if (this.tags.length) {
      return this.$q.resolve(this.tags);
    }
    return this.$http.get(this.APIURL + '/tags').then(res => {
      this.tags = res.data.tags;
      return res.data;
    });
  }
}
