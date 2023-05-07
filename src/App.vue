<template>
  <v-app>
    <div>
      <Menubar class="p-mb-3" :model="items"></Menubar>
    </div>

    <div class="container">
      <router-view/>
    </div>

    <v-footer class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Театр теней</strong>
        </v-col>
      </v-row>
    </v-footer>

    <yandex-map
        ref="map"
        :coords="coords"
        zoom="20"
        style="width: 100%; height: 600px"
        :controls="[]"
        :settings="settings"
    >
      <ymap-marker
          marker-id="123"
          :coords="coords"
          :icon="markerIcon"
      />
    </yandex-map>

  </v-app>

</template>

<script>
import Menubar from "primevue/menubar";
import {yandexMap, ymapMarker} from 'vue-yandex-maps'

export default {
  components: {
    Menubar,
    yandexMap,
    ymapMarker
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user != null;
    },
  },
  mounted() {
    this.userId = localStorage.getItem('id');
    this.items = [
      {
        label: 'Главная',
        to: "/",
      },
      {
        label: 'Регистрация',
        to: "/register",
        visible: () => !this.currentUser,
      },
      {
        label: 'Войти',
        to: "/login",
        visible: () => !this.currentUser,
      },
      {
        label: 'Профиль',
        visible: () => this.currentUser,
        items: [
          {
            label: 'Перейти к профилю',
            //command: () => this.$router.push('/profile/' + this.userId)
            to: '/profile/' + this.userId,
          }, {
            label: 'Админка',
            command: () => this.$router.push('/admin/')
          },
          {
            label: 'Выйти',
            command: () => this.logOut(),
          },
        ]
      },
    ];
  },
  data() {
    return {
      userId: null,
      items: [],
      map: null,
      coords: [47.237235, 39.712282],
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: './src/assets/logoNormal.svg',
        imageSize: [300, 300],
        imageOffset: [-100, -150],
        contentOffset: [0, 0],
      },
      settings: {
        apiKey: '7d673843-025c-4b7e-8f00-acad155b6947',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      }
    }
  }
};
</script>