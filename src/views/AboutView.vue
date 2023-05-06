<template>
  <div class="avatar-upload">
    <div class="avatar-selector" v-if="!imageSrc">
      <label>
        <input type="file" @change="onFileChange" style="display:none" accept="image/*">
        <div class="uk-placeholder">
          <span uk-icon="icon: cloud-upload"></span>
          <span class="uk-text-middle">Upload Avatar</span>
        </div>
      </label>
    </div>
    <div class="avatar-preview" v-else>
      <div class="avatar-preview-img" :style="{ 'background-image': 'url(' + imageSrc + ')' }"></div>
    </div>
  </div>

  <button class="uk-button uk-button-primary" @click.prevent="submitForm">
    Submit
  </button>
</template>


<script>
import UIkit from "uikit";

export default {
  data() {
    return {
      imageSrc: null,
      file: null
    }
  },
  methods: {
    onFileChange(event) {
      const files = event.target.files
      if (files && files.length > 0) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageSrc = e.target.result
        }
        reader.readAsDataURL(file)

        this.file = file;
      }
    },

    submitForm() {
      // Here you can add your form submission logic
      console.log("Avatar: ", this.file);
      UIkit.notification({
        message: "Form submitted successfully!",
        status: "success",
      });
    },
  }
}
</script>




<style>
.avatar-upload {
  width: 150px;
  height: 150px;
  position: relative;
}

.avatar-selector {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px dashed #ccc;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-selector label {
  display: block;
}

.avatar-preview {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-preview-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
