<template>
  <div class="reader-books">
    <h1 class="readers-books__title">
      Reader Books
    </h1>

    <el-button
      type="primary"
      @click="$router.push('/reader-books/adding')"
    >
      Add a book to the reader
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component({
  components: {
  },
})
export default class ReaderBooks extends Vue {
}
</script>

<style>
.readers-books__title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
