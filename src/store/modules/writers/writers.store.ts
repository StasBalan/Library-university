import WriterForAdding from "@/shared/classes/Writers/WriterForAdding.class";
import WriterForEdit from "@/shared/classes/Writers/WriterForEdit.class";

export default function(api: any) {
  return {
    namespaced: true,
    state: {
      writers: [],
      writer: null
    },
    getters: {},
    actions: {
      GET_WRITERS: async (context: any) => {
        const response: any = await api.writers.getList();
        console.log('response writers', response);
        context.commit('SET_WRITERS', response?.data);
      },
      ADD_WRITER: async (_: any, reqParams: WriterForAdding) => {
        await api.writers.add(reqParams);
      },
      DELETE_WRITER: async (context: any, id: number) => {
        const response: any = await api.writers.delete(id);
        context.commit('SET_WRITERS_AFTER_DELETE', response?.data);
      },
      GET_WRITER_BY_ID: async (context: any, id: number) => {
        const response: any = await api.writers.get(id);
        context.commit('SET_WRITER', response?.data);
      },
      EDIT_WRITER: async (_: any, reqParams: { id: number, updatedWriter: WriterForEdit }) => {
        await api.writers.edit(reqParams);
      }
    },
    mutations: {
      SET_WRITERS: (state: any, writersFromApi: any[]) => {
        state.writers = writersFromApi;
      },
      SET_WRITERS_AFTER_DELETE: (state: any, deleteWriterFromApi: any) => {
        state.writers = state.writers.filter((writer: any) => writer.id !== deleteWriterFromApi?.id);
      },
      SET_WRITER: (state: any, writerFromApi: any) => {
        state.writer = writerFromApi;
      }
    }
  };
}
