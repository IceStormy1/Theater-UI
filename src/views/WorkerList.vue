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
    getWorkerList() {
      this.axios.get('https://3a6e-91-196-232-53.ngrok-free.app/api/workers', {headers: {'Content-Type': 'application/json', 'mode': 'no-cors','Access-Control-Allow-Origin': '*', 'sec-fetch-mode': 'no-cors'}}).then((response) => {
        console.log(response.data)
      })
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
