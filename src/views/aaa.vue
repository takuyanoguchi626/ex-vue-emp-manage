<template>
  <div>
    aaa
    <router-link to="/registerAdmin">管理者登録</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped></style>
