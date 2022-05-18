<template>
  <div class="form-demo">
    <div class="flex justify-content-center ">
      <pv-card class="card shadow-8 " >
        <template #title>
          <h5 class="text-center">Register</h5>
        </template>
        <template #content>
          <div class="field mt-3">
            <span class="p-float-label p-input-icon-right justify-content-center">
              <pv-input-text type="text" id="name" v-model.trim="user.name" required="true"  class=""/>
              <label for="name"> Name </label>
              <small class="p-error" v-if="submitted && !user.name">Name is required</small>
            </span>
          </div>
          <div class="field mt-5">
            <span class="p-float-label p-input-icon-right">
              <pv-input-text type="textarea" id="lastname" v-model.trim="user.lastName" required="true" class="" />
              <label for="lastname"> Last Name </label>
              <small class="p-error" v-if="submitted && !user.lastName">Last Name is required</small>
            </span>
          </div>
          <div class="field mt-5">
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <pv-input-text type="textarea" id="email" v-model.trim="user.email" required="true" aria-describedby="email-error" />
              <label for="email"> Email </label>
              <small class="p-error" v-if="submitted && !user.email">Email is required</small>
            </span>
          </div>
          <div class="field mt-5 ">
            <div class="p-float-label ">
              <pv-password id="password" v-model.trim="user.password" toggleMask class="">
                <template #header>
                 <h6>Pick a password</h6>
                </template>
                <template #footer="sp">
                  {{ sp.level }}
                  <pv-divider />
                  <p class="mt-2">Suggestions</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </pv-password>
              <label for="password">Password</label>
              <small class="p-error" v-if="submitted && !user.password">Password is required</small>
            </div>
          </div>
          <div class="field mt-5">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-phone" />
              <pv-input-mask id="phone" mask="(051) 999-999-999" v-model.trim="user.phone" placeholder="(051) 999-999-999" />
            </div>
          </div>
          <div class="field mt-5">
              <pv-calendar id="birthday" v-model="user.birthday"  :showIcon="true" />
          </div>
        </template>
        <template #footer>
            <pv-button  label="Submit" class="mt-2 ml-7 p-button-rounded" @click="openDialog" />
        </template>
      </pv-card>
    </div>
    <pv-dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vh' }"
      :style="{ width: '30vw' }"
      position="center"
      :modal="true"
    >
      <div class="flex align-items-center flex-column pt-6 px-3">
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '5rem', color: 'var(--green-500)' }"
        ></i>
        <h5>Registration Successful!</h5>
        <p :style="{ lineHeight: 1.5, textIndent: '1rem' }">
          Your account is registered under name <b>{{ user.name }}</b> ; it'll be
          valid newt 30 days without activation. Please check
          <b>{{ user.email }}</b> for activation instructions.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
          <a href="/User"><pv-button label="OK" @click="toggleDialog" class="p-button-text" ref="/home"/></a>
        </div>
      </template>
    </pv-dialog>
  </div>
</template>

<script>


import { UsersApiService } from "../services/users-api.service";

export default {

  name: "RegisterView",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      date: null,
      country: {},
      accept: null,
      submitted: false,
      showMessage: false,
      user: {},
      users: [],
      usersService: null,
    };
  },
  created() {
    this.usersService = new UsersApiService();
    this.usersService.getAll().then((response) => {
      this.users = response.data;
      console.log("created");
    });
  },
  methods: {
    getStorableUser(displayableUser) {
      return {
        id: displayableUser.id,
        name: displayableUser.name,
        lastName: displayableUser.lastName,
        phone: displayableUser.phone,
        email: displayableUser.email,
        password: displayableUser.password,
        birthday: displayableUser.birthday
      };
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.date = null;
      this.country = null;
      this.accept = null;
      this.submitted = false;
    },
    editUser(user) {
      console.log(user);
      this.user = { ...user };
      console.log(this.user);
    },
    findIndexById(id) {
      return this.users.findIndex((user) => user.id === id);
    },

    openDialog() {

      if (this.user.name.trim()) {
        if (this.user.id) {
          this.user = this.getStorableUser(this.user);
          this.usersService
            .update(this.user.id, this.user)
            .then((response) => {
              this.users[this.findIndexById(response.data.id)] =
               this.$toast.add({
                 severity: "success",
                 summary: "Successful",
                 detail: "Tutorial Updated",
                 life: 3000,
               });
              console.log(response)
            });
        } else {
          this.user.id = 0;
          console.log(this.user);
          this.user = this.getStorableUser(this.user);
          this.usersService.create(this.user).then((response) => {
            this.users.push(this.user);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Tutorial Updated",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.user = {};
        this.showMessage = true;
      }

    }
  }
};
</script>

<style scoped>
.form-demo{
  margin-top: 4%;
}
</style>
