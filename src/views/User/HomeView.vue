<script>
export default{
  name: "HomeView",
  data() {
    return {
      drawer: false,
      items: [
        { label: "Register", to: "/register" },
        { label: "Search", to: "/search" }
      ],
    };
  },
};
</script>

<template>
  <pv-toolbar class="bg-blue-500">
    <template #start>
      <h3>Learning Center</h3>
    </template>
    <template #end>
      <div>
        <router-link v-for="item in items" :to="item.to" custom v-slot="{ navigate, href }" :key="item.label">
          <pv-button class="p-button-text text-white" :href="href" @click="navigate">{{ item.label }}</pv-button>
        </router-link>
      </div>
    </template>
  </pv-toolbar>
  <RouterView />
</template>

<style>
</style>
