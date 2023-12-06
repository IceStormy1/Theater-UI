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
