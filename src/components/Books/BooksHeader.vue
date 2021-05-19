<template>
  <div class="books-header">
    <h1 class="books-header__title">
      Books
    </h1>

    <el-button
      type="primary"
      @click="$router.push('/books/adding')"
    >
      Add book
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
})
export default class BooksHeader extends Vue {
}
</script>

<style>
.books-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.books-header__title {
  flex-grow: 1;
}
</style>
