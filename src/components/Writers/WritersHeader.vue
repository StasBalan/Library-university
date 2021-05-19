<template>
  <div class="writers-header">
    <h1 class="writers-header__title">
      Writers
    </h1>

    <el-button
      type="primary"
      @click="$router.push('/writers/adding')"
    >
      Add writer
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
})
export default class WritersHeader extends Vue {
}
</script>

<style>
.writers-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.writers-header__title {
  flex-grow: 1;
}
</style>
