<template>
  <el-table
    v-loading="isLoading"
    :data="tableDataFiltered"
    style="width: 100%"
  >
    <el-table-column
      prop="created_at"
      label="Date"
      width="180"
    />
    <el-table-column
      prop="genre"
      label="Genre"
      width="180"
    >
      <template slot-scope="scope">
        <el-tag
          :type="'primary'"
          disable-transitions
        >
          {{scope.row.genre}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
    />
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
          size="mini"
          @click="handleEditBook(scope.$index, scope.row)"
        >
          Edit
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="emitDeleteBook(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>

    <template slot="empty">
      <p class="no-data">
        No Data
      </p>
    </template>
  </el-table>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { getDate } from '@/shared/utils/index';

@Component({
  components: {
  },
})
export default class BooksTable extends Vue {
  @Prop() books!: any[];
  @Prop({ default: true }) isLoading!: boolean;

  search = '';

  get tableDataFiltered(): any[] {
    return this.tableData.filter((data: any) => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  get tableData(): any {
    return this.books.map((book: any) => ({
      id: book.id,
      created_at: getDate(book.created_at),
      genre: book.genre,
      name: book.name,
      writer: `${book.writer.first_name} ${book.writer.last_name}`
    }))
  }

  handleInput(scope: any): void {
    // scope._self -- из-за особенностей поиска в таблице
    this.search = String(scope._self.search);
  }

  handleEditBook(_: any, { id }: { id: number }): void {
    this.$router.push(`/books/edit/${id}`);
  }

  @Emit('deleteBook') emitDeleteBook(_: any, { id }: { id: number }): number {
    return id;
  }
}
</script>
