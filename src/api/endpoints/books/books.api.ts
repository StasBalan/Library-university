import BookForAdding from "@/shared/classes/Books/BookForAdding.class";
import BookForEdit from "@/shared/classes/Books/BookForEdit.class";

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}`);
  },
  add(reqParams: BookForAdding) {
    return httpClient.post(`${endpoint}`, reqParams);
  },
  delete(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  get(id: number) {
    return httpClient.get(`${endpoint}/${id}`);
  },
  edit({ id, updatedBook }: { id: number, updatedBook: BookForEdit }) {
    return httpClient.put(`${endpoint}/${id}`, updatedBook);
  }
});
