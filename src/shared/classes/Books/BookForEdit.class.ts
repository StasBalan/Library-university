export default class BookForEdit {
  writer_id: number | null;
  name: string;
  genre: string;

  constructor({
    writer,
    name,
    genre
  }: any) {
    this.writer_id = writer?.id;
    this.name = name;
    this.genre = genre;
  }
}
