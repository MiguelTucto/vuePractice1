<template>
  <div class="card">
    <div class="flex justify-content-center mb-5">
      <img src="src/assets/icon.png">
    </div>
    <div class="grid">
      <div class="col-5 flex  justify-content-center">

          <div class="p-fluid">
            <div class="p-inputgroup mb-2">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
              <pv-input-text id="username" type="text" placeHolder="Email"/>
            </div>
            <div class="p-inputgroup mb-2">
            <span class="p-inputgroup-addon">
              <i class="pi pi-key"/>
            </span>

              <pv-input-text id="password" type="password" placeHolder="Password" />
            </div>
            <pv-button label="Login"></pv-button>
          </div>

      </div>
      <div class="col-2">
        <pv-divider layout="vertical">
          <b>OR</b>
        </pv-divider>
      </div>
      <div class="col-5 flex align-items-center justify-content-center">
        <a href="/Register" style="text-decoration: none"><pv-button label="Sign Up" icon="pi pi-user-plus" class="p-button-success" ></pv-button></a>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "HomeFView",

};
</script>

<style scoped>
.card{
  padding-top: 10%;

}
</style>