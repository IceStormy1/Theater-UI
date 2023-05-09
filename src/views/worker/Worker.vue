<template>
  <v-container style="margin-top: 40px">
    <v-row>

      <v-col cols="3">
        <v-img :src="theaterWorkerFull.mainPhoto?.directUrl" alt="Spectacle photo"/>
      </v-col>

      <v-col cols="1">

      </v-col>

      <v-col cols="7">
        <h1>{{ theaterWorkerFull.fullName }}</h1>
        <p v-html="textHelper.replaceBr(theaterWorkerFull.description)"></p>
        <h2>Спектакли, где участвовал актер:</h2>
        <ul>
          <li v-for="member in theaterWorkerFull.pieces">
            <a @click="redirectToPiece(member.id)" style="color: #708090">{{ member.pieceName }} </a>
          </li>
        </ul>
      </v-col>

    </v-row>

  </v-container>

</template>

<script>
import TheaterWorkerFull from "../../models/theaterWorkerFull";
import {useToast} from "vue-toastification";
import DateHelper from "../../services/helpers/dateHelper";
import TextHelper from "../../services/helpers/textHelper";

export default {
  name: "Worker",

  data(){
    return {
      theaterWorkerFull: new TheaterWorkerFull(),
      workerIdFromRoute: this.$route.params.id,
      dateHelper: DateHelper,
      textHelper: TextHelper,
    }
  },

  methods:{
    loadTheaterWorker(){
      let config = {
        method: 'get',
        url: 'worker/' + this.workerIdFromRoute,
      };

      this.axios(config)
          .then((response) => {
            this.theaterWorkerFull = response.data;

            this.loadUserReviews();
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error(error.response.data.title);
          });
    },

    redirectToPiece(pieceId){
      this.$router.push('/spectacle/' + pieceId);
    }
  },

  mounted() {
    this.loadTheaterWorker();
  }
}
</script>

<style scoped>

</style>