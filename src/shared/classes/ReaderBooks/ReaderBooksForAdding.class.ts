import moment from "moment";

export default class ReaderBooksForAdding {
  reader_id: number | null;
  book_id: number | null;
  start_at: string;

  constructor() {
    this.reader_id = null;
    this.book_id = null;
    this.start_at = moment().format("YYYY-MM-DD");
  }
}
