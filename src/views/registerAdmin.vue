<template>
  <div>
    <div class="container">
      <div class="row register-page">
        <div class="error">{{ errorMessage }}</div>
        <form class="col s12" id="reg-form">
          <div class="row">
            <div class="input-field col s6">
              <input
                id="last_name"
                type="text"
                class="validate"
                required
                v-model="lastName"
              />
              <label for="last_name">姓</label>
              <span class="alert">
                {{ alertLastName }}
              </span>
            </div>
            <div class="input-field col s6">
              <input
                id="first_name"
                type="text"
                class="validate"
                required
                v-model="firstName"
              />
              <label for="first_name">名</label>
              <span class="alert">
                {{ alertFirstName }}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                class="validate"
                required
                v-model="mailAddress"
              />
              <label for="email">メールアドレス</label>
              <span class="alert">
                {{ alertEmail }}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="password"
                type="password"
                class="validate"
                minlength="8"
                required
                v-model="password"
              />
              <label for="password">パスワード</label>
              <span class="alert">
                {{ alertPassword }}
              </span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <button
                class="btn btn-large btn-register waves-effect waves-light"
                v-on:click="registerAdmin"
                type="button"
              >
                登録
                <i class="material-icons right">done</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class RegisterAdmin extends Vue {
  //エラーメッセージ
  private errorMessage = "";
  //姓
  private lastName = "";
  //名
  private firstName = "";
  //メールアドレス
  private mailAddress = "";
  //パスワード
  private password = "";
  //入力値チェック（姓）
  private alertLastName = "";
  //入力値チェック（名）
  private alertFirstName = "";
  //入力値チェック（メールアドレス）
  private alertEmail = "";
  //入力値チェック（パスワード）
  private alertPassword = "";
  //エラーチェック
  private errorCheck = false;

  /**
   * 管理者情報をWebAPIに送信し、登録するメソッド.
   *
   * @remarks
   * 管理者情報を登録するWebAPIに、
   * 入力した内容を送信し、正しければ登録、間違っていればエラーを表示する。
   */
  async registerAdmin(): Promise<void> {
    this.alertLastName = "";
    this.alertFirstName = "";
    this.alertEmail = "";
    this.alertPassword = "";
    this.errorCheck = false;

    if (this.lastName === "") {
      this.alertLastName = "姓が入力されていません";
      this.errorCheck = true;
    }
    if (this.firstName === "") {
      this.alertFirstName = "名が入力されていません";
      this.errorCheck = true;
    }
    if (this.mailAddress === "") {
      this.alertEmail = "メールアドレスが入力されていません";
      this.errorCheck = true;
    }
    if (this.password === "") {
      this.alertPassword = "パスワードが入力されていません";
      this.errorCheck = true;
    }
    if (this.errorCheck === true) {
      return;
    }

    const response = await axios.post(
      "http://153.127.48.168:8080/ex-emp-api/insert",
      {
        name: this.lastName + "" + this.firstName,
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );
    const status = response.data.status;
    if (status === "success") {
      this.$router.push("/loginAdmin");
    } else {
      this.errorMessage = response.data.message;
    }
  }
}
</script>

<style scoped>
.register-page {
  width: 600px;
}

.alert {
  color: red;
}
</style>
