<template>
    <!-- Main Content -->
    <div class="container-fluid py-4">
      <main class="main-content border-radius-lg">
        <div id="app" class="container-fluid py-4">
          <h1>Fallgenerator</h1>
          <p>
            Beginnen Sie hier mit der automatischen Erstellung Ihres Falls.
          </p>
            <div class="row">
                <div class="col-md-4 col-sm-6 mb-4">
                    <div class="card h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">Histopathologie</h5>
                        <p class="card-text">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title"></h5>        

            </div>
        </div>
      </main>
    </div>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
// Import your router to access routes
import router from "../router";

export default {
  name: "App",
  components: {
    NavbarComponent,
    SidebarComponent,
  },
  data() {
    return {
      // Extract routes from the router file
      routes: router.options.routes.filter((route) => route.name),
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700");
@import url("../assets/css/material-dashboard.css?v=3.1.0");

/* Add any additional global styles here */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
