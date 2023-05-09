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
              <h3>{{ review.title }}</h3>

              <v-card-subtitle>
                <a @click="redirectToUser(review.userId)" style="color: #708090">
                  <span class="me-6" href="/piece">{{ review.userName }}</span>
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

      <div class="container">
        <div class="row">
          <div class="col-8 py-5">
            <div>
              <table class="mx-auto">
                <tbody>
                <tr v-for="idxr in tickets.rows">
                  <td v-for="idxc in tickets.cols" class="pl-2" style="width: 50px;">
                    <div @click="onSeatSelected(idxr, idxc)"
                         v-if="!isAisle(idxr, idxc) && getSeat(idxr, idxc)?.isBooked" disabled="true" :class="'cls-rb'"
                         style="width: 30px; height: 30px; border: 1px solid black;"></div>
                    <div @click="onSeatSelected(idxr, idxc)" v-else-if="!isAisle(idxr, idxc)"
                         :class="classifier(idxr, idxc)"
                         style="width: 30px; height: 30px; border: 1px solid black;"></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12 ">
            <div>
              <div @click="changeSeatStatus('RA')" class="float-left bg-white" style="">
                <div class="cls-ra" style="width: 30px; height: 30px; border: 1px solid black;"></div>
              </div>
              <span class="px-3">Свободные места</span>
            </div>
            <div>-</div>
            <div>
              <div @click="changeSeatStatus('RB')" class="float-left" style="">
                <div class="cls-rb" style="width: 30px; height: 30px; border: 1px solid black;"></div>
              </div>
              <span class="px-3">Забронировано/Куплено</span>
            </div>
          </div>
          <p>Общая стоимость: {{ totalPrice }} рублей</p>
        </div>
      </div>

      <div class="uk-text-right">
        <v-container>
          <v-row dense>
            <v-spacer></v-spacer>
            <v-col cols="9">
              <button class="uk-button uk-button-default uk-modal-close" type="button">Закрыть</button>
            </v-col>
            <v-col cols="3">
              <Menubar class="p-mb-3" :model="items" width="10px"></Menubar>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>

</template>

<script>

// TODO: Переделать выбор билетов, т.к сейчас это выглядит просто ужасно. Переделать на мульти-селект, а не вручную прокликивать

import PieceFull from "../../models/PieceFull";
import {useToast} from "vue-toastification";
import DateHelper from '../../services/helpers/dateHelper'
import 'primeicons/primeicons.css';
import UserReview from "../../models/userReview";
import UserReviewFilter from "../../models/filters/userReviewFilter";
import TextHelper from "../../services/helpers/textHelper";
import Menubar from "primevue/menubar";
import axios from "axios";
import UIkit from "uikit";

export default {
  name: "Spectacle",
  components: {
    Menubar,
  },

  data() {
    return {
      pieceFull: new PieceFull(),
      pieceIdFromRoute: this.$route.params.id,
      userReviewFilter: new UserReviewFilter(),
      errors: [],
      o: [],
      selectedSeat: null,
      rows: 12,
      cols: 12,
      seats: [
        {
          id: null,
          position: {r: null, c: null},
          status: null,
          price: 0.0,
          isBooked: false
        }
      ],
      totalPrice: 0.0,
      bookingSeatsIds: [], // Id билетов, которые были выбраны для покупки/бронирования
      items: [],
      tickets: {
        cols: 0,
        rows: 0,
        items: [
          {
            id: null,
            isBooked: false,
            ticketPrice: null,
            ticketPlace: null,
            ticketRow: null,
          }
        ]
      },
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
    getSeat(r, c) {

      for (let i = 0; i < this.seats.length; ++i) {
        if (this.seats[i].position.r === r && this.seats[i].position.c === c) {
          return this.seats[i];
        }
      }
      return null;
    },
    generateSeats() {
      this.tickets.items.forEach((ticket) => {

        this.seats.push({
          position: {r: ticket.ticketRow, c: ticket.ticketPlace},
          status: "RA",
          price: ticket.ticketPrice,
          isBooked: ticket.isBooked,
          id: ticket.id,
        });
      })
    },
    classifier(r, c) {
      let seat = this.getSeat(r, c);
      if (seat != null) {
        if (this.selectedSeat !== seat) {
          switch (seat.status) {
            case "RA":
              return "cls-ra";
            case "RB":
              return "cls-rb";
          }
        } else {
          return "cls-selected";
        }
      }
    },
    // true - ряд является проходом
    isAisle(r, c) {
      if (r === 3 || r === 8) {
        if (c >= 1 && c <= 11) {
          return true;
        }
      }
      return false;
    },
    onSeatSelected(row, coll) {
      if (this.selectedSeat === this.getSeat(row, coll)) {
        this.selectedSeat = null;
      } else {
        this.selectedSeat = this.getSeat(row, coll);
      }
    },
    changeSeatStatus(status) {
      if (this.selectedSeat != null) {
        for (let i = 0; i < this.seats.length; ++i) {
          if (this.seats[i].position.r === this.selectedSeat.position.r && this.seats[i].position.c === this.selectedSeat.position.c) {
            this.seats[i].status = status;

            if (status === 'RA') {
              this.totalPrice -= this.totalPrice === 0 ? 0 : this.selectedSeat.price;
              let indexId = this.bookingSeatsIds.indexOf(this.selectedSeat.id);
              console.log(status + ' ' + this.bookingSeatsIds);
              if (indexId > -1) {
                this.bookingSeatsIds.splice(indexId);
                console.log(status + ' ' + this.bookingSeatsIds);
              }
            }

            if (status === 'RB') {
              this.totalPrice += this.selectedSeat.price;
              console.log(status + ' ' + this.bookingSeatsIds);
              this.bookingSeatsIds.push(this.selectedSeat.id);
              console.log(status + ' ' + this.bookingSeatsIds);
            }

            this.selectedSeat = null;
            break;
          }
        }
      }
    },

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
            this.tickets = response.data;
            this.generateSeats();
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

    loadUserReviews() {
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

    bookTickets() {
      axios.post('/ticket/book', {ticketIds: this.bookingSeatsIds})
          .then(() => {
            const toast = useToast();
            toast.success('Билеты успешно забронированы');

            UIkit.modal('#modal-buy-ticket').hide();
          })
          .catch(error => {
            const toast = useToast();

            toast.error(error.response.data.title)
          })
    },

    buyTickets() {
      axios.post('/ticket/buy', {ticketIds: this.bookingSeatsIds})
          .then(() => {
            const toast = useToast();
            toast.success('Билеты успешно куплены');

            UIkit.modal('#modal-buy-ticket').hide();
          })
          .catch(error => {
            const toast = useToast();

            toast.error(error.response.data.title)
          })
    }
  },
  mounted() {
    this.loadPiece();

    this.items = [
      {
        label: 'Билеты',
        items: [
          {
            label: 'Забронировать',
            command: () => this.bookTickets()
          },
          {
            label: 'Купить',
            command: () => this.buyTickets()
          }
        ]
      }

    ]
  }
}
</script>

<style scoped>
.cls-selected {
  background-color: green;
}

.cls-ra {
  background-color: #fff;
}

.cls-rb {
  background-color: gray;
}

.cls-fa {
  background-color: #fff;
  border: 2px solid pink !important;
}

.cls-fb {
  background-color: pink;
}

.cls-ma {
  background-color: #fff;
  border: 2px solid royalblue !important;
}

.cls-mb {
  background-color: royalblue;
}
</style>
