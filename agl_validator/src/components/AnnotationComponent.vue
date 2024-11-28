<template>
  <div class="annotation-component">
    
    <button @click="saveAnnotation" class="btn btn-primary mt-2">Save Annotation</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AnnotationComponent',
  props: {
    initialAnnotationData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      annotationData: { ...this.initialAnnotationData },
      droppedNames: []  // Populate with relevant data as needed
    };
  },
  methods: {
    async saveAnnotation() {
      const annotationPayload = {
        annotation: {
          label_name: this.annotationData.label,
          image_name: this.annotationData.image_name,
          original_image_url: this.annotationData.original_image_url,
          polyp_count: this.annotationData.polyp_count,
          comments: this.annotationData.comments,
          gender: this.annotationData.gender,
          name_image_url: this.annotationData.name_image_url,
          dropped_names: this.droppedNames  // Ensure your backend can handle this
        }
      };

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/annotations/', annotationPayload, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.getCookie('csrftoken')  // Ensure CSRF token is correctly handled
          }
        });

        if (response.status === 200) {
          alert('Annotation saved successfully!');
        } else {
          alert('Failed to save annotation.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the annotation.');
      }
    },
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  }
};
</script>

<style scoped>
.annotation-component {
  /* Add your styles here */
}
</style>
