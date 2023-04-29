<template>
  <div class="col-md-12">
    <div class="card card-container ">
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
       alt=""/>

      <form class="flex flex-column gap-2" name="form" @submit.prevent="handleRegister">

        <span class="p-float-label" id="test">
            <InputText id="username" v-model="user.username"/>
            <label for="username">Логин</label>
        </span>

        <span class="p-float-label" id="test">
            <Password v-model="user.password" inputId="password">
               <template #footer>
                    <Divider/>
                    <p class="mt-2">Требования:</p>
                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                      <li>Один символ в нижнем регистре</li>
                      <li>Один символо в верхнем регистре</li>
                      <li>Одна цифра</li>
                      <li>Минимум 8 цифр</li>
                    </ul>
                  </template>
            </Password>
            <label for="password">Пароль</label>
        </span>

        <span class="p-float-label" id="test">
            <InputText id="email" v-model="user.email" placeholder="user@mail.ru"/>
            <label for="email">Почта</label>
        </span>

        <span class="p-float-label" id="test">
            <InputText id="lastName" v-model="user.lastName" placeholder="Иванов"/>
            <label for="lastName">Фамилия</label>
        </span>

        <span class="p-float-label" id="test">
            <InputText id="firstName" v-model="user.firstName" placeholder="Иван"/>
            <label for="firstName">Имя</label>
        </span>

        <span class="p-float-label" id="test">
            <InputText id="middleName" v-model="user.middleName" placeholder="Иванович"/>
            <label for="middleName">Отчество</label>
        </span>

        <span class="p-float-label" id="test">
            <Calendar v-model="user.birthDate" :minDate="minDate" :maxDate="maxDate" :manualInput="false" inputId="birth_date" />
            <label for="birth_date">Дата рождения</label>
        </span>

        <span class="p-float-label" id="test">
            <InputNumber v-model="user.phone" placeholder="+7 (999) 999-99-99" inputId="phone" ></InputNumber>
          <label for="phone">Номер телефона</label>
        </span>

        <span class="p-float-label" id="test">
           <Dropdown v-model="user.gender" :options="genders" showClear optionLabel="name" class="w-full md:w-12rem" inputId="gender" />
          <label for="gender">Пол</label>
        </span>

        <Button class="buttonLogin" type="submit" label="Зарегистрироваться" :loading="loading"/>

      </form>

    </div>
  </div>
</template>

<script>

import User from '../models/user';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/Calendar';
import Dropdown from 'primevue/dropdown';
import InputMask from 'primevue/inputmask';
import InputNumber  from 'primevue/inputnumber';

import {ref} from 'vue';

let today = new Date();
let year = today.getFullYear();

const minDate = ref(new Date());
const maxDate = ref(new Date());
const genders = ref([
  { name: 'Мужской', code: 1 },
  { name: 'Женский', code: 2 },
]);

minDate.value.setMonth(1);
minDate.value.setFullYear(year - 100);
maxDate.value.setMonth(12);
maxDate.value.setFullYear(year - 14);

export default {
  name: 'Register',
  data() {
    return {
      user: new User(),
      loading: false,
      message: '',
      minDate: minDate,
      maxDate: maxDate,
      genders: genders
    };
  },
  components: {
    Password: Password,
    Button: Button,
    InputText: InputText,
    Calendar : Calendar,
    Dropdown  : Dropdown ,
    InputMask  : InputMask ,
    InputNumber  : InputNumber ,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.loading = true;
      this.$store.dispatch('auth/register', this.user).then(
          _ => {
            this.$store.dispatch('auth/login', this.user);
            this.$router.push('/');
          },
          error => {
            this.loading = false;
            console.log(error.response)
            let errorMessage =  error.response.data.errors == null ? error.response.data.title : Object.values(error.response.data.errors)[0][0]

             alert(errorMessage)
          }
      );
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

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

.p-float-label#test {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto
}

.buttonLogin {
  margin-top: 20px;
}
</style>