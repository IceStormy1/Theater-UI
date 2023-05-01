<template>

<!--  <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-create-position">Создать сотрудника</button>-->

<!--  &lt;!&ndash; Модальное окно создания сотрудника &ndash;&gt;-->
<!--  <div id="modal-create-position" ref="position-create" uk-modal>-->
<!--    <div class="uk-modal-dialog uk-modal-body">-->
<!--      <h2 class="uk-modal-title">Создание должности</h2>-->

<!--      <div class="flex flex-column gap-2">-->
<!--        <label for="positionName">Название позиции </label>-->
<!--        <InputText id="positionName" v-model="creatingPosition.positionName" />-->
<!--        <small id="username-help">Введите название позиции</small>-->
<!--      </div>-->

<!--      <div class="flex flex-column gap-2">-->
<!--        <label for="positionType">Название типа позиции</label>-->
<!--        <InputText id="positionType" v-model="creatingPosition.positionType" />-->
<!--        <small id="username-help">Введите название типа позиции</small>-->
<!--      </div>-->


<!--      <p class="uk-text-right">-->
<!--        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>-->
<!--        <button class="uk-button uk-button-primary" type="button" @click="savePosition">Сохранить</button>-->
<!--      </p>-->
<!--    </div>-->
<!--  </div>-->

  <DataTable :value="users">
    <Column field="id" header="id"></Column>
    <Column field="email" header="email"></Column>
    <Column field="firstName" header="Имя"></Column>
    <Column field="lastName" header="Фамилия"></Column>
    <Column field="middleName" header="Отчество"></Column>
    <Column field="phone" header="Номер телефона"></Column>
    <Column field="gender" header="Пол"></Column>
    <Column field="birthDate" header="Дата рождения"></Column>
    <Column header="Действия">
      <template #body="{data}">
        <button class="uk-button uk-button-primary" @click="loadEditUser(data.id)" uk-toggle="target: #modal-edit-users">Редактировать</button>
        <button class="uk-button uk-button-danger" @click="deleteUser(data.id)" style="margin-left: 10px;">Удалить</button>
      </template>
    </Column>
  </DataTable>


  <!-- Модальное окно редактирования сотрудника -->
  <div id="modal-edit-users" uk-modal ref="modal-edit">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Редактирование пользователя</h2>

      <div class="flex flex-column gap-2">
        <label for="username">id пользователя</label>
        <InputText disabled id="username" v-model="editableUser.id"/>
        <small id="username-help">Изменить нельзя</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Логин (username)</label>
        <InputText id="username" v-model="editableUser.userName"/>
        <small id="username-help">Можете изменить имя пользователя, не трогайте поле если не хотите менять</small>
      </div>


      <div class="flex flex-column gap-2">
        <label for="username">Email</label>
        <InputText id="username" v-model="editableUser.email" />
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Имя</label>
        <InputText id="username" v-model="editableUser.firstName" />
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Фамилия</label>
        <InputText id="username" v-model="editableUser.lastName" />
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Отчество</label>
        <InputText id="username" v-model="editableUser.middleName" />
      </div>


      <div class="flex flex-column gap-2">
        <label for="username">Номер телефона</label>
        <InputText id="username" v-model="editableUser.phone" />
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Пол</label>
        <InputText id="username" v-model="editableUser.gender" />
      </div>


      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="editUser">Сохранить</button>
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

export default {
  name: "UsersAdmin",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
  },
  data() {
    return {
      users: [],

      creatingPosition: {
        positionName: null,
        positionType: null
      },

      editableUser: {
        id: null,
        userName: null,
        password: null,
        email: null,
        firstName: null,
        lastName: null,
        middleName: null,
        phone: null,
        gender: null,
        birthDate: "2023-04-30T11:52:19.107Z",
      }
    }
  },

  methods: {
    // savePosition() {
    //   axios.post('http://localhost:5010/api/admin/position', this.creatingPosition).then(function (response) {
    //     const toast = useToast();
    //     toast.success('Должность создана');
    //     console.log(response);
    //   })
    // },

    editUser() {
      axios.put('http://localhost:5010/api/admin/user/' + this.editableUser.id, this.editableUser).then(function (response) {
        const toast = useToast();
        toast.success('Пользователь обновлен');

      }).catch(function (error) {
        const toast = useToast();

        toast.error('ошибка');
        console.log(error);
      })
    },

    loadEditUser(id) {
      axios.get('http://localhost:5010/api/account/user/' + id).then((response) => {
        console.log(response.data);
        this.editableUser = response.data;
      })
      // this.editableUser.id = id;
      // this.editableUser.positionName = positionName;
      // this.editableUser.positionType = positionType;
    },

    getUserList: function () {
      let config = {
        method: 'get',
        url: 'http://localhost:5010/api/admin/user/parameters',
      };

      this.axios(config)
          .then((response) => {
            this.users = response.data.items;
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    deleteUser: function (id) {
      console.log(id);
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style scoped>

</style>
