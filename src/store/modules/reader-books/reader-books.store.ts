import ReaderBooksForAdding from "@/shared/classes/ReaderBooks/ReaderBooksForAdding.class";

export default function(api: any) {
  return {
    namespaced: true,
    state: {
      readerBooks: []
    },
    getters: {},
    actions: {
      GET_READER_BOOKS_BY_READER_ID: async (context: any, readerId: number) => {
        const response: any = await api.readerBooks.getListByReaderId(readerId);
        console.log('response books', response);
        context.commit('SET_READER_BOOKS', response?.data);
      },
      ADD_BOOK_TO_READER: async (_: any, reqParams: ReaderBooksForAdding) => {
        await api.readerBooks.addToReader(reqParams);
      },
      HAND_OVER_BOOK: async (_: any, reqParams: { id: number, reqParams: { reader_id: number, book_id: number, end_at: string }}) => {
        await api.readerBooks.edit(reqParams);
      }
    },
    mutations: {
      SET_READER_BOOKS: (state: any, booksFromApi: any[]) => {
        state.readerBooks = booksFromApi;
      }
    }
  };
}
