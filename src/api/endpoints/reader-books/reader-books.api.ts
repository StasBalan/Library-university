import ReaderBooksForAdding from "@/shared/classes/ReaderBooks/ReaderBooksForAdding.class";

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}`);
  },
  getListByReaderId(readerId: number) {
    return httpClient.get(`${endpoint}?reader_id=${readerId}`);
  },
  addToReader(reqParams: ReaderBooksForAdding) {
    return httpClient.post(`${endpoint}`, reqParams);
  },
  edit({ id, reqParams }: { id: number, reqParams: { reader_id: number, book_id: number, end_at: string } }) {
    return httpClient.put(`${endpoint}/${id}`, reqParams);
  }
});
