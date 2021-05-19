export default class WriterForEdit {
  first_name: string;
  middle_name: string;
  last_name: string;

  constructor({
    first_name,
    middle_name,
    last_name
  }: any) {
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
  }
}
