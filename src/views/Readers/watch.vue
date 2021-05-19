<template>
  <div class="readers-watch">
    <h1 class="readers-watch__title">
      {{ fullName }}
    </h1>

    <p class="readers-watch__text">
      {{ address }}
    </p>

    <p class="readers-watch__text">
      {{ phone }}
    </p>

    <el-table
      v-loading="isLoading"
      :data="tableDataFiltered"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column
        prop="start_at"
        label="Taking a book"
        width="180"
      />
      <el-table-column
        prop="end_at"
        label="Delivery of the book"
        width="180"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.end_at === 'Not handed over'"
            type="danger"
            disable-transitions
          >
            {{scope.row.end_at}}
          </el-tag>

          <p v-else>
            Handed over to {{scope.row.end_at}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Book name"
      />
      <el-table-column
        prop="genre"
        label="Genre"
        width="180"
      >
        <template slot-scope="scope">
          <el-tag
            type="primary"
            disable-transitions
          >
            {{scope.row.genre}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="writer"
        label="Writer"
      />

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"
            @input="handleInput(scope)"
          />
        </template>

        <template slot-scope="scope">
          <el-button
            v-if="scope.row.end_at === 'Not handed over'"
            size="mini"
            @click="handleHandOverBook(scope.$index, scope.row)"
          >
            Hand over
          </el-button>
        </template>
      </el-table-column>

      <template slot="empty">
        <p class="no-data">
          No Data
        </p>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import moment from "moment";
import { getDate } from '@/shared/utils/index';

@Component({
  components: {
  },
})
export default class ReadersWatch extends Vue {
  @State(({ readers }) => readers.reader)
  reader!: any;

  @State(({ readerBooks }) => readerBooks.readerBooks)
  readerBooks!: any[];

  @Action('readers/GET_READER_BY_ID') getReaderById!: (id: number) => Promise<void>;
  @Action('readerBooks/GET_READER_BOOKS_BY_READER_ID') getReaderBooksByReaderId!: (readerId: number) => Promise<void>;
  @Action('readerBooks/HAND_OVER_BOOK')
  handOverBook!: (reqParams: { id: number, reqParams: { reader_id: number, book_id: number, end_at: string }}) => Promise<void>;

  isLoading = false;

  isPageLoading = true;

  search = '';

  get fullName(): string {
    return `${this.reader?.last_name} ${this.reader?.first_name} ${this.reader?.middle_name}`
  }

  get address(): string {
    return this.reader?.address;
  }

  get phone(): string {
    return this.reader?.phone;
  }

  get tableDataFiltered(): any[] {
    return this.tableData.filter((data: any) => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  get tableData(): any {
    return this.readerBooks.map((readerBook: any) => ({
      id: readerBook?.id,
      bookId: readerBook?.book?.id,
      start_at: getDate(readerBook?.start_at),
      end_at: readerBook?.end_at ? getDate(readerBook?.end_at) : 'Not handed over',
      name: readerBook?.book?.name,
      genre: readerBook?.book?.genre,
      writer: `${readerBook?.book?.writer?.first_name} ${readerBook?.book?.writer?.last_name}`,
    }))
  }

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      const readerId = Number(this.$route.params.id);

      this.isPageLoading = true;
      await Promise.all([
        this.getReaderById(readerId),
        this.getReaderBooksByReaderId(readerId)
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      this.isPageLoading = false;
    }
  }

  tableRowClassName({ row, rowIndex }: any) {
    if (row.end_at !== 'Not handed over') {
      return 'success-row';
    }

    return '';
  }

  async handleHandOverBook(_: any, { id, bookId }: { id: number, bookId: number }): Promise<void> {
    try {
      const readerId = Number(this.$route.params.id);

      this.isLoading = true;
      await this.handOverBook({
        id,
        reqParams: {
          reader_id: readerId,
          book_id: bookId,
          end_at: moment().format('YYYY-MM-DD')
        }
      });
      await this.getReaderBooksByReaderId(readerId)
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style>
.readers-watch__title {
  margin-bottom: 20px;
}

.readers-watch__text {
  margin-bottom: 10px;
}

.readers-watch__text:last-child {
  margin-bottom: 30px;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
