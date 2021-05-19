import BookForAdding from "@/shared/classes/Books/BookForAdding.class";
import BookForEdit from "@/shared/classes/Books/BookForEdit.class";

export default function(api: any) {
  return {
    namespaced: true,
    state: {
      books: [],
      book: null
    },
    getters: {},
    actions: {
      GET_BOOKS: async (context: any) => {
        const response: any = await api.books.getList();
        console.log('response books', response);
        context.commit('SET_BOOKS', response?.data);
      },
      ADD_BOOK: async (_: any, reqParams: BookForAdding) => {
        await api.books.add(reqParams);
      },
      DELETE_BOOK: async (context: any, id: number) => {
        const response: any = await api.books.delete(id);
        context.commit('SET_BOOKS_AFTER_DELETE', response?.data);
      },
      GET_BOOK_BY_ID: async (context: any, id: number) => {
        const response: any = await api.books.get(id);
        context.commit('SET_BOOK', response?.data);
      },
      EDIT_BOOK: async (_: any, reqParams: { id: number, updatedBook: BookForEdit }) => {
        await api.books.edit(reqParams);
      }
    },
    mutations: {
      SET_BOOKS: (state: any, booksFromApi: any[]) => {
        state.books = booksFromApi;
      },
      SET_BOOKS_AFTER_DELETE: (state: any, deleteBooksFromApi: any) => {
        state.books = state.books.filter((book: any) => book.id !== deleteBooksFromApi?.id);
      },
      SET_BOOK: (state: any, bookFromApi: any) => {
        state.book = bookFromApi;
      }
    }
  };
}
