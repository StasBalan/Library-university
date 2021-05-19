<template>
  <div class="readers-header">
    <h1 class="readers-header__title">
      Readers
    </h1>

    <el-button
      type="primary"
      @click="$router.push('/readers/adding')"
    >
      Add reader
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
})
export default class ReadersHeader extends Vue {
}
</script>

<style>
.readers-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.readers-header__title {
  flex-grow: 1;
}
</style>
