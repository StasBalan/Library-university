import WriterForAdding from "@/shared/classes/Writers/WriterForAdding.class";
import WriterForEdit from "@/shared/classes/Writers/WriterForEdit.class";

export default (httpClient: any, endpoint: string) => ({
  getList() {
    return httpClient.get(`${endpoint}`);
  },
  add(reqParams: WriterForAdding) {
    return httpClient.post(`${endpoint}`, reqParams);
  },
  delete(id: number) {
    return httpClient.delete(`${endpoint}/${id}`);
  },
  get(id: number) {
    return httpClient.get(`${endpoint}/${id}`);
  },
  edit({ id, updatedWriter }: { id: number, updatedWriter: WriterForEdit }) {
    return httpClient.put(`${endpoint}/${id}`, updatedWriter);
  }
});
