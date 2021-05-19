<template>
  <div class="books-adding">
    <h1 class="books-adding__title">
      Edit
    </h1>

    <template v-if="!isPageLoading">
      <div class="books-adding__item">
        <div class="sub-title">Book name</div>

        <el-input placeholder="Please input" v-model="bookForEdit.name" />
      </div>

      <div class="books-adding__item">
        <div class="sub-title">Book genre</div>

        <el-select v-model="bookForEdit.genre" placeholder="Select">
          <el-option
            v-for="item in genresOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="books-adding__item">
        <div class="sub-title">Writer</div>

        <el-select v-model="bookForEdit.writer_id" placeholder="Select">
          <el-option
            v-for="item in writersOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </template>

    <el-button
      type="primary"
      @click="handleEditBook"
      v-loading.fullscreen.lock="isLoading"
    >
      Edit book
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import { GENRES_LIST } from '@/shared/constants/index';
import BookForEdit from '@/shared/classes/Books/BookForEdit.class';

@Component({
  components: {
  },
})
export default class BooksEdit extends Vue {
  @State(({ books }) => books.book)
  book!: any;

  @State(({ writers }) => writers.writers)
  writers!: any[];

  @Action('writers/GET_WRITERS') getWriters!: () => Promise<void>;
  @Action('books/GET_BOOK_BY_ID') getBookById!: (id: number) => Promise<void>;
  @Action('books/EDIT_BOOK') editBook!: (reqParams: { id: number, updatedBook: BookForEdit }) => Promise<void>;

  bookForEdit: any = null;

  isLoading = false;

  isPageLoading = true;

  get genresOptions(): any {
    return GENRES_LIST.map((item: string) => ({
      value: item,
      label: item
    }));
  }

  get writersOptions(): any {
    return this.writers.map((writer: any) => ({
      value: writer?.id,
      label: `${writer?.first_name} ${writer?.last_name}`
    }));
  }

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      const bookId = Number(this.$route.params.id);

      this.isPageLoading = true;
      await Promise.all([
        this.getBookById(bookId),
        this.getWriters()
      ]);
      this.bookForEdit = new BookForEdit(this.book);
    } catch (error) {
      console.log(error);
    } finally {
      this.isPageLoading = false;
    }
  }

  async handleEditBook(): Promise<void> {
    try {
      const bookId = Number(this.$route.params.id);

      this.isLoading = true;
      await this.editBook({
        id: bookId,
        updatedBook: this.bookForEdit
      });
      this.$router.push('/books');
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style>
.books-adding__title {
  margin-bottom: 20px;
}

.books-adding__item {
  margin-bottom: 10px;
}
</style>
