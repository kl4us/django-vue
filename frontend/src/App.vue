<script setup>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
</script>

<template>
  <header>
    <Navbar /> 
  </header>  
  <main class="flex-shrink-0">
    <RouterView />
  </main>
  <footer class="footer mt-auto py-3 bg-light">
    <Footer />
  </footer>

</template>

<style scoped>
  main > .container {
    padding: 60px 15px 0;
  }
</style>
