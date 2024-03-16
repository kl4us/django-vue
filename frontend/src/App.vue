<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import FooterBar from '@/components/FooterBar.vue';
</script>

<template>
  <header>
    <NavigationBar /> 
  </header>  
  <main class="flex-shrink-0">
    <RouterView />
  </main>
  <footer class="footer mt-auto py-3 bg-light">
    <FooterBar />
  </footer>

</template>

<style scoped>
  main > .container {
    padding: 60px 15px 0;
  }
</style>
