<template>
  <div class="writers-adding">
    <h1 class="writers-adding__title">
      Adding
    </h1>

    <div class="writers-adding__item">
      <div class="sub-title">First name</div>

      <el-input placeholder="Please input" v-model="writerForAdding.first_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Middle name</div>

      <el-input placeholder="Please input" v-model="writerForAdding.middle_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Last name</div>

      <el-input placeholder="Please input" v-model="writerForAdding.last_name" />
    </div>

    <el-button
      type="primary"
      @click="handleAddingWriter"
      v-loading.fullscreen.lock="isLoading"
    >
      Add writer
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from 'vuex-class';
import WriterForAdding from '@/shared/classes/Writers/WriterForAdding.class';

@Component({
  components: {
  },
})
export default class WritersAdding extends Vue {
  @Action('writers/ADD_WRITER') addWriter!: (reqParams: WriterForAdding) => Promise<void>;

  writerForAdding: WriterForAdding = new WriterForAdding();

  isLoading = false;

  async handleAddingWriter(): Promise<void> {
    try {
      this.isLoading = true;
      await this.addWriter(this.writerForAdding);
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
