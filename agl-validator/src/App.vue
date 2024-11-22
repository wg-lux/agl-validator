<template>
  
<NavbarComponent />
  <div class="g-sidenav-show bg-gray-100">
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
      <SidebarComponent />
    </aside>

    <div class="container-fluid py-4">
      <main class="main-content border-radius-lg">
        <div id="app" class="container-fluid py-4">
          <h1>G-Play Validator</h1>
          <p>Validate your data here</p>
          <div class="row">
            <CardComponent />
            <FormComponent @submit-data="handleSubmit" />
            <RandomNameGenerator />
            <AnnotationComponent @save-annotation="handleSaveAnnotation" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import FormComponent from './components/FormComponent.vue';
import CardComponent from './components/CardComponent.vue';
import RandomNameGenerator from './components/RandomNameGenerator.vue';
import AnnotationComponent from './components/AnnotationComponent.vue';
import ImageCorrection from './components/ImageCorrection.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    SidebarComponent,
    ImageCorrection,
    FormComponent,
    CardComponent,
    RandomNameGenerator,
    AnnotationComponent
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700');
@import url('./assets/css/material-dashboard.css?v=3.1.0');

/* Add any additional global styles here */
</style>
