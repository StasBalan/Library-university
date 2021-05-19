<template>
  <div class="writers-adding">
    <h1 class="writers-adding__title">
      Adding
    </h1>

    <div class="writers-adding__item">
      <div class="sub-title">First name</div>

      <el-input placeholder="Please input" v-model="readerForAdding.first_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Middle name</div>

      <el-input placeholder="Please input" v-model="readerForAdding.middle_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Last name</div>

      <el-input placeholder="Please input" v-model="readerForAdding.last_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Address</div>

      <el-input placeholder="Please input" v-model="readerForAdding.address" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Phone</div>

      <el-input placeholder="Please input" v-model="readerForAdding.phone">
        <template slot="prepend">+375</template>
      </el-input>
    </div>

    <el-button
      type="primary"
      @click="handleAddingWriter"
      v-loading.fullscreen.lock="isLoading"
    >
      Add reader
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from 'vuex-class';
import ReaderForAdding from '@/shared/classes/Readers/ReaderForAdding.class';

@Component({
  components: {
  },
})
export default class ReadersAdding extends Vue {
  @Action('readers/ADD_READER') addReader!: (reqParams: ReaderForAdding) => Promise<void>;

  readerForAdding: ReaderForAdding = new ReaderForAdding();

  isLoading = false;

  async handleAddingWriter(): Promise<void> {
    try {
      this.isLoading = true;
      this.readerForAdding.setCountryCodeForPhone();
      await this.addReader(this.readerForAdding);
      this.$router.push('/readers');
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
