export default class ReaderForAdding {
  first_name: string;
  middle_name: string;
  last_name: string;
  address: string;
  phone: string;

  constructor() {
    this.first_name = '';
    this.middle_name = '';
    this.last_name = '';
    this.address = '';
    this.phone = '';
  }

  setCountryCodeForPhone(): void {
    this.phone = `+375${this.phone}`;
  }
}

