<template>
  <div class="writers">
    <WritersHeader />
    <WritersTable
      :writers="writers"
      :is-loading="isLoading"
      @deleteWriter="handleDeleteWriter"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import WritersHeader from '@/components/Writers/WritersHeader.vue';
import WritersTable from '@/components/Writers/WritersTable.vue';

@Component({
  components: {
    WritersHeader,
    WritersTable
  },
})
export default class Writers extends Vue {
  @State(({ writers }) => writers.writers)
  writers!: any[];

  @Action('writers/GET_WRITERS') getWriters!: () => Promise<void>;
  @Action('writers/DELETE_WRITER') deleteWriter!: (id: number) => Promise<void>;

  isLoading = true;

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      this.isLoading = true;
      await this.getWriters();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleDeleteWriter(id: number): Promise<void> {
    try {
      this.isLoading = true;
      await this.deleteWriter(id);
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
