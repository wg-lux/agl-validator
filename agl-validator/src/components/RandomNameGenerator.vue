<template>
  <div>
    <!-- Gender selection using radio buttons -->
    <label>Select Gender:</label>
    <div>
      <label>
        <input type="radio" value="male" v-model="selectedGender" />
        Male
      </label>
      <label>
        <input type="radio" value="female" v-model="selectedGender" />
        Female
      </label>
    </div>

    <!-- Button to add random name -->
    <button class="btn btn-success" @click="handleAddRandomName">Zufälligen Namen hinzufügen</button>

    <!-- Error message display -->
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

    <!-- List of added names with delete buttons -->
    <ul>
      <keep-alive>
        <li v-for="(name, index) in randomNames" :key="index">
          {{ name }}
          <button class="btn btn-danger" @click="removeName(index)">Löschen</button>
        </li>
      </keep-alive>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomNames: [], // Array to store multiple random names
      selectedGender: "", // Default gender selection (empty string)
      femaleFirstNames: [],
      femaleLastNames: [],
      maleFirstNames: [],
      maleLastNames: [],
      errorMessage: "" // Variable to store error messages
    };
  },
  methods: {
    async loadNames() {
      const loadNameFile = async (filePath) => {
        const response = await fetch(filePath);
        const text = await response.text();
        return text.split('\n').map(name => name.trim()).filter(name => name.length > 0);
      };

      this.femaleFirstNames = await loadNameFile('/assets/names-dictionary/first_names_female_ascii.txt');
      this.femaleLastNames = await loadNameFile('/assets/names-dictionary/last_names_female_ascii.txt');
      this.maleFirstNames = await loadNameFile('/assets/names-dictionary/first_names_male_ascii.txt');
      this.maleLastNames = await loadNameFile('/assets/names-dictionary/last_names_male_ascii.txt');

      // Check if arrays are of equal length and handle error
      if (
        this.femaleFirstNames.length !== this.femaleLastNames.length ||
        this.maleFirstNames.length !== this.maleLastNames.length
      ) {
        this.errorMessage = "First and last name arrays are not of the same length.";
        return;
      }
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

      // Ensure that arrays are not empty and have the same length
      if (firstNameArray.length === 0 || lastNameArray.length === 0) {
        this.errorMessage = "First or last name array is empty.";
        return;
      }

      // Ensure that the index used for the first and last names is the same
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
    await this.loadNames();
  }
};
