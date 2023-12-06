<template>

  <div class="flex flex-column gap-2">
    <label for="playEditableId">Идентификатор пьесы</label>
    <InputText disabled id="playEditableId" v-model="editablePlay.id"/>
    <small id="username-help">Идентификатор пьесы нельзя редактировать</small>
  </div>


  <div class="flex flex-column gap-2">
    <label for="playEditableName">Название пьесы</label>
    <InputText id="playEditableName" v-model="editablePlay.pieceName"/>
  </div>

  <div class="flex flex-column gap-2">
    <label for="playEditableGenre">Жанр пьесы</label>
    <InputText id="playEditableGenre" v-model="editablePlay.pieceGenre"/>
  </div>

  <div class="flex flex-column gap-2">
    <label for="playEditableShortDescription">Краткое описание пьесы</label>
    <InputText id="playEditableShortDescription" v-model="editablePlay.shortDescription"/>
  </div>


</template>

<script>
import InputText from 'primevue/inputtext';
import axios from "axios";

export default {
  name: "TextAreaPlayEdit",
  components: {
    InputText,
  },
  data() {
    return {
      id: this.playId,
      editablePlay: {
        id: String,
        pieceName: String,
        pieceGenre: String,
        shortDescription: String
      }
    }
  },
  props: ['playId'],
  watch: {
    playId: {
      handler: function() {
        this.loadTextAreas();
      },
    }
  },

  methods: {
    loadTextAreas() {
      axios.get('/piece/' + this.playId).then((response) => {
        this.editablePlay = response.data
      })
    }
  },
}
</script>

<style scoped>
</style>
