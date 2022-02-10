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
            <tr v-for="employee of showEmployee" :key="employee.id">
              <td>
                <router-link :to="'/employeeDetail/' + employee.id">
                  {{ employee.name }}</router-link
                >
              </td>
              <td>{{ employee.hireDate }}</td>
              <td>{{ employee.dependentsCount }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td v-for="page of pageCountArr" :key="page">
                <button type="button" @click="pageChange2(page)">
                  {{ page }}
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Employee } from "@/types/employee";
import { Component, Vue } from "vue-property-decorator";
import pageChange from "@/components/pageChange.vue";
@Component({
  components: { pageChange },
})
export default class XXXComponent extends Vue {
  private showEmployee = this.$store.getters.getEmployees;
  private pageCount = new Array<number>();
  /**
   * Vuexストアのアクション経由で非同期でWebAPIから従業員一覧を取得する.
   */
  created(): void {
    if (this.$store.getters.getLogin) {
      this.$store.dispatch("getEmployeeList");
      this.showEmployee = this.$store.getters.getEmployees;
    } else {
      this.$router.push("/loginAdmin");
      console.log("ログインしてない");
    }
  }

  /**
   * 非同期で取得したVuexストア内の従業員数を取得し返す.
   *
   *@returns 従業員数
   */
  get employeeCount(): number {
    return this.$store.getters.getEmployeeCount;
  }

  /**
   * 非同期で取得したVuexストア内の従業員一覧を取得し返す.
   *
   *@returns 従業員一覧
   */
  get employees(): Array<Employee> {
    return this.$store.getters.getEmployees;
  }

  get pageCountArr(): Array<number> {
    for (let i = 1; i <= Math.ceil(this.employeeCount / 10); i++) {
      this.pageCount.push(i);
    }
    return this.pageCount;
  }

  pageChange2(num: number): void {
    this.showEmployee = new Array<Employee>();
    for (let i = (num - 1) * 10; i <= (num - 1) * 10 + 9; i++) {
      if (this.employees[i] !== undefined) {
        this.showEmployee.push(this.employees[i]);
      }
    }
    console.log(this.showEmployee);
  }
}
</script>

<style scoped></style>
