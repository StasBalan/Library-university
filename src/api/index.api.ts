import URLS from './url-pathes';

import books from './endpoints/books/books.api';
import writers from './endpoints/writers/writers.api';
import readers from './endpoints/readers/readers.api';
import readerBooks from './endpoints/reader-books/reader-books.api'; 

export default (httpClient: any) => ({
  books: books(httpClient, URLS.BOOKS),
  writers: writers(httpClient, URLS.WRITERS),
  readers: readers(httpClient, URLS.READERS),
  readerBooks: readerBooks(httpClient, URLS.READER_BOOKS)
});
