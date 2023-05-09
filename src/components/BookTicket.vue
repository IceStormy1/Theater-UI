<template>

  <!-- Модальное окно покупки билета -->

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

</template>

<script>

import Menubar from "primevue/menubar";
import UserReview from "../models/userReview";
import DateHelper from "../services/helpers/dateHelper";
import TextHelper from "../services/helpers/textHelper";
import axios from "axios";
import {useToast} from "vue-toastification";
import UIkit from "uikit";

export default {
  name: "BookTicket",
  props: {
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
  },
  components: {
    Menubar,
  },

  data(){
    return {
      pieceIdFromRoute: this.pieceId,
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
  methods:{
    getSeat(r, c) {

      for (let i = 0; i < this.seats.length; ++i) {
        if (this.seats[i].position.r === r && this.seats[i].position.c === c) {
          return this.seats[i];
        }
      }
      return null;
    },
    generateSeats() {
      console.log(this.tickets.items)

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
  watch: {
    tickets: {
      handler: function() {
        this.generateSeats();
      },
      deep: true
    }
  },
  mounted() {
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