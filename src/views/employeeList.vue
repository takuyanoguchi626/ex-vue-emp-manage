<template>
  <div>
    <div class="container">
      <div>従業員数:{{ employeeCount }}</div>
      <div class="row">
        <table class="striped">
          <thead>
            <tr>
              <th>名前</th>
              <th>入社日</th>
              <th>扶養人数</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="employee of employees" :key="employee.id">
              <td>
                <router-link to="'/employeeDetail/'+employee.id">
                  {{ employee.name }}</router-link
                >
              </td>
              <td>{{ employee.hireDate }}</td>
              <td>{{ employee.dependentsCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Employee } from "@/types/employee";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  /**
   * Vuexストアのアクション経由で非同期でWebAPIから従業員一覧を取得する.
   */
  created(): void {
    this.$store.dispatch("getEmployeeList");
  }
  /**
   * 非同期で取得したVuexストア内の従業員数を取得し返す.
   */
  get employeeCount(): number {
    return this.$store.getters.getEmployeeCount;
  }
  /**
   * 非同期で取得したVuexストア内の従業員一覧を取得し返す.
   */
  get employees(): Array<Employee> {
    return this.$store.getters.getEmployees;
  }
}
</script>

<style scoped></style>
