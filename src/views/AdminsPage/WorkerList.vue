<template>

  <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-example">
    Создать сотрудника
  </button>

  <!-- Модальное окно создания сотрудника -->
  <div id="modal-example" ref="modal-save" uk-modal bg-close="false">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Создание сотрудника</h2>

      <div class="flex flex-column gap-2">
        <label for="username">Имя</label>
        <InputText id="username" v-model="firstName"/>
        <small id="username-help">Имя</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Фамилия</label>
        <InputText id="username" v-model="lastname"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Отчество</label>
        <InputText id="username" v-model="middleName"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="birth_date">Дата рождения</label>
        <Calendar v-model="birthdate"
                  :minDate="minDate"
                  :appendTo="'#modal-example'"
                  :maxDate="maxDate"
                  :manualInput="false"
                  inputId="birth_date"
                  showClear/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="gender">Пол</label>
        <Dropdown v-model="gender"
                  :options="genders"
                  optionLabel="name"
                  optionValue="code"
                  :appendTo="'#modal-example'"
                  inputId="gender"
                  showClear>
        </Dropdown>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Описание</label>
        <InputText id="username" v-model="description" aria-describedby="username-help"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="workerPosition">Должность работника</label>
        <Dropdown v-model="positionId"
                  :options="workerPositions"
                  optionLabel="positionName"
                  optionValue="id"
                  :appendTo="'#modal-example'"
                  inputId="workerPosition"
                  showClear>

        </Dropdown>
      </div>

      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="saveWorker">Сохранить</button>
      </p>

    </div>
  </div>

  <DataTable :value="workers.items">
    <Column field="id" header="id"></Column>
    <Column field="fullName" header="ФИО"></Column>
    <Column field="positionName" header="Должность"></Column>
    <Column field="positionTypeName" header="Тип должности"></Column>
    <Column header="Actions">
      <template #body="{data}">
        <button class="uk-button uk-button-primary"
                @click="loadEditWorker(data.id)"
                uk-toggle="target: #modal-edit-worker">Редактировать
        </button>
        <button class="uk-button uk-button-danger" @click="deleteWorker(data.id)" style="margin-left: 10px;">Удалить
        </button>
      </template>
    </Column>
  </DataTable>

  <Paginator :rows="userFilter.limit" :totalRecords="workers.total" :rowsPerPageOptions="[5, 10, 20, 30]"
             @page="onPage($event)">
    <template #start="slotProps">
      Всего {{ workers.total }} записей
    </template>
    <template #end>

    </template>
  </Paginator>


  <!-- Модальное окно редактирования сотрудника -->
  <div id="modal-edit-worker" uk-modal ref="modal-edit-worker" bg-close="false">
    <!--bg-close = false иначе при выборе значения в дроп-дауна закрывается модалка-->
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Редактирование сотрудника</h2>
      <v-container>
        <v-row>
          <v-col cols="4"></v-col>
          <v-col cols="7">
      <div class="avatar-upload">


        <div class="avatar-selector" v-if="!imageSrc">
          <label>
            <input type="file" @change="onFileChange" style="display:none" accept="image/*">
            <div>
              <span uk-icon="icon: cloud-upload"></span>
              <span class="uk-text-middle">Загрузить</span>
            </div>
          </label>
        </div>
        <div class="avatar-preview" v-else>
          <div class="avatar-preview-img" :style="{ 'background-image': 'url(' + imageSrc + ')' }">
            <button class="uk-modal-close-default" type="button" aria-label="Close" uk-close @click="deleteImage"></button>
          </div>
        </div>


      </div>
          </v-col>
        </v-row>

      </v-container>

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
        <label for="birth_date">Дата рождения</label>
        <Calendar v-model="editableWorker.birthDate"
                  :minDate="minDate"
                  :appendTo="'#modal-edit-worker'"
                  :maxDate="maxDate"
                  :manualInput="false"
                  inputId="birth_date"
                  showClear/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="gender">Пол</label>
        <Dropdown v-model="editableWorker.gender"
                  :options="genders"
                  optionLabel="name"
                  optionValue="code"
                  :appendTo="'#modal-edit-worker'"
                  inputId="gender"
                  showClear>
        </Dropdown>

      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Описание</label>
        <InputText id="username" v-model="editableWorker.description"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="workerPosition">Должность работника</label>
        <Dropdown v-model="editableWorker.positionId"
                  :options="workerPositions"
                  optionLabel="positionName"
                  optionValue="id"
                  :appendTo="'#modal-edit-worker'"
                  inputId="workerPosition"
                  showClear>
        </Dropdown>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Тип должности</label>
        <InputText id="username" disabled v-model="editableWorker.positionTypeName"/>
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
import Button from 'primevue/button';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import Gender from '../../models/gender'
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/Calendar';
import Paginator from 'primevue/paginator';
import UserFilter from '../../models/filters/userFilter';
import {useToast} from "vue-toastification";
import 'primeicons/primeicons.css';
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
  name: "WorkerList",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
    Dropdown,
    Calendar,
    Paginator,
    Button,
    UIkit,
  },
  data() {
    return {
      workers: [],
      firstName: null,
      lastname: null,
      middleName: null,
      gender: null,
      birthdate: null,
      description: null,
      positionId: null,
      positionType: null,
      genders: Gender.genders,
      workerPositions: null,
      userFilter: new UserFilter(),
      imageSrc: null,
      file: null,
      minDate: minDate,
      maxDate: maxDate,

      editableWorker: {
        id: null,
        firstName: null,
        lastName: null,
        middleName: null,
        gender: null,
        birthDate: null,
        description: null,
        positionId: null,
        positionType: null,
        positionTypeName: null,
        mainPhoto: null,
      }
    }
  },
  methods: {
    saveWorker() {
      // todo ну и бредятина это я походу пьяным писал , над переделать , просто класть массив
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
          })
    },

    editWorker() {
      axios.put('admin/theaterworker/' + this.editableWorker.id, this.editableWorker)
          .then((response) => {
            const toast = useToast();
            this.getWorkerList();

            UIkit.modal('#modal-edit-worker').hide();
            toast.success('Пользователь обновлен');
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
        this.imageSrc = response.data.mainPhoto?.directUrl;
      })
    },

    getWorkerList: function () {
      const config = {
        method: 'get',
        url: 'workers',
        params: {
          limit: this.userFilter.limit,
          offset: this.userFilter.offset,
          sortColumn: 'id'
        },
      };

      this.axios(config)
          .then((response) => {
            this.workers = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    deleteWorker: function (id) {
      console.log(id);
    },
    getWorkerPositions: function () {
      const config = {
        method: 'get',
        url: 'positions',
      };

      this.axios(config)
          .then((response) => {
            this.workerPositions = response.data.items;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    onPage(event) {
      this.userFilter.limit = event.rows;
      this.userFilter.offset = event.first;

      this.getWorkerList()
    },
    onFileChange(event) {
      const files = event.target.files
      if (files && files.length > 0) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageSrc = e.target.result
        }
        reader.readAsDataURL(file)

        this.file = file;

        let bodyFormData = new FormData();
        bodyFormData.append('file', this.file);

        axios.post('/filestorage?bucketId=2', bodyFormData)
            .then((response) => {
              this.editableWorker.mainPhoto = response.data
            })
            .catch(function () {
              const toast = useToast();

              toast.error('Ошибка при загрузке фото');
            });
      }
    },
    deleteImage() {
      const toast = useToast();
      axios.delete('/filestorage/' + this.editableWorker.mainPhoto.id)
          .then((respone) => {
            this.editableWorker.mainPhoto = null;
            this.imageSrc = null;

            this.editWorker();
          })
          .catch(function (error) {
            toast.error('Произошла ошибка при удалении фотографии: ' + error.title);
          })
    },
  },
  mounted() {
    this.getWorkerList();
    this.getWorkerPositions();
  }
}
</script>

<style scoped>

</style>
