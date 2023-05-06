<template>
<!--  <div>Пользователь {{ $route.params.id }}</div>-->

  <div class="uk-text-center" uk-grid>
    <div class="uk-width-auto@m">
<!--      <button class="uk-button uk-button-primary" @click.prevent="submitForm">-->
<!--        Submit-->
<!--      </button>-->

      <div class="uk-card uk-card-default uk-card-body">

        <div class="avatar-upload">
          <div class="avatar-selector" v-if="!imageSrc">
            <label>
              <input type="file" @change="onFileChange" style="display:none" accept="image/*">
              <div>
                <span uk-icon="icon: cloud-upload"></span>
                <span class="uk-text-middle">Upload Avatar</span>
              </div>
            </label>
          </div>
          <div class="avatar-preview" v-else>
            <div class="avatar-preview-img" :style="{ 'background-image': 'url(' + imageSrc + ')' }"></div>
          </div>
        </div>
        <button v-if="file" class="uk-button uk-button-primary" @click.prevent="submitForm">
          Submit
        </button>

      </div>
    </div>
    <div class="uk-width-1-3@m">

      <Card>
        <template #title> Карточка долбаеба </template>
        <template #content>

          <dl class="uk-description-list uk-description-list-divider">
            <dt>Email</dt>
            <dd> {{currentUser.email}}</dd>
            <dt>Имя</dt>
            <dd>{{currentUser.firstName}}</dd>
            <dt>Фамилия</dt>
            <dd> {{currentUser.lastName}} </dd>
            <dt>Отчество</dt>
            <dd> {{currentUser.middleName}} </dd>
            <dt>Пол</dt>
            <dd> {{currentUser.gender}} </dd>
            <dt>Телефон</dt>
            <dd> {{currentUser.phone}} </dd>
          </dl>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>

import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import UIkit from "uikit";
import axios from "axios";
import {useToast} from "vue-toastification";


export default {
  name: "Profile",
  components: {
    InputText,
    Card,
  },

  data() {
    return {
      imageSrc: null,
      file: null,
      currentUser: {
        id: null,
        userName: null,
        password: null,
        email: null,
        firstName: null,
        lastName: null,
        middleName: null,
        phone: null,
        gender: null,
        birthDate: "2023-04-30T11:52:19.107Z",
        photo: null
      }
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

      let bodyFormData = new FormData();
      bodyFormData.append('file', this.file);


      axios.post('/filestorage?bucketId=1', bodyFormData).then((response) => {
        this.currentUser.photo = response.data
        axios.put('admin/user/' + this.currentUser.id, this.currentUser).then(() => {
          const toast = useToast();
          toast.success('Пользователь обновлен');

        }).catch(function (error) {
          const toast = useToast();

          toast.error('ошибка');
        })

      }).catch(function () {
        const toast = useToast();

        toast.error('ошибка при загрузке фото');
      });


      // UIkit.notification({
      //   message: "Form submitted successfully!",
      //   status: "success",
      // });
    },

    loadUser() {
      let id = this.$route.params.id;
      console.log(id);
      let config = {
        method: 'get',
        url: 'account/user/' + id,
      };

      this.axios(config)
          .then((response) => {
            console.log(response);
            this.currentUser = response.data;
            this.imageSrc = this.currentUser.photo.directUrl;
            console.log(this.currentUser);

          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {
    this.loadUser();
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
