<template>
  <div class="readers">
    <ReadersHeader />
    <ReadersTable
      :readers="readers"
      :is-loading="isLoading"
      @deleteReader="handleDeleteReader"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReadersHeader from '@/components/Readers/ReadersHeader.vue';
import ReadersTable from '@/components/Readers/ReadersTable.vue';
import { Action, State } from "vuex-class";

@Component({
  components: {
    ReadersHeader,
    ReadersTable
  },
})
export default class Readers extends Vue {
  @State(({ readers }) => readers.readers)
  readers!: any[];

  @Action('readers/GET_READERS') getReaders!: () => Promise<void>;
  @Action('readers/DELETE_READER') deleteReader!: (id: number) => Promise<void>;

  isLoading = true;

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      this.isLoading = true;
      await this.getReaders();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleDeleteReader(id: number): Promise<void> {
    try {
      this.isLoading = true;
      await this.deleteReader(id);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
