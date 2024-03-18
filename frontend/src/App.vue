<script setup>
  import AppNavbar from '@/components/AppNavbar.vue';
  import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
  <header>
    <AppNavbar /> 
  </header>  
  <main class="flex-shrink-0">
    <RouterView />
  </main>
  <footer class="footer mt-auto py-3 bg-light">
    <AppFooter />
  </footer>

</template>

<style scoped>
  main > .container {
    padding: 60px 15px 0;
  }
</style>
