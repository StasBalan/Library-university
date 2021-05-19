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
      prop="name"
      label="Name"
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
          @click="handleEditWriter(scope.$index, scope.row)"
        >
          Edit
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="emitDeleteWriter(scope.$index, scope.row)"
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
export default class WritersTable extends Vue {
  @Prop() writers!: any[];
  @Prop({ default: true }) isLoading!: boolean;

  search = '';

  get tableDataFiltered(): any[] {
    return this.tableData.filter((data: any) => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  get tableData(): any {
    return this.writers.map((writer: any) => ({
      id: writer?.id,
      created_at: getDate(writer?.created_at),
      name: `${writer?.last_name} ${writer?.first_name} ${writer?.middle_name ? writer?.middle_name : ''}`
    }))
  }

  handleInput(scope: any): void {
    // scope._self -- из-за особенностей поиска в таблице
    this.search = String(scope._self.search);
  }

  handleEditWriter(_: any, { id }: { id: number }): void {
    this.$router.push(`/writers/edit/${id}`);
  }

  @Emit('deleteWriter') emitDeleteWriter(_: any, { id }: { id: number }): number {
    return id;
  }
}
</script>
