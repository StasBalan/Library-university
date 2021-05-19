<template>
  <div class="books-adding">
    <h1 class="books-adding__title">
      Adding
    </h1>

    <template v-if="!isPageLoading">
      <div class="books-adding__item">
        <div class="sub-title">Book name</div>

        <el-input placeholder="Please input" v-model="bookForAdding.name" />
      </div>

      <div class="books-adding__item">
        <div class="sub-title">Book genre</div>

        <el-select v-model="bookForAdding.genre" placeholder="Select">
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

        <el-select v-model="bookForAdding.writer_id" placeholder="Select">
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
      @click="handleAddingBook"
      v-loading.fullscreen.lock="isLoading"
    >
      Add book
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import { GENRES_LIST } from '@/shared/constants/index';
import BookForAdding from '@/shared/classes/Books/BookForAdding.class';

@Component({
  components: {
  },
})
export default class BooksAdding extends Vue {
  @State(({ writers }) => writers.writers)
  writers!: any[];

  @Action('writers/GET_WRITERS') getWriters!: () => Promise<void>;
  @Action('books/ADD_BOOK') addBook!: (reqParams: BookForAdding) => Promise<void>;

  bookForAdding: BookForAdding = new BookForAdding();

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
      this.isPageLoading = true;
      await this.getWriters();
    } catch (error) {
      console.log(error);
    } finally {
      this.isPageLoading = false;
    }
  }

  async handleAddingBook(): Promise<void> {
    try {
      this.isLoading = true;
      await this.addBook(this.bookForAdding);
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
