<template>
  <div class="reader-books">
    <h1 class="reader-books__title">
      Adding
    </h1>

    <template v-if="!isPageLoading">
      <div class="writers-adding__item">
        <div class="sub-title">Book name</div>

        <el-select v-model="readerBooksForAdding.book_id" placeholder="Select">
          <el-option
            v-for="item in booksOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="writers-adding__item">
        <div class="sub-title">Reader</div>

        <el-select v-model="readerBooksForAdding.reader_id" placeholder="Select">
          <el-option
            v-for="item in readersOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </template>

    <el-button
      type="primary"
      @click="handleAddingBookToReader"
      v-loading.fullscreen.lock="isLoading"
    >
      Add a book to the reader
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import ReaderBooksForAdding from '@/shared/classes/ReaderBooks/ReaderBooksForAdding.class';

@Component({
  components: {
  },
})
export default class ReaderBooksAdding extends Vue {
  @State(({ readers }) => readers.readers)
  readers!: any[];

  @State(({ books }) => books.books)
  books!: any[];

  @Action('readers/GET_READERS') getReaders!: () => Promise<void>;
  @Action('books/GET_BOOKS') getBooks!: () => Promise<void>;
  @Action('readerBooks/ADD_BOOK_TO_READER') addBookToReader!: (reqParams: ReaderBooksForAdding) => Promise<void>;

  readerBooksForAdding = new ReaderBooksForAdding();

  isLoading = false;

  isPageLoading = true;

  get readersOptions(): any[] {
    return this.readers.map((reader: any) => ({
      value: reader?.id,
      label: `${reader?.first_name} ${reader?.last_name}`
    }));
  }

  get booksOptions(): any[] {
    return this.books.map((book: any) => ({
      value: book?.id,
      label: book?.name
    }));
  }

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      this.isPageLoading = true;
      await Promise.all([
        this.getReaders(),
        this.getBooks()
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      this.isPageLoading = false;
    }
  }

  async handleAddingBookToReader(): Promise<void> {
    try {
      this.isLoading = true;
      await this.addBookToReader(this.readerBooksForAdding);
      this.$router.push('/readers');
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
.reader-books__title {
  margin-bottom: 20px;
}

.reader-books__item {
  margin-bottom: 10px;
}
</style>
