<template>
    <div id="data-form">
      <input type="number" id="polypCount" class="card mb-4" placeholder="Anzahl der Polypen">
  
      <textarea id="comments" class="form-control" placeholder="Comments"></textarea>
      <button id="saveData" class="btn btn-primary mt-2">Speichern</button>
  
      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newName: '',
        gender: '',
        errorMessage: '',
        names: [],
      };
    },
    methods: {
      getImageUrl(name) {
        return `https://path_to_image/${name}`;
      },
      handleAddRandomName() {
        const selectedGender = this.gender;
        if (!selectedGender) {
          this.errorMessage = 'Please specify the gender before adding a random name.';
          return;
        }
  
        this.errorMessage = '';
        const randomName = this.generateRandomName();
        this.names.push({ label: randomName, imageUrl: 'path_to_image' });
      },
      generateRandomName() {
        const namePool = ['Name1', 'Name2', 'Name3'];
        return namePool[Math.floor(Math.random() * namePool.length)];
      },
      // More methods if necessary...
    },
  };
  </script>
  
  <style scoped>
  /* Add component-specific styles here */
  </style>
  