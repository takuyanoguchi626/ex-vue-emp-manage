<template>
  <div>
    <button type="button" v-on:click="aaa">{{ page2 }}</button>
  </div>
</template>

<script lang="ts">
import { Prop, Emit, Component, Vue } from "vue-property-decorator";
@Component
export default class pageChange extends Vue {
  @Prop()
  private page2!: number;
  private page3 = this.page2;

  @Emit()
  pageChange(num: number): void {
    console.log(num);
  }

  aaa(): void {
    this.pageChange(this.page3);
  }
}
</script>

<style scoped></style>
