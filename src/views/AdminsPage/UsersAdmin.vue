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
    <Column field="fullName" header="ФИО"></Column>
    <Column field="phone" header="Номер телефона"></Column>
    <Column field="gender" header="Пол"></Column>
    <Column field="birthDate" header="Дата рождения"></Column>
    <Column header="Действия">
      <template #body="{data}">
        <button class="uk-button uk-button-primary" @click="loadEditUser(data.id)"
                uk-toggle="target: #modal-edit-users">Редактировать
        </button>
        <button class="uk-button uk-button-danger" @click="deleteUser(data.id)" style="margin-left: 10px;">Удалить
        </button>
      </template>
    </Column>
  </DataTable>


  <!-- Модальное окно редактирования пользователя -->
  <div id="modal-edit-users" uk-modal ref="modal-edit" bg-close="false">
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
        <InputText id="username" v-model="editableUser.email"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Имя</label>
        <InputText id="username" v-model="editableUser.firstName"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Фамилия</label>
        <InputText id="username" v-model="editableUser.lastName"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Отчество</label>
        <InputText id="username" v-model="editableUser.middleName"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="birth_date">Дата рождения</label>
        <Calendar v-model="editableUser.birthDate"
                  :minDate="minDate"
                  :appendTo="'#modal-edit-users'"
                  :maxDate="maxDate"
                  :manualInput="false"
                  inputId="birth_date"
                  showClear/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Номер телефона</label>
        <InputText id="username" v-model="editableUser.phone"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="gender">Пол</label>
        <Dropdown v-model="editableUser.gender"
                  :options="genders"
                  optionLabel="name"
                  optionValue="code"
                  :appendTo="'#modal-edit-users'"
                  inputId="gender"
                  showClear>
        </Dropdown>
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
import Gender from '../../models/gender'
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/Calendar';
import {useToast} from "vue-toastification";
import axios from "axios";
import UIkit from 'uikit';
import {ref} from "vue";

// todo mounted
let today = new Date();
let year = today.getFullYear();

const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(1);
minDate.value.setFullYear(year - 100);
maxDate.value.setMonth(12);
maxDate.value.setFullYear(year - 14);

export default {
  name: "UsersAdmin",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
    UIkit,
    Dropdown,
    Calendar
  },
  data() {
    return {
      users: [],
      genders: Gender.genders,
      minDate: minDate,
      maxDate: maxDate,

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
        birthDate: null
      },
    }
  },

  methods: {
    editUser() {
      axios.put('admin/user/' + this.editableUser.id, this.editableUser)
          .then((response) => {
            const toast = useToast();
            this.getUserList();

            UIkit.modal('#modal-edit-users').hide();
            toast.success('Пользователь обновлен');
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error('ошибка');
            console.log(error);
          })
    },

    loadEditUser(id) {
      axios.get('account/user/' + id).then((response) => {
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
        url: 'admin/user/parameters',
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
