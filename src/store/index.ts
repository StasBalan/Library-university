import Vue from 'vue';
import Vuex from 'vuex';

// modules
import books from './modules/books/books.store';
import writers from './modules/writers/writers.store';
import readers from './modules/readers/readers.store';
import readerBooks from './modules/reader-books/reader-books.store';

Vue.use(Vuex);

export function createStore(api: any) {
  return new Vuex.Store({
    modules: {
      books: books(api),
      writers: writers(api),
      readers: readers(api),
      readerBooks: readerBooks(api)
    }
  });
}
