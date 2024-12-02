<template>
  <div class="container-fluid h-100 w-100 py-1 px-4">
    <div class="row">
      <div class="col-12">    
        <h1>G-Play-Toolkit - Annotationen</h1>
        <p>Hier finden Sie die aktuell verfügbaren Annotationen.</p>
      </div>
      <AnnotationComponent />
      <VideoAnnotation />
    </div>
  </div>
</template>
<script>
import VideoAnnotation from '@/components/VideoAnnotation.vue';
import AnnotationComponent from '../components/AnnotationComponent.vue';

export default {
  name: 'Annotationen',
  components: {
    AnnotationComponent,
    VideoAnnotation,
  },
};
</script>

<style>
/* Add relevant styles here */
</style>