export class NoteService {

  constructor($http, $q, Config) {
    'ngInject';

    Object.assign(this, {
      $http, $q, Config
    });

    this.notes = [];
    this.books = [];
    this.tags = [];
  }

  getNotes() {
    if (this.notes.length) {
      return this.$q.resolve(this.notes);
    }
    return this.$http.get(this.Config.APIURL + '/notes').then(res => {
      this.notes = res.data;
      return res.data;
    });
  }

  getNote(slug) {
    let note = this.notes.find(note => note.slug === slug);
    if (note && angular.isDefined(note.content)) {
      return this.$q.resolve(note);
    }
    return this.$http.get(this.Config.APIURL + '/notes/' + slug).then(res => {
      let note = this.notes.find(note => note.slug === slug) || {};
      return Object.assign(note, res.data);
    });
  }

  updateNote(note) {
    return this.$http.note(this.Config.APIURL + '/notes/', note).then(res => {
      this.notes = [];
      this.books = [];
      this.tags = [];
      return res.data;
    });
  }

  deleteNote(id) {
    return this.$http.delete(this.Config.APIURL + '/notes/' + id).then(res => {
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
    return this.$http.get(this.Config.APIURL + '/books').then(res => {
      this.books = res.data;
      return res.data;
    });
  }

  getTags() {
    if (this.tags.length) {
      return this.$q.resolve(this.tags);
    }
    return this.$http.get(this.Config.APIURL + '/tags').then(res => {
      this.tags = res.data;
      return res.data;
    });
  }
}
