export default class ReaderForEdit {
  first_name: string;
  middle_name: string;
  last_name: string;
  address: string;
  phone: string;

  constructor({
    first_name,
    middle_name,
    last_name,
    address,
    phone
  }: any) {
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.address = address;
    this.phone = phone.slice(4);
  }

  setCountryCodeForPhone(): void {
    this.phone = `+375${this.phone}`;
  }
}
