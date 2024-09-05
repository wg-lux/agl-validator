<template>
    <body class="g-sidenav-show  bg-gray-100">
     <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
      
    <NavbarComponent />
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
  </body>

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
  },
  mounted() {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = './assets/css/material-dashboard.css?v=3.1.0';
    link2.id = 'pagestyle';
    document.head.appendChild(link2);

    const script1 = document.createElement('script');
    script1.src = './assets/js/core/popper.min.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = './assets/js/core/bootstrap.min.js';
    script2.async = true;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = './assets/js/plugins/perfect-scrollbar.min.js';
    script3.async = true;
    document.body.appendChild(script3);

    const script4 = document.createElement('script');
    script4.src = './assets/js/plugins/smooth-scrollbar.min.js';
    script4.async = true;
    document.body.appendChild(script4);

    const script5 = document.createElement('script');
    script5.src = './assets/js/material-dashboard.min.js?v=3.1.0';
    script5.async = true;
    document.body.appendChild(script5);
  }
};
</script>

<style>
/* Add any additional global styles here */
</style>
