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
    <el-table-column
      prop="address"
      label="Address"
    />
    <el-table-column
      prop="phone"
      label="Phone"
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
          @click="handleWatchReader(scope.$index, scope.row)"
        >
          About
        </el-button>
        <el-button
          size="mini"
          @click="handleEditReader(scope.$index, scope.row)"
        >
          Edit
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="emitDeleteReader(scope.$index, scope.row)"
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
export default class ReadersTable extends Vue {
  @Prop() readers!: any[];
  @Prop({ default: true }) isLoading!: boolean;

  search = '';

  get tableDataFiltered(): any[] {
    return this.tableData.filter((data: any) => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  get tableData(): any {
    return this.readers.map((reader: any) => ({
      id: reader?.id,
      created_at: getDate(reader?.created_at),
      name: `${reader?.first_name} ${reader?.last_name} ${reader?.middle_name}`,
      address: reader?.address,
      phone: reader?.phone
    }))
  }

  handleInput(scope: any): void {
    // scope._self -- из-за особенностей поиска в таблице
    this.search = String(scope._self.search);
  }

  handleEditReader(_: any, { id }: { id: number }): void {
    this.$router.push(`/readers/edit/${id}`);
  }

  handleWatchReader(_: any, { id }: { id: number }): void {
    this.$router.push(`/readers/watch/${id}`);
  }

  @Emit('deleteReader') emitDeleteReader(_: any, { id }: { id: number }): number {
    return id;
  }
}
</script>
