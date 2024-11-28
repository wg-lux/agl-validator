<template>
  <div class="container-fluid h-100 w-100 py-1 px-4">

    <div class="row">
      <div class="col-12">    
        <h1>G-Play-Toolkit - Annotationen</h1>
        <p>Hier finden Sie die aktuell verfügbaren Annotationen.</p>
      </div>
      <CardComponent />
      <FormComponent @submit-data="handleSubmit" />
      <RandomNameGenerator />
      <AnnotationComponent @save-annotation="handleSaveAnnotation" />
    </div>
  </div>
</template>

<script>
import FormComponent from '../components/FormComponent.vue';
import CardComponent from '../components/CardComponent.vue';
import RandomNameGenerator from '../components/RandomNameGenerator.vue';
import AnnotationComponent from '../components/AnnotationComponent.vue';

export default {
  name: 'Annotationen',
  components: {
    FormComponent,
    CardComponent,
    RandomNameGenerator,
    AnnotationComponent,
  },
};
</script>

<style>
/* Add relevant styles here */
</style>
