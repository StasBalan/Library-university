<template>
  <div class="writers-adding">
    <h1 class="writers-adding__title">
      Edit
    </h1>

    <div class="writers-adding__item">
      <div class="sub-title">First name</div>

      <el-input placeholder="Please input" v-model="readerForEdit.first_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Middle name</div>

      <el-input placeholder="Please input" v-model="readerForEdit.middle_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Last name</div>

      <el-input placeholder="Please input" v-model="readerForEdit.last_name" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Address</div>

      <el-input placeholder="Please input" v-model="readerForEdit.address" />
    </div>

    <div class="writers-adding__item">
      <div class="sub-title">Phone</div>

      <el-input placeholder="Please input" v-model="readerForEdit.phone">
        <template slot="prepend">+375</template>
      </el-input>
    </div>

    <el-button
      type="primary"
      @click="handleEditReader"
      v-loading.fullscreen.lock="isLoading"
    >
      Edit reader
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import ReaderForEdit from '@/shared/classes/Readers/ReaderForEdit.class';

@Component({
  components: {
  },
})
export default class ReadersEdit extends Vue {
  @State(({ readers }) => readers.reader)
  reader!: any;

  @Action('readers/GET_READER_BY_ID') getReaderById!: (id: number) => Promise<void>;
  @Action('readers/EDIT_READER') editReader!: (reqParams: { id: number, updatedReader: ReaderForEdit }) => Promise<void>;

  readerForEdit: any = null;

  isLoading = false;

  isPageLoading = true;

  async mounted(): Promise<void> {
    await this.getPageData();
  }

  async getPageData(): Promise<void> {
    try {
      const readerId = Number(this.$route.params.id);

      this.isPageLoading = true;
      await this.getReaderById(readerId);
      this.readerForEdit = new ReaderForEdit(this.reader);
    } catch (error) {
      console.log(error);
    } finally {
      this.isPageLoading = false;
    }
  }

  async handleEditReader(): Promise<void> {
    try {
      const readerId = Number(this.$route.params.id);

      this.isLoading = true;
      this.readerForEdit.setCountryCodeForPhone();
      await this.editReader({
        id: readerId,
        updatedReader: this.readerForEdit
      });
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
