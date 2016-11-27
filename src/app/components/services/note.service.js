export class NoteService {
 //TODO: Note vs Book
  constructor($http, $q, APIURL, moment) {
    'ngInject';

    Object.assign(this, {
      $http, $q, APIURL, moment
    });

    this.notes = [];
    this.books = [];
    this.tags = [];
  }

  getNotes() {
    if (this.notes.length) {
      return this.$q.resolve(this.notes);
    }
    return this.$http.get(this.APIURL + '/notes').then(res => {
      this.notes = res.data.notes;
      return this.notes;
    });
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
    return this.$http.get(this.APIURL + '/notes/' + id).then(res => {
      let note = this.notes.find(note => note.id === id) || {};
      return Object.assign(note, res.data.note);
    });
  }

  newNote(note) {
    return this.$http.post(this.APIURL + '/notes/', note).then(res => {
      let note = res.data.note;
      this.notes.push(note);
      this.books.push(note.book);
      this.tags.push(note.tags); //update
      return res.data;
    });
  }

  updateNote(id, note) {
    return this.$http.put(this.APIURL + '/notes/' + id, note).then(res => {
      let note = res.data.note;
      this.notes.push(note); //update
      this.books.push(note.book);
      this.tags.push(note.tags);
      return res.data;
    });
  }

  deleteNote(id) {
    return this.$http.delete(this.APIURL + '/notes/' + id).then(res => {
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
