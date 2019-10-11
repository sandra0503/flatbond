<template>
  <div class="about">
    <router-link to="/">back</router-link>
    <h1>Great news! Your flatbond was successfully created.</h1>
  </div>
</template>

<script>
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default {
  name: "success"
};
</script>
