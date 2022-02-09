import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "@/types/employee";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //従業員数
    totalEmployeeCount: 0,
    //従業員一覧
    employees: Array<Employee>(),
  }, // end state

  actions: {
    /**
     *WebAPIから従業員情報オブジェクトを取得しmutationsに渡します.
     *
     * @param context Vuex.Store全体
     */
    async getEmployeeList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ex-emp-api-employee/employees"
      );
      const payload = response.data;
      context.commit("showEmployeeList", payload);
    },
  }, // end actions

  mutations: {
    /**
     * WebAPIから受け取った従業員情報をstateのemployeesに入れます.
     *
     * @param state -
     * @param payload actionsから渡された従業員情報オブジェクト
     */
    showEmployeeList(state, payload) {
      state.employees = new Array<Employee>();
      state.totalEmployeeCount = payload.totalEmployeeCount;
      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
    },
  }, // end mutations

  getters: {
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },

    getEmployees(state) {
      return state.employees;
    },
    /**
     * IDから従業員を検索し取得します.
     *
     * @param id -受け取るID
     * @returns 従業員インスタンス
     */
    getEmployeeById(state, id) {
      for (const employee of state.employees) {
        if (employee.id === id) {
          return employee;
        } else {
          return "そのIDは存在しません";
        }
      }
    },
  }, // end getters

  modules: {}, // end modules
});
