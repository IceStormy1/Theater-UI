<template>
  <div>
    <Menubar class="p-mb-3" :model="items"></Menubar>
  </div>

  <div class="container">
    <router-view />
  </div>

</template>

<script>
import Menubar from "primevue/menubar";

export default {
  components: {
    Menubar: Menubar
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user != null;
    },
  },
  mounted() {
    this.userId =  localStorage.getItem('id');
    this.items = [
      {
        label: 'Главная',
        to   : "/",
      },
      {
        label: 'Регистрация',
        to   : "/register",
        visible: () => !this.currentUser,
      },
      {
        label: 'Войти',
        to   : "/login",
        visible: () => !this.currentUser,
      },
      {
        label: 'Профиль',
        visible: () => this.currentUser,
        items:[
          {
            label: 'Перейти к профилю',
            command : () => this.$router.push('/profile/' + this.userId)
          },
          {
            label: 'Выйти',
            command : () => this.logOut(),
          },
        ]
      },
    ];
  },
  data() {
    return {
      userId: null,
      items: [],
    }
  }
};
</script>
