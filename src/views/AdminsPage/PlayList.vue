<template>

  <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #modal-play-create">
    Создать пьесу
  </button>

  <div id="modal-play-create" ref="play-create" uk-modal bg-close="false">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Создание пьесы</h2>


      <div class="uk-card uk-card-default uk-card-body" v-if="!creatingPlay.mainPhoto">
        <div class="avatar-upload">
          <div class="avatar-selector" v-if="!imageSrc">
            <label>
              <input type="file" @change="onFileChange" style="display:none" accept="image/*">
              <div>
                <span uk-icon="icon: cloud-upload"></span>
                <span class="uk-text-middle">Загрузите обложку спектакля</span>
              </div>
            </label>
          </div>
          <div class="avatar-preview">
            <div class="avatar-preview-img" :style="{ 'background-image': 'url(' + imageSrc + ')' }"></div>
          </div>
        </div>
        <button v-if="file" class="uk-button uk-button-primary" @click.prevent="submitForm">
          сохранить обложку для пьесы
        </button>
      </div>


      <div v-if="creatingPlay.mainPhoto">
        <div class="flex flex-column gap-2">
          <label for="pieceName">Название пьесы</label>
          <InputText id="pieceName" v-model="creatingPlay.pieceName"/>
          <small id="username-help">Введите название пьесы</small>
        </div>

        <div class="flex flex-column gap-2">
          <label for="pieceDescription">Описание</label>
          <InputText id="pieceDescription" v-model="creatingPlay.description"/>
        </div>

        <div class="flex flex-column gap-2">
          <label for="pieceShortDescription">Краткое описание</label>
          <InputText id="pieceShortDescription" v-model="creatingPlay.shortDescription"/>
        </div>

        <!--      todo добавить дропдаун-->
        <div class="flex flex-column gap-2">
          <label for="genreId">Жанр</label>
          <InputText id="genreId" v-model="creatingPlay.genreId"/>
        </div>

        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
          <button class="uk-button uk-button-primary" type="button" @click="savePlay">Сохранить</button>
        </p>
      </div>

    </div>
  </div>

  <DataTable :value="plays.items">
    <Column field="id" header="id"></Column>
    <Column field="pieceName" header="Название пьесы"></Column>
    <Column field="pieceGenre" header="Жанр пьесы"></Column>
    <Column field="shortDescription" header="Краткое описание"></Column>
    <Column header="Actions">
      <template #body="{data}">
        <button class="uk-button uk-button-primary"
                @click="loadEditPlay(data.id)"
                uk-toggle="target: #modal-edit-play">Редактировать
        </button>
        <button class="uk-button uk-button-danger" @click="deletePlay(data.id)" style="margin-left: 10px;">Удалить
        </button>
      </template>
    </Column>
  </DataTable>

  <!--  <Paginator :rows="userFilter.limit" :totalRecords="workers.total" :rowsPerPageOptions="[5, 10, 20, 30]"-->
  <!--             @page="onPage($event)">-->
  <!--    <template #start="slotProps">-->
  <!--      Всего {{ workers.total }} записей-->
  <!--    </template>-->
  <!--    <template #end>-->

  <!--    </template>-->
  <!--  </Paginator>-->


<!--   Модальное окно редактирования пьес-->
    <div id="modal-edit-play" uk-modal ref="modal-edit-play" bg-close="false">
      <TabView :lazy="true">

        <TabPanel header="id">
            <TextAreaPlayEdit :playId="this.editablePlay.id"/>
        </TabPanel>

        <TabPanel header="Фотографии спектакли">
        </TabPanel>

        <TabPanel header="Даты спектакли">
        </TabPanel>

        <TabPanel header="Билеты спектакли ?">
        </TabPanel>

      </TabView>
      <!--bg-close = false иначе при выборе значения в дроп-дауна закрывается модалка-->


<!--      <div class="uk-modal-dialog uk-modal-body">-->
<!--        <h2 class="uk-modal-title">Редактирование сотрудника</h2>-->

<!--        <div class="flex flex-column gap-2">-->
<!--          <label for="username">Идентификатор пользователя</label>-->
<!--          <InputText disabled id="username" v-model="editableWorker.id"/>-->
<!--          <small id="username-help">Идентификатор пользователя нельзя редактировать</small>-->
<!--        </div>-->

<!--        <div class="flex flex-column gap-2">-->
<!--          <label for="username">Имя пользователя</label>-->
<!--          <InputText id="username" v-model="editableWorker.firstName"/>-->
<!--          <small id="username-help">Можете изменить имя пользователя, не трогайте поле если не хотите менять</small>-->
<!--        </div>-->

<!--        <p class="uk-text-right">-->
<!--          <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>-->
<!--          <button class="uk-button uk-button-primary" type="button" @click="editWorker">Сохранить</button>-->
<!--        </p>-->
<!--      </div>-->
    </div>

</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/Calendar';
import Paginator from 'primevue/paginator';
import {useToast} from "vue-toastification";
import TabPanel from 'primevue/TabPanel'
import axios from "axios";
import TabView from 'primevue/TabView'
import UIkit from 'uikit';
import {ref} from "vue";
import TextAreaPlayEdit from "@/views/admin-modals/TextAreaPlayEdit.vue";

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
  name: "PlayList",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
    Dropdown,
    Calendar,
    Paginator,
    UIkit,
    TabPanel,
    TabView,
    TextAreaPlayEdit
  },
  data() {
    return {
      imageSrc: null,
      file: null,
      plays: [],

      creatingPlay: {
        pieceName: null,
        description: null,
        shortDescription: null,
        genreId: null,
        mainPhoto: null,
      },

      editablePlay: {
        id: null,
      }
    }
  },
  methods: {

    loadEditPlay(id) {
      this.editablePlay.id = id;
    },

    savePlay() {
      axios.post('admin/piece', this.creatingPlay).then(() => {
        const toast = useToast();
        toast.success('Пьеса успешно добавлена')
      })
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
      }
    },

    submitForm() {
      let bodyFormData = new FormData();
      bodyFormData.append('file', this.file);


      axios.post('/filestorage?bucketId=0', bodyFormData).then((response) => {
        this.creatingPlay.mainPhoto = response.data
      }).catch(function () {
        const toast = useToast();

        toast.error('ошибка при загрузке фото');
      });
    },

    getWorkerList: function () {
      const config = {
        method: 'get',
        url: 'piece',
      };

      this.axios(config)
          .then((response) => {
            this.plays = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    deletePlay: function (id) {
      console.log(id);
    },
  },

  mounted() {
    this.getWorkerList();
  }
}
</script>


<!--<style>-->
<!--.avatar-upload {-->
<!--  width: 150px;-->
<!--  height: 150px;-->
<!--  position: relative;-->
<!--}-->

<!--.avatar-selector {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  border-radius: 50%;-->
<!--  border: 2px dashed #ccc;-->
<!--  text-align: center;-->
<!--  cursor: pointer;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.avatar-selector label {-->
<!--  display: block;-->
<!--}-->

<!--.avatar-preview {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  border-radius: 50%;-->
<!--  overflow: hidden;-->
<!--}-->

<!--.avatar-preview-img {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-size: cover;-->
<!--  background-position: center;-->
<!--  background-repeat: no-repeat;-->
<!--}-->
<!--</style>-->
