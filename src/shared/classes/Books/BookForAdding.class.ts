export default class BookForAdding {
  writer_id: number | null;
  name: string;
  genre: string;

  constructor() {
    this.writer_id = null;
    this.name = '';
    this.genre = '';
  }
}
