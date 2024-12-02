<template>
  <div class="container-fluid py-4">
    <div class="card">
      <div class="card-header pb-0">
        <h4 class="mb-0">Annotationen für Frames der Endoskopie</h4>
      </div>
      <div class="card-body">
        <!-- File Upload Section -->
        <div class="row mb-4">
          <div class="col-12">
            <div class="form-group">
              <label class="form-control-label">Bild hochladen</label>
              <input 
                type="file" 
                class="form-control" 
                @change="handleFileUpload"
                accept="image/*"
              >
            </div>
          </div>
        </div>

        <!-- Image Card with Name Dropping -->
        <div class="row mb-4">
          <div class="col-12">
            <div 
              class="card mb-4" 
              @drop="handleDrop" 
              @dragover.prevent
              ref="imageCard"
            >
              <!-- Background Image -->
              <img 
                v-if="processedImageUrl" 
                :src="processedImageUrl" 
                class="img-fluid" 
                alt="Processed Image"
              >
              
              <!-- Original Image Toggle -->
              <div v-if="originalImageUrl" class="position-absolute top-0 end-0 m-2">
                <button 
                  class="btn btn-info btn-sm"
                  @click="toggleImage"
                >
                  {{ showOriginal ? 'Show Processed' : 'Show Original' }}
                </button>
              </div>

              <!-- Dropped Names -->
              <img
                v-for="(droppedName, index) in randomNames"
                :key="index"
                :src="getNameImageUrl(droppedName)"
                :style="{ 
                  top: droppedName.y + 'px', 
                  left: droppedName.x + 'px', 
                  position: 'absolute' 
                }"
                class="dropped-name"
                :alt="droppedName"
                draggable="true"
                @dragstart="handleDragStart(droppedName, $event)"
              />
            </div>
          </div>
        </div>

        <!-- Name Generator Section -->
        <div class="row mb-4">
          <div class="col-12">
            <div class="card bg-light">
              <div class="card-body">
                <h5 class="card-title">Namensgenerator</h5>
                
                <!-- Gender Selection -->
                <div class="mb-3">
                  <label class="form-label">Geschlecht:</label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="male" 
                           value="male" v-model="selectedGender">
                    <label class="form-check-label" for="male">Männlich</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="female" 
                           value="female" v-model="selectedGender">
                    <label class="form-check-label" for="female">Weiblich</label>
                  </div>
                </div>

                <button 
                  @click="handleAddRandomName" 
                  class="btn btn-info"
                  :disabled="!selectedGender"
                >
                  Zufallsname generieren
                </button>

                <!-- Generated Names List -->
                <div class="name-list mt-3">
                  <div
                    v-for="(name, index) in randomNames"
                    :key="index"
                    class="name-item card p-3 d-flex flex-row align-items-center"
                    draggable="true"
                    @dragstart="handleDragStart(name, $event)"
                  >
                    <div>{{ name }}</div>
                    <button 
                      class="btn btn-danger btn-sm ms-auto" 
                      @click="removeName(index)"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row">
          <div class="col-12">
            <button 
              @click="saveAnnotation" 
              class="btn btn-primary"
              :disabled="!canSubmit"
            >
              Annotation speichern
            </button>
          </div>
        </div>

        <!-- Error Messages -->
        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://127.0.0.1:8000/api';

export default {
  name: 'UnifiedAnnotationComponent',
  data() {
    return {
      selectedGender: '',
      randomNames: [],
      errorMessage: '',
      uploadedFile: null,
      processedImageUrl: null,
      originalImageUrl: null,
      showOriginal: false,
      namePositions: new Map(),
      femaleFirstNames: [],
      femaleLastNames: [],
      maleFirstNames: [],
      maleLastNames: []
    };
  },
  computed: {
    canSubmit() {
      return this.processedImageUrl && this.randomNames.length > 0;
    },
    displayedImageUrl() {
      return this.showOriginal ? this.originalImageUrl : this.processedImageUrl;
    }
  },
  methods: {
    async loadNames() {
      const loadNameFile = async (filePath) => {
      const response = await fetch(filePath);
      const text = await response.text();
      const names = text.split(/\r\n|\n|\r/)
        .map(name => name.trim())
        .filter(name => name.length > 0);

      console.log(`Loading from ${filePath}:`);
      console.log('Raw text length:', text.length);
      console.log('Number of lines:', names.length);

      // Additional logging
      const emptyLines = text.split(/\r\n|\n|\r/).filter(line => line.trim() === '').length;
      console.log('Empty lines count:', emptyLines);
      console.log('First few names:', names.slice(0, 1188));
      console.log('Last few names:', names.slice(-5));

      return names;
    };


      // Load female and male names
      this.femaleFirstNames = await loadNameFile('./assets/names-dictionary/first_names_female_ascii.txt');
      this.femaleLastNames = await loadNameFile('./assets/names-dictionary/last_names_female_ascii.txt');
      this.maleFirstNames = await loadNameFile('./assets/names-dictionary/first_names_male_ascii.txt');
      this.maleLastNames = await loadNameFile('./assets/names-dictionary/last_names_male_ascii.txt');

      console.log('Final lengths:');
      console.log('Female first names:', this.femaleFirstNames.length);
      console.log('Female last names:', this.femaleLastNames.length);
    
      // Validation: Ensure first names and last names arrays have equal lengths
      if (this.femaleFirstNames.length !== this.femaleLastNames.length) {
        this.errorMessage = "Female first names and last names array are not of the same length.";
        return;
      }
      if (this.maleFirstNames.length !== this.maleLastNames.length) {
        this.errorMessage = "Male first names and last names are not of the same length.";
        return;
      }

      // Clear any previous error message after successful load
      this.errorMessage = "";
    },
    getRandomIndex(array) {
      // Return a random index from the array
      return Math.floor(Math.random() * array.length);
    },
    generateRandomName(gender) {
      if (!this.selectedGender) {
        this.errorMessage = 'Please specify the gender before adding a random name.';
        return;
      }

      let firstNameArray, lastNameArray;

      switch (gender) {
        case 'male':
          firstNameArray = this.maleFirstNames;
          lastNameArray = this.maleLastNames;
          break;
        case 'female':
          firstNameArray = this.femaleFirstNames;
          lastNameArray = this.femaleLastNames;
          break;
        default:
          this.errorMessage = 'Invalid gender selected.';
          return;
      }

      // Clear the error message if everything is fine
      this.errorMessage = "";

      // Ensure arrays are not empty and have the same length (validated earlier)
      const randomIndex = this.getRandomIndex(firstNameArray);

      // Return the first name and last name at the same index
      const firstNameSelected = firstNameArray[randomIndex];
      const lastNameSelected = lastNameArray[randomIndex];

      return `${firstNameSelected} ${lastNameSelected}`;
    },
    handleAddRandomName() {
      const randomName = this.generateRandomName(this.selectedGender); // Pass the selected gender
      if (randomName) {
        this.randomNames.push(randomName); // Add to the array of random names if valid
      }
    },
    removeName(index) {
      this.randomNames.splice(index, 1); // Remove the name at the given index
    }
  },
  async created() {
    await this.loadNames(); // Load names when the component is created
  },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('validation', 'true');

      try {
        const response = await fetch(`${API_URL}/process-file/`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        this.processedImageUrl = data.processed_file_url;
        this.originalImageUrl = data.original_image_url;
        
        // If gender was detected, pre-select it
        if (data.gender_pars) {
          this.selectedGender = data.gender_pars.toLowerCase();
        }
      } catch (error) {
        this.errorMessage = `Upload gescheitert, die Anfrage an die API hat folgenden Error ausgeworfen: ${error.message}`;
      }
    },

    handleDragStart(name, event) {
      event.dataTransfer.setData('text/plain', name);
    },

    handleDrop(event) {
      const name = event.dataTransfer.getData('text/plain');
      const rect = this.$refs.imageCard.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      this.namePositions.set(name, { x, y });
    },

    toggleImage() {
      this.showOriginal = !this.showOriginal;
    },
    async saveAnnotation() {
      if (!this.canSubmit) return;

      const annotationData = {
        image_name: this.uploadedFile?.name,
        original_image_url: this.originalImageUrl,
        processed_image_url: this.processedImageUrl,
        dropped_names: Array.from(this.namePositions.entries()).map(([name, pos]) => ({
          name,
          x: pos.x,
          y: pos.y
        }))
      };

      try {
        const response = await fetch(`${API_URL}/annotations/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.getCookie('csrftoken')
          },
          body: JSON.stringify(annotationData)
        });

        if (!response.ok) throw new Error('Failed to save annotation');

        this.$emit('annotation-saved', await response.json());
        this.resetForm();
      } catch (error) {
        this.errorMessage = `Failed to save: ${error.message}`;
      }
    }
  };

</script>

<style scoped>
/* ... previous styles ... */

.dropped-name {
  position: absolute;
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  cursor: move;
  z-index: 100;
}

.image-container {
  position: relative;
  min-height: 200px;
  border: 2px dashed #ccc;
  margin-bottom: 20px;
}

.image-container.dragover {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}
</style>