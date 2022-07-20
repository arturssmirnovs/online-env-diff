<template>
  <div class="container-fluid">
    <img alt="Vue logo" src="./assets/logo.png" class="logo mx-auto d-block">
    <DiffChecker/>
  </div>
</template>

<script lang="ts">
import DiffChecker from './components/DiffChecker.vue'
import Vue from 'vue';
import Component from 'vue-class-component'

@Component({
  components: {
    DiffChecker
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
.logo {
  max-width: 300px;
}
</style>
