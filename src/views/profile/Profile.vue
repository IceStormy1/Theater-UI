<template>
  <div class="uk-text-center" uk-grid>
    <div class="uk-width-auto@m">

      <div class="uk-card uk-card-default uk-card-body">

        <div class="avatar-upload">
          <div class="avatar-selector" v-if="!imageSrc && isCurrentUserOpened()">
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
              <button class=" uk-flex-right" type="button" aria-label="Close" uk-close @click="deleteImage"></button>
            </div>
          </div>
        </div>
        <button v-if="file" class="uk-button uk-button-primary" @click.prevent="submitForm">
          Сохранить
        </button>

      </div>
    </div>
    <div class="uk-width-1-3@m">

      <Card>
        <template #title v-if="isCurrentUserOpened()">
         Ваш профиль
          <a uk-toggle="target: #modal-edit-users" style="color: #708090">
            <span class="pi pi-user-edit" style="font-size: 1.5rem"></span>
          </a>
        </template>
        <template #title v-else>
          Профиль {{currentUser.userName}}
        </template>
        <template #content>

          <dl class="uk-description-list uk-description-list-divider">
            <dt>Email</dt>
            <dd> {{ currentUser.email }}</dd>
            <dt>Никнейм</dt>
            <dd> {{ currentUser.userName }}</dd>
            <dt>Имя</dt>
            <dd>{{ currentUser.firstName }}</dd>
            <dt>Фамилия</dt>
            <dd> {{ currentUser.lastName }}</dd>
            <dt>Отчество</dt>
            <dd> {{ currentUser.middleName }}</dd>
            <dt>Дата рождения</dt>
            <dd> {{dateHelper.formatDate(currentUser.birthDate, 'DD.MM.YYYY')}}</dd>
            <dt>Пол</dt>
            <dd> {{ currentUser.gender }}</dd>
            <dt>Телефон</dt>
            <dd> {{ currentUser.phone }}</dd>
          </dl>
        </template>
      </Card>
    </div>

    <!-- Модальное окно редактирования пользователя -->
    <div id="modal-edit-users" uk-modal ref="modal-edit" bg-close="false">
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Редактирование профиля</h2>

        <div class="flex flex-column gap-2">
          <label for="username">Логин</label>
          <InputText id="username" v-model="currentUser.userName"/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="username">Email</label>
          <InputText id="username" v-model="currentUser.email"/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="username">Имя</label>
          <InputText id="username" v-model="currentUser.firstName"/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="username">Фамилия</label>
          <InputText id="username" v-model="currentUser.lastName"/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="username">Отчество</label>
          <InputText id="username" v-model="currentUser.middleName"/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="birth_date">Дата рождения</label>
          <Calendar v-model="currentUser.birthDate"
                    :minDate="minDate"
                    :appendTo="'#modal-edit-users'"
                    :maxDate="maxDate"
                    :manualInput="false"
                    inputId="birth_date"
                    showClear/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="username">Номер телефона</label>
          <InputText id="username" v-model="currentUser.phone"/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="gender">Пол</label>
          <Dropdown v-model="currentUser.gender"
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

    <DataTable v-if="isCurrentUserOpened()" :value="userTickets.items">
      <Column field="pieceName" header="Название спектакля"></Column>
      <Column field="pieceDate" header="Дата">
        <template #body="slotProps">
          {{ dateHelper.formatDate(slotProps.data.pieceDate, 'DD.MM.YYYY') }}
        </template>
      </Column>
      <Column field="dateOfPurchase" header="Дата покупки">
        <template #body="slotProps">
          {{ dateHelper.formatDate(slotProps.data.dateOfPurchase, 'DD.MM.YYYY') }}
        </template>
      </Column>
      <Column field="ticketRow" header="Ряд">123</Column>
      <Column field="ticketPlace" header="Место"></Column>
      <Column field="ticketPrice" header="Стоимость билета">
        <template #body="slotProps">
          {{ slotProps.data.ticketPrice }} руб
        </template>
      </Column>
      <Paginator :rows="ticketFilter.limit" :totalRecords="userTickets.total" :rowsPerPageOptions="[5, 10, 20, 30]"
                 @page="onPage($event)">
        <template #start="slotProps">
          Всего {{ userTickets.total }} записей
        </template>
        <template #end>

        </template>
      </Paginator>
    </DataTable>

  </div>

  <div class="uk-grid-collapse uk-flex uk-flex-center" uk-grid style="margin: 40px">
    <h2>Рецензии пользователя</h2>
  </div>

  <div class="uk-grid-collapse uk-child-width-expand@s uk-flex uk-flex-center" uk-grid>
    <v-card
        v-for="review in userReviews.items"
        class="mx-6"
        max-width="400"
    >

      <v-card-item>
        <h3>{{review.title}}</h3>

        <v-card-subtitle>
          <a @click="redirectToPiece(review.pieceId)" style="color: #708090">
            <span class="me-6" href="/piece">{{review.pieceName}}</span>
          </a>
        </v-card-subtitle>

      </v-card-item>

      <v-card-text>
        <v-row
            align="center"
            class="mx-0"
        >
          <v-rating
              :model-value="4.5"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
          ></v-rating>
        </v-row>

        <div v-html="textHelper.replaceBr(review.description)"></div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>
    </v-card>

  </div>

</template>

<script>

import Card from 'primevue/card';
import Button from 'primevue/button';
import 'primeicons/primeicons.css';
import {useToast} from "vue-toastification";
import {ref} from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import Gender from '../../models/gender'
import DateHelper from '../../services/helpers/dateHelper'
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/Calendar';
import Paginator from 'primevue/paginator';
import UserTicketsFilter from '../../models/filters/userTicketsFilter';
import axios from "axios";
import UIkit from 'uikit';
import UserReview from "../../models/userReview";
import UserReviewFilter from "../../models/filters/userReviewFilter";
import TextHelper from "../../services/helpers/textHelper";

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
  name: "Profile",
  components: {
    InputText,
    Card,
    Button,
    DataTable,
    Column,
    ColumnGroup,
    Row,
    UIkit,
    Dropdown,
    Calendar,
    Paginator,
  },

  data() {
    return {
      imageSrc: null,
      file: null,
      ticketFilter: new UserTicketsFilter(),
      userReviewFilter: new UserReviewFilter(),
      dateHelper: DateHelper,
      currentUser: {
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
        photo: null
      },
      userTickets:{
        total: 0,
        items: [
          {
            id: null,
            pieceId: null,
            pieceName: null,
            pieceDateId: null,
            pieceDate: null,
            dateOfPurchase: null,
            userId: null,
            ticketPriceEventsId: null,
            ticketPriceEventsVersion: 1
          }
        ]
      },
      userReviews: {
        total: 0,
        items: [
            new UserReview()
        ]
      },
      minDate: minDate,
      maxDate: maxDate,
      textHelper: TextHelper,
      genders: Gender.genders,
      userIdFromRoute: this.$route.params.id,
    }
  },
  methods: {

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
      }
    },

    deleteImage() {
      const toast = useToast();
      axios.delete('/filestorage/' + this.currentUser.photo.id)
          .then((respone) => {
            this.currentUser.photo = null;

            axios.put('admin/user/' + this.currentUser.id, this.currentUser).then(() => {
              const toast = useToast();
              toast.success('Фотография удалена')

              this.imageSrc = null;
              this.file = null;

            }).catch(function (error) {
              const toast = useToast();

              toast.error('ошибка');
            })
          })
          .catch(function (error) {
            toast.error('Произошла ошибка при удалении фотографии: ' + error.title);
          })
    },

    submitForm() {
      let bodyFormData = new FormData();
      bodyFormData.append('file', this.file);


      axios.post('/filestorage?bucketId=1', bodyFormData).then((response) => {
        this.currentUser.photo = response.data
        axios.put('admin/user/' + this.currentUser.id, this.currentUser).then(() => {
          const toast = useToast();
          toast.success('Пользователь обновлен');

        }).catch(function (error) {
          const toast = useToast();

          toast.error('ошибка');
        })

      }).catch(function () {
        const toast = useToast();

        toast.error('ошибка при загрузке фото');
      });
    },

    loadUser() {
      let config = {
        method: 'get',
        url: 'account/' + (this.userIdFromRoute == null ? 'me' : 'user/' + this.userIdFromRoute)
      };

      this.axios(config)
          .then((response) => {
            this.currentUser = response.data;
            this.imageSrc = this.currentUser.photo?.directUrl;

            this.loadUserTickets();
            this.loadUserReviews();
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    editUser() {
      axios.put('account/' + this.currentUser.id + '/update', this.currentUser)
          .then((response) => {
            const toast = useToast();
            this.loadUser()

            UIkit.modal('#modal-edit-users').hide();
            toast.success('Профиль обновлен');
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error('ошибка');
            console.log(error);
          })
    },

    isCurrentUserOpened(){
      return this.userIdFromRoute == null;
    },

    loadUserTickets(){
      // Если открываем другого пользователя, то не подгружаем его купленные билеты
      if(!this.isCurrentUserOpened())
        return;

      this.ticketFilter.userId = this.currentUser.id;

      let config = {
        method: 'get',
        url: 'account/user/tickets',
        params: this.ticketFilter
      };

      this.axios(config)
          .then((response) => {
            this.userTickets = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    loadUserReviews(){
      this.userReviewFilter.userId = this.currentUser.id;

      let config = {
        method: 'get',
        url: 'user/review/list',
        params: this.userReviewFilter
      };

      this.axios(config)
          .then((response) => {
            this.userReviews = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    onPage(event) {
      this.userTickets.limit = event.rows;
      this.userTickets.offset = event.first;

      this.loadUserTickets()
    },

    redirectToPiece(pieceId){
      this.$router.push('/spectacle/' + pieceId);
    },

  },
  mounted() {
    this.loadUser();
  }
}
</script>

<style>
.avatar-upload {
  width: 150px;
  height: 150px;
  position: relative;
}

.avatar-selector {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px dashed #ccc;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-selector label {
  display: block;
}

.avatar-preview {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-preview-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
