<template>

  <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-example">
    Создать сотрудника
  </button>

  <!-- Модальное окно создания сотрудника -->
  <div id="modal-example" ref="modal-save" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Создание сотрудника</h2>

      <div class="flex flex-column gap-2">
        <label for="username">first Name</label>
        <InputText id="username" v-model="firstName"/>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Second name </label>
        <InputText id="username" v-model="lastname"/>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Middle name </label>
        <InputText id="username" v-model="middleName"/>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">gender</label>
        <InputText id="username" v-model="gender"/>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <!--      <div class="flex flex-column gap-2">-->
      <!--        <label for="username">birthdate</label>-->
      <!--        <InputText id="username" v-model="value" aria-describedby="username-help" />-->
      <!--        <small id="username-help">Enter your username to reset your password.</small>-->
      <!--      </div>-->

      <div class="flex flex-column gap-2">
        <label for="username">description</label>
        <InputText id="username" v-model="description" aria-describedby="username-help"/>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">positionId</label>
        <InputText id="username" v-model="positionId" aria-describedby="username-help"/>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">position type</label>
        <InputText id="username" v-model="positionType" aria-describedby="username-help"/>
        <small id="username-help">Enter your username to reset your password.</small>
      </div>

      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="saveWorker">Сохранить</button>
      </p>
    </div>
  </div>

  <DataTable :value="workers">
    <Column field="id" header="id"></Column>
    <Column field="fullName" header="Имя"></Column>
    <Column field="positionName" header="Должность"></Column>
    <Column field="positionTypeName" header="Quantity"></Column>
    <Column header="Actions">
      <template #body="{data}">
        <button class="uk-button uk-button-primary" @click="loadEditWorker(data.id)"
                uk-toggle="target: #modal-edit-worker">Редактировать
        </button>
        <button class="uk-button uk-button-danger" @click="deleteWorker(data.id)" style="margin-left: 10px;">Удалить
        </button>
      </template>
    </Column>
  </DataTable>


  <!-- Модальное окно редактирования сотрудника -->
  <div id="modal-edit-worker" uk-modal ref="modal-edit-worker">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Редактирование сотрудника</h2>

      <div class="flex flex-column gap-2">
        <label for="username">Идентификатор пользователя</label>
        <InputText disabled id="username" v-model="editableWorker.id"/>
        <small id="username-help">Идентификатор пользователя нельзя редактировать</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Имя пользователя</label>
        <InputText id="username" v-model="editableWorker.firstName"/>
        <small id="username-help">Можете изменить имя пользователя, не трогайте поле если не хотите менять</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Фамилия сотрудника</label>
        <InputText id="username" v-model="editableWorker.lastName"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Отчество</label>
        <InputText id="username" v-model="editableWorker.middleName"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Гендер</label>
        <InputText id="username" v-model="editableWorker.gender"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Описание</label>
        <InputText id="username" v-model="editableWorker.description"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Должность</label>
        <InputText id="username" v-model="editableWorker.positionId"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Тип должности</label>
        <InputText id="username" v-model="editableWorker.positionType"/>
      </div>

      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="editWorker">Сохранить</button>
      </p>
    </div>
  </div>

</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import {useToast} from "vue-toastification";
import axios from "axios";
import UIkit from 'uikit';

export default {
  name: "WorkerList",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
    UIkit,
  },
  data() {
    return {
      workers: [],
      firstName: null,
      lastname: null,
      middleName: null,
      gender: null,
      birthdate: '2001-04-29T09:10:44.929Z',
      description: null,
      positionId: null,
      positionType: null,

      editableWorker: {
        id: null,
        firstName: null,
        lastName: null,
        middleName: null,
        gender: null,
        birthDate: null,
        description: null,
        positionId: null,
        positionType: null
      }
    }
  },
  methods: {
    saveWorker() {
      axios.post('admin/theaterworker', {
        firstName: this.$data.firstName,
        lastName: this.$data.lastname,
        middleName: this.$data.middleName,
        gender: this.$data.gender,
        birthdate: this.$data.birthdate,
        description: this.$data.description,
        positionId: this.$data.positionId,
        positionType: this.$data.positionType,
      })
          .then((response) => {
            const toast = useToast();
            this.getWorkerList();

            UIkit.modal('#modal-example').hide();
            toast.success('Пользователь создан');
            console.log(response);
          })
    },

    editWorker() {
      axios.put('admin/theaterworker/' + this.editableWorker.id, this.editableWorker)
          .then((response) => {
            const toast = useToast();
            this.getWorkerList();

            UIkit.modal('#modal-edit-worker').hide();
            toast.success('Пользователь обновлен');

            console.log(response);
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error('ошибка');
            console.log(error);
          })
    },

    loadEditWorker(id) {
      axios.get('worker/' + id).then((response) => {
        this.editableWorker = response.data;
      })
    },

    getWorkerList: function () {
      var config = {
        method: 'get',
        url: 'workers',
      };

      this.axios(config)
          .then((response) => {
            this.workers = response.data.items;
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    deleteWorker: function (id) {
      console.log(id);
    }
  },
  mounted() {
    this.getWorkerList()
  }
}
</script>

<style scoped>

</style>
