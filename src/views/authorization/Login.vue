<template>
  <div class="col-md-12">
    <div class="card card-container ">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
          alt=""/>

      <form class="flex flex-column gap-2" name="form" @submit.prevent="handleLogin">

        <span class="p-float-label" id="test">
            <InputText id="username" v-model="user.username"/>
            <label for="username">Логин или почта</label>
        </span>

        <span class="p-float-label" id="test">
            <Password v-model="user.password" :feedback="false"/>
            <label for="password">Пароль</label>
        </span>

        <Button class="buttonLogin" type="submit" label="Войти" :loading="loading" @click="load"/>
      </form>

      <v-container>
      <v-row>
        <v-col cols="1"></v-col>
        <div uk-grid style="margin-top: 25px">
          <p style="text-align: center">Или войти с помощью:</p>
        </div>
      </v-row>

        <v-row>
          <v-col cols="4"></v-col>
         <v-col cols="3">
           <a style="color: #708090" @click="loginVk">
             <v-img
                 cover
                 width="35"
                 src="./src/assets/vk-icon.svg"
                 style="border-radius: 15px; "
             ></v-img>
           </a>
         </v-col>
        </v-row>
      </v-container>
    </div>
  </div>

</template>

<script>
import User from '../../models/user';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
// import '/src/assets/auth.css'

import {ref} from 'vue';
import {useToast} from "vue-toastification";

const value = ref(null);

export default {
  name: 'Login',
  data() {
    return {
      user: new User(),
      loading: false,
      message: ''
    };
  },
  components: {
    Password,
    Button,
    InputText,
  },

  methods: {
    loginVk(){
      window.open('https://oauth.vk.com/authorize?client_id=51667378&redirect_url=http://127.0.0.1:5173/login&display=page&response_type=code', '_blank', 'popup');
    },
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/');

              const toast = useToast();
              toast.success('Добро пожаловать');
            },
            error => {
              this.loading = false;
              let errorMessage = error.response.data.errors == null
                  ? error.response.data.title
                  : Object.values(error.response.data.errors)[0][0];

              const toast = useToast();

              toast.error(errorMessage);
            }
        );
      }
    }
  }
};
</script>

<style scoped>


.card-container.card {
  max-width: 300px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 50px auto 25px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.p-float-label#test  {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto
}

.buttonLogin{
  margin-top: 20px;
}
</style>
