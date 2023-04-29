<template>

  <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-example">Открыть</button>

  <!-- Модальное окно -->
  <div id="modal-example" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Создание сотрудника</h2>

      <div class="flex flex-column gap-2">
        <label for="username">first Name</label>
        <InputText id="username" v-model="firstName" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Second name </label>
        <InputText id="username" v-model="lastname" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Middle name </label>
        <InputText id="username" v-model="middleName" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">gender</label>
        <InputText id="username" v-model="gender" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

<!--      <div class="flex flex-column gap-2">-->
<!--        <label for="username">birthdate</label>-->
<!--        <InputText id="username" v-model="value" aria-describedby="username-help" />-->
<!--        <small id="username-help">Enter your username to reset your password.</small>-->
<!--      </div>-->

      <div class="flex flex-column gap-2">
        <label for="username">description</label>
        <InputText id="username" v-model="description" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">positionId</label>
        <InputText id="username" v-model="positionId" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">position type</label>
        <InputText id="username" v-model="positionType" aria-describedby="username-help" />
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

<!--      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>-->
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="sendMessage">Сохранить</button>
      </p>
    </div>
  </div>

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
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import {useToast} from "vue-toastification";
import axios from "axios";

export default {
  name: "WorkerList",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText
  },
  data() {
    return {
      workers : [],
      firstName : null,
      lastname : null,
      middleName: null,
      gender : null,
      birthdate : '2001-04-29T09:10:44.929Z',
      description : null,
      positionId : null,
      positionType : null,
    }
  },
  methods: {
    sendMessage() {
      // const formData = new FormData();
      //
      // formData.append('firstName', this.$data.firstName)
      // formData.append('lastname', this.$data.lastname)
      // formData.append('middleName', this.$data.middleName)
      // formData.append('gender', this.$data.gender)
      // formData.append('birthdate', this.$data.birthdate)
      // formData.append('description', this.$data.description)
      // formData.append('positionId', this.$data.positionId)
      // formData.append('positionType', this.$data.positionType)

      axios.post('http://localhost:5010/api/admin/theaterworker', {
        firstName: this.$data.firstName,
        lastName: this.$data.lastname,
        middleName: this.$data.middleName,
        gender: this.$data.gender,
        birthdate: this.$data.birthdate,
        description: this.$data.description,
        positionId: this.$data.positionId,
        positionType: this.$data.positionType,
      }).then(function (response) {
        const toast = useToast();

        toast.success('Пользователь создан');
        console.log(response);
      })
    },
    getWorkerList() {
      var config = {
        method: 'get',
        url: 'http://localhost:5010/api/workers',
      };

      this.axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
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
