<template>
  <DataTable :value="workers" tableStyle="min-width: 50rem">
    <Column field="id" header="Code"></Column>
    <Column field="fullName" header="Name"></Column>
    <Column field="positionName" header="Category"></Column>
    <Column field="positionTypeName" header="Quantity"></Column>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';

export default {
  name: "WorkerList",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row
  },
  data() {
    return {
      workers : []
    }
  },
  methods: {
    async getWorkerList() {
      try {
        const response = await fetch('https://3a6e-91-196-232-53.ngrok-free.app/api/workers', {
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getWorkerList()

    this.workers = [
      {
        id: '1',
        fullName: 'John Doe',
        positionName: 'Sales',
        positionTypeName: 100
      },
      {
        id: '1',
        fullName: 'John Doe',
        positionName: 'Sales',
        positionTypeName: 100
      },
    ];
  }
}
</script>

<style scoped>

</style>
