<template>
  <v-carousel
      height="400"
      width="300"
      hide-delimiters
      progress="primary"
      cover
      cycle
  >
    <v-carousel-item
        v-for="(slide, i) in pieceFull.additionalPhotos"
        :key="i"
        :src="slide.directUrl"
    >
    </v-carousel-item>
  </v-carousel>

  <v-container style="margin-top: 40px">
    <v-row>

      <v-col cols="3">
        <v-img :src="pieceFull.mainPicture.directUrl" alt="Spectacle photo"/>
      </v-col>

      <v-col cols="7">
        <h1>{{ pieceFull.pieceName }}</h1>
        <p v-html="textHelper.replaceBr(pieceFull.description)"></p>
        <h2>Состав:</h2>
        <ul>
          <li v-for="member in pieceFull.workerShortInformation" href="">
            <a @click="redirectToWorker(member.id)" style="color: #708090">{{ member.fullName }} -
              {{ member.positionName }}</a>
          </li>
        </ul>
      </v-col>

      <v-col cols="2">
        <h2>Даты</h2>
        <v-list>
          <v-list-item v-for="date in pieceFull.pieceDates"
                       :key="date">
            {{ dateHelper.formatDate(date.date, 'DD.MM.YYYY') }}
            <a uk-toggle="target: #modal-buy-ticket" @click="loadTickets(date.pieceId, date.id, date)"
               style="color: #708090">
              <span class="pi pi-shopping-cart" style="font-size: 1.5rem"></span>
            </a>
          </v-list-item>
        </v-list>
      </v-col>

    </v-row>

    <v-row style="margin-top: 40px">
      <v-col cols="1"></v-col>
      <v-col cols="3">
        <h2>Рецензии пользователей:</h2>

          <div class="uk-grid-collapse uk-child-width-expand@s uk-flex uk-flex-center" uk-grid>
            <v-card
                v-for="review in userReviews.items"
                class="mx-6"
                max-width="400"
            >

              <v-card-item>
                <h3>{{review.title}}</h3>

                <v-card-subtitle>
                  <a @click="redirectToUser(review.userId)" style="color: #708090">
                    <span class="me-6" href="/piece">{{review.userName}}</span>
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
      </v-col>
    </v-row>

  </v-container>

  <!-- Модальное окно покупки билета -->
  <div id="modal-buy-ticket" uk-modal ref="modal-edit" bg-close="false">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Купить билеты</h2>


      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
        <button class="uk-button uk-button-primary" type="button" @click="editUser">Сохранить</button>
      </p>
    </div>
  </div>

</template>

<script>
import PieceFull from "../../models/PieceFull";
import {useToast} from "vue-toastification";
import DateHelper from '../../services/helpers/dateHelper'
import 'primeicons/primeicons.css';
import UserReview from "../../models/userReview";
import UserReviewFilter from "../../models/filters/userReviewFilter";
import TextHelper from "../../services/helpers/textHelper";

export default {
  name: "Spectacle",

  data() {
    return {
      pieceFull: new PieceFull(),
      pieceIdFromRoute: this.$route.params.id,
      userReviewFilter: new UserReviewFilter(),
      tickets: [
        {
          id: null,
          isBooked: false,
          ticketPrice: null,
          ticketPlace: null,
          ticketRow: null,
        }
      ],
      userReviews: {
        total: 0,
        items: [
          new UserReview()
        ]
      },
      dateHelper: DateHelper,
      textHelper: TextHelper,
    }
  },
  methods: {

    loadPiece() {
      let config = {
        method: 'get',
        url: 'piece/' + this.pieceIdFromRoute,
      };

      this.axios(config)
          .then((response) => {
            this.pieceFull = response.data;

            this.loadUserReviews();
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error(error.response.data.title);
          });
    },

    loadTickets(pieceId, dateId, date) {
      let config = {
        method: 'get',
        url: 'ticket/' + pieceId + '/date/' + dateId,
      };

      this.axios(config)
          .then((response) => {
            this.tickets = response.data.items;
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error(error.response.data.title);
          });
    },

    redirectToWorker(workerId) {
      this.$router.push('/worker/' + workerId);
    },

    redirectToUser(userId) {
      this.$router.push('/profile/' + userId);
    },

    loadUserReviews(){
      this.userReviewFilter.pieceId = this.pieceIdFromRoute;

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
  },
  mounted() {
    this.loadPiece();
  }
}
</script>

<style scoped>

</style>
