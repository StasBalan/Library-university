<template>
  <div class="writers-adding">
    <h1 class="writers-adding__title">
      Edit
    </h1>

    <div class="writers-adding__item">
      <div class="sub-title">First name</div>

      <el-input placeholder="Please input" v-model="writerForEdit.first_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Middle name</div>

      <el-input placeholder="Please input" v-model="writerForEdit.middle_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Last name</div>

      <el-input placeholder="Please input" v-model="writerForEdit.last_name" />
    </div>

    <el-button
      type="primary"
      @click="handleEditWriter"
      v-loading.fullscreen.lock="isLoading"
    >
      Edit writer
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import WriterForEdit from '@/shared/classes/Writers/WriterForEdit.class';

@Component({
  components: {
  },
})
export default class WritersEdit extends Vue {
  @State(({ writers }) => writers.writer)
  writer!: any;

  @Action('writers/GET_WRITER_BY_ID') getWriterById!: (id: number) => Promise<void>;
  @Action('writers/EDIT_WRITER') editWriter!: (reqParams: { id: number, updatedWriter: WriterForEdit }) => Promise<void>;

  writerForEdit: any = null;

  isLoading = false;

  isPageLoading = true;

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      const writerId = Number(this.$route.params.id);

      this.isPageLoading = true;
      await this.getWriterById(writerId);
      this.writerForEdit = new WriterForEdit(this.writer);
    } catch (error) {
      console.log(error);
    } finally {
      this.isPageLoading = false;
    }
  }

  async handleEditWriter(): Promise<void> {
    try {
      const writerId = Number(this.$route.params.id);

      this.isLoading = true;
      await this.editWriter({
        id: writerId,
        updatedWriter: this.writerForEdit
      });
      this.$router.push('/writers');
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style>
.writers-adding__title {
  margin-bottom: 20px;
}

.writers-adding__item {
  margin-bottom: 10px;
}
</style>
