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

    <TabPanel header="Пьесы">
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
      </p>
    </TabPanel>

  </TabView>
</template>

<script>
import TabMenu from 'primevue/TabMenu'
import TabPanel from 'primevue/TabPanel'
import TabView from 'primevue/TabView'
import WorkerList from './WorkerList.vue'
import UsersAdmin from './UsersAdmin.vue'
import PositionAdminPage from './PositionAdminPage.vue'

export default {
  name: 'Admin',
  components: {
    TabMenu,
    TabPanel,
    TabView,
    WorkerList,
    UsersAdmin,
    PositionAdminPage
  }
}
</script>
