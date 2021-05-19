export default function(api: any) {
  return {
    namespaced: true,
    state: {
      readers: [],
      reader: null
    },
    getters: {},
    actions: {
      GET_READERS: async (context: any) => {
        const response: any = await api.readers.getList();
        console.log('response readers', response);
        context.commit('SET_READERS', response?.data);
      },
      ADD_READER: async (_: any, reqParams: any) => {
        await api.readers.add(reqParams);
      },
      DELETE_READER: async (context: any, id: number) => {
        const response: any = await api.readers.delete(id);
        context.commit('SET_READERS_AFTER_DELETE', response?.data);
      },
      GET_READER_BY_ID: async (context: any, id: number) => {
        const response: any = await api.readers.get(id);
        context.commit('SET_READER', response?.data);
      },
      EDIT_READER: async (_: any, reqParams: { id: number, updatedReader: any }) => {
        await api.readers.edit(reqParams);
      }
    },
    mutations: {
      SET_READERS: (state: any, readersFromApi: any[]) => {
        state.readers = readersFromApi;
      },
      SET_READERS_AFTER_DELETE: (state: any, deleteReaderFromApi: any) => {
        state.readers = state.readers.filter((reader: any) => reader.id !== deleteReaderFromApi?.id);
      },
      SET_READER: (state: any, readerFromApi: any) => {
        state.reader = readerFromApi;
      }
    }
  };
}
