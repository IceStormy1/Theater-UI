<template>
  <TabView>

    <TabPanel header="Сотрудники">
      <WorkerList />
    </TabPanel>

    <TabPanel header="Пользователи">
      <UsersAdmin />
    </TabPanel>

    <TabPanel header="Должности">
      <PositionAdminPage />
    </TabPanel>

    <TabPanel header="Спектакли">
      <PlayList />
    </TabPanel>

    <TabPanel header="Жанры">
      <GenreList />
    </TabPanel>

  </TabView>

  <div class="about">
    <h1>This is a login-protected page</h1>
    <ul class="claims">
      <li v-for="c in claims" :key="c.key">
        <strong>{{ c.key }}</strong
        >: {{ c.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import TabMenu from 'primevue/TabMenu'
import TabPanel from 'primevue/TabPanel'
import TabView from 'primevue/TabView'
import WorkerList from './WorkerList.vue'
import UsersAdmin from './UsersAdmin.vue'
import GenreList from './GenreList.vue'
import PositionAdminPage from './PositionAdminPage.vue'
import PlayList from './PlayList.vue'

export default {
  name: 'Admin',
  computed: {
    user() {
      return { ...this.$oidc.userProfile, accessToken: this.$oidc.accessToken }
    },
    claims() {
      if (this.user) {
        return Object.keys(this.user).map(key => ({
          key,
          value: this.user[key]
        }))
      }
      return []
    }
  },
  components: {
    TabMenu,
    TabPanel,
    TabView,
    WorkerList,
    UsersAdmin,
    PositionAdminPage,
    PlayList,
    GenreList,
  }
}
</script>
