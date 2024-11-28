<template>
    <!-- Main Content -->
    <div class="container-fluid py-4">
      <main class="main-content border-radius-lg">
        <div id="app" class="container-fluid py-4">
          <h1>G-Play-Toolkit - Annotationen</h1>
          <p>
            Hier finden Sie die aktuell verfügbaren Annotationen der Arbeitsgruppe von Dr.
            Thomas Lux am Universitätsklinikum Würzburg.
          </p>
          <div class="row">
            <CardComponent />
              <FormComponent @submit-data="handleSubmit" />
              <RandomNameGenerator />
              <AnnotationComponent @save-annotation="handleSaveAnnotation" />
          </div>
        </div>
      </main>
    </div>
</template>

<script>
import FormComponent from './FormComponent.vue';
import CardComponent from './CardComponent.vue';
import RandomNameGenerator from './RandomNameGenerator.vue';
import AnnotationComponent from './AnnotationComponent.vue';
import ImageCorrection from './ImageCorrection.vue';
// Import your router to access routes

export default {
  name: "Annotationen",
  components: {
    ImageCorrection,
    FormComponent,
    CardComponent,
    RandomNameGenerator,
    AnnotationComponent,
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
@import url("./assets/css/material-dashboard.css?v=3.1.0");

/* Add any additional global styles here */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
