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
                <h5 class="card-title">Zufallsname Generator</h5>
                
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