<template>
  <div class="books">
    <BooksHeader />
    <BooksTable
      :books="books"
      :is-loading="isLoading"
      @deleteBook="handleDeleteBook"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import BooksHeader from '@/components/Books/BooksHeader.vue';
import BooksTable from '@/components/Books/BooksTable.vue';

@Component({
  components: {
    BooksHeader,
    BooksTable
  },
})
export default class Books extends Vue {
  @State(({ books }) => books.books)
  books!: any[];

  @Action('books/GET_BOOKS') getBooks!: () => Promise<void>;
  @Action('books/DELETE_BOOK') deleteBook!: (id: number) => Promise<void>;

  isLoading = true;

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      this.isLoading = true;
      await this.getBooks();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleDeleteBook(id: number): Promise<void> {
    try {
      this.isLoading = true;
      await this.deleteBook(id);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style>
</style>
