<template>
  <v-app>
    <div>
      <Menubar class="p-mb-3" :model="items"></Menubar>
    </div>

    <div class="container">
      <router-view/>
    </div>

    <v-footer class="bg-grey-lighten-1" absolute style="margin-top: 350px">
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
  computed: {
    isAuthenticated() {
      return this.$oidc.isAuthenticated;
    },
    userClaims(){
      return  typeof this.$oidc.userProfile === 'undefined' ? null : this.$oidc.userProfile;
    }
  },
  mounted() {
    this.items = [
      {
        label: 'Главная',
        to: "/",
      },
      {
        label: 'Регистрация',
        to: "/register",
        visible: () => !this.isAuthenticated,
      },
      {
        label: 'Войти',
        to: "/login",
        visible: () => !this.isAuthenticated,
      },
      {
        label: 'Профиль',
        visible: () => this.isAuthenticated,
        items: [
          {
            label: 'Перейти к профилю',
            to: '/profile/me'
          },
          {
            label: 'Админка',
            to: '/admin/'
          },
          {
            label: 'Выйти',
            command: () => this.$oidc.signOut(),
          },
        ]
      },
    ];
  },
  data() {
    return {
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
