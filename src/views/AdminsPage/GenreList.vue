<template>

  <button class="uk-button uk-button-default uk-margin-small-right" type="button"
          uk-toggle="target: #modal-create-genre">Создать жанр
  </button>

  <!-- Модальное окно создания должности -->
  <div id="modal-create-genre" ref="genre-create" uk-modal bg-close="false">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Создание жанра</h2>

      <div class="flex flex-column gap-2">
        <label for="positionName">Название жанра</label>
        <InputText id="positionName" v-model="creatingGenre.genreName"/>
        <small id="username-help">Введите название должности</small>
      </div>

      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="saveGenre">Сохранить</button>
      </p>
    </div>
  </div>

  <DataTable :value="genreList">
    <Column field="id" header="id"></Column>
    <Column field="genreName" header="Название жанра"></Column>
    <Column header="Действия">
      <template #body="{data}">
        <button class="uk-button uk-button-primary"
                @click="loadEditGenre(data.id, data.genreName)"
                uk-toggle="target: #modal-edit-genre">Редактировать
        </button>
        <button class="uk-button uk-button-danger" @click="deleteGenre(data.id)" style="margin-left: 10px;">Удалить
        </button>
      </template>
    </Column>
  </DataTable>


  <!-- Модальное окно редактирования жанра -->
  <div id="modal-edit-genre" uk-modal ref="modal-edit" bg-close="false">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Редактирование жанра</h2>

      <div class="flex flex-column gap-2">
        <label for="username">id жанра</label>
        <InputText disabled id="username" v-model="editableGenre.id"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Название жанра</label>
        <InputText id="username" v-model="editableGenre.genreName"/>
      </div>

      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="editGenre">Сохранить</button>
      </p>
    </div>

  </div>
</template>

<script>
import UIkit from "uikit";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/Calendar";
import Paginator from "primevue/paginator";
import axios from "axios";
import {useToast} from "vue-toastification";

export default {
  name: "GenreList",
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
  },
  data() {
    return {
      genreList: [],
      editableGenre: {
        id: null,
        genreName: null,
      },
      creatingGenre: {
        genreName : null,
      }
    }
  },
  methods: {
    deleteGenre: function (id) {
      console.log(id);
    },
    loadEditGenre: function (id, name) {
      this.editableGenre.id = id;
      this.editableGenre.genreName = name;
    },

    editGenre: function () {
      axios.put('/admin/genre/' + this.editableGenre.id, this.editableGenre)
          .then( () => {
            const toast = useToast();
            UIkit.modal('#modal-edit-genre').hide();
            toast.success('Жанр обновлена');
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error('ошибка');
            console.log(error);
          })
    },

    getGenreList: function () {
      let config = {
        method: 'get',
        url: '/genre/all',
      };

      this.axios(config)
          .then((response) => {
            this.genreList = response.data.items;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    saveGenre: function () {
      axios.post('/admin/genre', this.creatingGenre).then(() => {
        const toast = useToast();

        this.getGenreList();

        UIkit.modal('#modal-create-genre').hide();
        toast.success('Жанр создан');
      })
    },
  },
  mounted() {
    this.getGenreList();
  }
}
</script>

<style scoped>

</style>
