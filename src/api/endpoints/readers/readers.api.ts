import ReaderForAdding from "@/shared/classes/Readers/ReaderForAdding.class";
import ReaderForEdit from "@/shared/classes/Readers/ReaderForEdit.class";

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}`);
  },
  add(reqParams: ReaderForAdding) {
    return httpClient.post(`${endpoint}`, reqParams);
  },
  delete(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  get(id: number) {
    return httpClient.get(`${endpoint}/${id}`);
  },
  edit({ id, updatedReader }: { id: number, updatedReader: ReaderForEdit }) {
    return httpClient.put(`${endpoint}/${id}`, updatedReader);
  }
});
