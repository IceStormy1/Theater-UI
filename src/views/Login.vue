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
            <label for="username">Логин</label>
        </span>

        <span class="p-float-label" id="test">
            <Password v-model="user.password" :feedback="false"/>
            <label for="password">Пароль</label>
        </span>

        <Button class="buttonLogin" type="submit" label="Войти"  :loading="loading" @click="load" />
      </form>

    </div>
  </div>

</template>

<script>
import User from '../models/user';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import {ref} from 'vue';

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
    Password: Password,
    Button: Button,
    InputText: InputText,
  },
  computed: {
    loggedIn() {
      return localStorage.getItem('accessToken') !== null;
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/');
            },
            error => {
              this.loading = false;
              this.message =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
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