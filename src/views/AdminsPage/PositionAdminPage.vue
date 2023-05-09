<template>

  <button class="uk-button uk-button-default uk-margin-small-right" type="button"
          uk-toggle="target: #modal-create-position">Создать должность
  </button>

  <!-- Модальное окно создания должности -->
  <div id="modal-create-position" ref="position-create" uk-modal bg-close="false">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Создание должности</h2>

      <div class="flex flex-column gap-2">
        <label for="positionName">Название должности</label>
        <InputText id="positionName" v-model="creatingPosition.positionName"/>
        <small id="username-help">Введите название должности</small>
      </div>

      <div class="flex flex-column gap-2">
        <label for="gender">Тип должности</label>
        <Dropdown v-model="creatingPosition.positionType"
                  :options="positionTypes"
                  optionLabel="displayName"
                  optionValue="name"
                  :appendTo="'#modal-create-position'"
                  inputId="positionTypes"
                  showClear>
        </Dropdown>
      </div>


      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="savePosition">Сохранить</button>
      </p>
    </div>
  </div>

  <DataTable :value="positions">
    <Column field="id" header="id"></Column>
    <Column field="positionName" header="Название должности"></Column>
    <Column field="positionTypeName" header="Тип должности"></Column>
    <Column header="Действия">
      <template #body="{data}">
        <button class="uk-button uk-button-primary"
                @click="loadEditPosition(data.id, data.positionName, data.positionType)"
                uk-toggle="target: #modal-edit-positiont">Редактировать
        </button>
        <button class="uk-button uk-button-danger" @click="deletePosition(data.id)" style="margin-left: 10px;">Удалить
        </button>
      </template>
    </Column>
  </DataTable>


  <!-- Модальное окно редактирования должности -->
  <div id="modal-edit-positiont" uk-modal ref="modal-edit" bg-close="false">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Редактирование должности</h2>

      <div class="flex flex-column gap-2">
        <label for="username">id должности</label>
        <InputText disabled id="username" v-model="editablePositions.id"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="username">Название должности</label>
        <InputText id="username" v-model="editablePositions.positionName"/>
      </div>

      <div class="flex flex-column gap-2">
        <label for="gender">Тип должности</label>
        <Dropdown v-model="editablePositions.positionType"
                  :options="positionTypes"
                  optionLabel="displayName"
                  optionValue="name"
                  :appendTo="'#modal-edit-positiont'"
                  inputId="positionTypes"
                  showClear>
        </Dropdown>
      </div>

      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="editPosition">Сохранить</button>
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
import Dropdown from 'primevue/dropdown';

export default {
  name: "PositionAdminPage",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
    UIkit,
    Dropdown,
  },
  data() {
    return {
      positions: [],

      creatingPosition: {
        positionName: null,
        positionType: null
      },

      editablePositions: {
        id: null,
        positionName: null,
        positionType: null
      },
      positionTypes: null,
    }
  },

  methods: {
    savePosition() {
      axios.post('admin/position', this.creatingPosition).then(() => {
        const toast = useToast();

        this.getPositionList();

        UIkit.modal('#modal-create-position').hide();
        toast.success('Должность создана');

        //console.log(response);
      })
    },

    editPosition() {
      axios.put('admin/position/' + this.editablePositions.id, this.editablePositions)
          .then( () => {
            const toast = useToast();
            this.getPositionList();

            UIkit.modal('#modal-edit-positiont').hide();
            toast.success('Позиция обновлена');
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error('ошибка');
            console.log(error);
          })
    },

    loadEditPosition(id, positionName, positionType) {
      this.editablePositions.id = id;
      this.editablePositions.positionName = positionName;
      this.editablePositions.positionType = positionType;
    },

    getPositionList: function () {
      let config = {
        method: 'get',
        url: 'positions',
      };

      this.axios(config)
          .then((response) => {
            this.positions = response.data.items;
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    deletePosition: function (id) {
      console.log(id);
    },

    getPositionTypes: function (){
      let config = {
        method: 'get',
        url: 'admin/position/types',
      };

      this.axios(config)
          .then((response) => {
            this.positionTypes = response.data.items;
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {
    this.getPositionList();
    this.getPositionTypes();
  }
}
</script>

<style scoped>

</style>
