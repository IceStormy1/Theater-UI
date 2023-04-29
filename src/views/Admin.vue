<template>
  <TabMenu :model="items" />
  <router-view />
</template>

<script>
import TabMenu from 'primevue/TabMenu'
export default {
  name: 'Admin',
  components: {
    TabMenu: TabMenu
  },
  data() {
    return {
      items: [
        {label: 'Список сотрудников', icon: 'pi pi-fw pi-home', to: '/admin/worker-list'},
        {label: 'Список сеансов', icon: 'pi pi-fw pi-calendar', to: '/admin/pizdec'},
      ]
    }
  }
}
</script>

<style scoped>

</style>
