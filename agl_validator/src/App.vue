<template>
  <body>
    <div class="g-sidenav-show bg-gray-200">
      <!-- Sidebar -->
      <aside
        class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
        id="sidenav-main"
      >
        <SidebarComponent />
      </aside>

      <!-- Main Content -->
      <main class="main-content position-relative max-height-vh-95 h-100 border-radius-lg">
        <!-- Navbar -->
        <NavbarComponent />

        <!-- Container -->
        <div class="container-fluid h-100 w-100 py-1 px-4">
          <div class="row">
            <div class="col-12">
              <router-view />
            </div>
          </div>
        </div>
      </main>
    </div>
  </body>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import DashboardComponent from './components/DashboardComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    SidebarComponent,
    DashboardComponent
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700');
@import url('./assets/css/material-dashboard.css?v=3.1.0');


</style>
