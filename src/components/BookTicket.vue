<template>

  <!-- Модальное окно покупки билета -->

    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Купить билеты на дату {{date}}</h2>

      <div class="container">
        <div class="row">
          <div class="col-8 py-5">
            <div>
              <table class="mx-auto">
                <tr v-for="idxr, r in 12">
                  <td v-for="idxc, c in 12" class="pl-2" style="width: 50px">
                    <svg @click="onSeatSelected(idxr, idxc)"
                         v-if="isAisle(idxr, idxc) && getSeat(idxr, idxc)?.isBooked === true" disabled="true"
                         id="Layer_1" data-name="Layer 1"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 100 100">
                      <path :class="cls-rb" d="M36,17.3H80.4a8.88,8.88,0,0,1,6.72-7.25A5.77,5.77,0,0,0,81.57,6H36a5.72,5.72,0,0,0-5.76,5.66A5.71,5.71,0,0,0,36,17.3Z"/>
                      <path :class="cls-rb" d="M80.29,82.79H36A5.66,5.66,0,1,0,36,94.1H81.47a6.13,6.13,0,0,0,5.44-3.41A8.77,8.77,0,0,1,80.29,82.79Z"/>
                      <path :class="cls-rb" d="M80.08,79.7V20.5H35.92A8.85,8.85,0,0,1,27.17,13h-18a4,4,0,0,0-4.06,4V82.79a4,4,0,0,0,4.06,3.95H27.28a8.65,8.65,0,0,1,8.75-7Z"/>
                      <path :class="cls-rb" d="M89.15,12.93a5.71,5.71,0,0,0-5.76,5.65V82.15a5.76,5.76,0,0,0,11.52,0V18.58A5.71,5.71,0,0,0,89.15,12.93Z"/>
                      <path :class="cls-rb" d="M90.21,9.94a8.93,8.93,0,0,0-8.74-7H36a8.94,8.94,0,0,0-8.75,6.93H9.15A7.22,7.22,0,0,0,2,17V82.79a7.06,7.06,0,0,0,7.15,7h18a8.85,8.85,0,0,0,8.75,7.26H81.47A8.91,8.91,0,0,0,90,90.9a8.81,8.81,0,0,0,8-8.75V18.58A8.84,8.84,0,0,0,90.21,9.94ZM36,6H81.57a5.77,5.77,0,0,1,5.55,4.06A8.88,8.88,0,0,0,80.4,17.3H36a5.71,5.71,0,0,1-5.76-5.65A5.72,5.72,0,0,1,36,6ZM27.28,86.74H9.15a4,4,0,0,1-4.06-3.95V17a4,4,0,0,1,4.06-4h18a8.85,8.85,0,0,0,8.75,7.47H80.08V79.7H36A8.65,8.65,0,0,0,27.28,86.74ZM81.47,94.1H36a5.66,5.66,0,1,1,0-11.31H80.29a8.77,8.77,0,0,0,6.62,7.9A6.13,6.13,0,0,1,81.47,94.1ZM94.91,82.15a5.76,5.76,0,0,1-11.52,0V18.58a5.76,5.76,0,0,1,11.52,0Z"/>
                    </svg>
                    <svg @click="onSeatSelected(idxr, idxc)"
                         v-if="!isAisle(idxr, idxc)"
                         id="Layer_1" data-name="Layer 1"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 100 100">
                      <path :class="classifier(idxr, idxc)" d="M36,17.3H80.4a8.88,8.88,0,0,1,6.72-7.25A5.77,5.77,0,0,0,81.57,6H36a5.72,5.72,0,0,0-5.76,5.66A5.71,5.71,0,0,0,36,17.3Z"/>
                      <path :class="classifier(idxr, idxc)" d="M80.29,82.79H36A5.66,5.66,0,1,0,36,94.1H81.47a6.13,6.13,0,0,0,5.44-3.41A8.77,8.77,0,0,1,80.29,82.79Z"/>
                      <path :class="classifier(idxr, idxc)" d="M80.08,79.7V20.5H35.92A8.85,8.85,0,0,1,27.17,13h-18a4,4,0,0,0-4.06,4V82.79a4,4,0,0,0,4.06,3.95H27.28a8.65,8.65,0,0,1,8.75-7Z"/>
                      <path :class="classifier(idxr, idxc)" d="M89.15,12.93a5.71,5.71,0,0,0-5.76,5.65V82.15a5.76,5.76,0,0,0,11.52,0V18.58A5.71,5.71,0,0,0,89.15,12.93Z"/>
                      <path :class="classifier(idxr, idxc)" d="M90.21,9.94a8.93,8.93,0,0,0-8.74-7H36a8.94,8.94,0,0,0-8.75,6.93H9.15A7.22,7.22,0,0,0,2,17V82.79a7.06,7.06,0,0,0,7.15,7h18a8.85,8.85,0,0,0,8.75,7.26H81.47A8.91,8.91,0,0,0,90,90.9a8.81,8.81,0,0,0,8-8.75V18.58A8.84,8.84,0,0,0,90.21,9.94ZM36,6H81.57a5.77,5.77,0,0,1,5.55,4.06A8.88,8.88,0,0,0,80.4,17.3H36a5.71,5.71,0,0,1-5.76-5.65A5.72,5.72,0,0,1,36,6ZM27.28,86.74H9.15a4,4,0,0,1-4.06-3.95V17a4,4,0,0,1,4.06-4h18a8.85,8.85,0,0,0,8.75,7.47H80.08V79.7H36A8.65,8.65,0,0,0,27.28,86.74ZM81.47,94.1H36a5.66,5.66,0,1,1,0-11.31H80.29a8.77,8.77,0,0,0,6.62,7.9A6.13,6.13,0,0,1,81.47,94.1ZM94.91,82.15a5.76,5.76,0,0,1-11.52,0V18.58a5.76,5.76,0,0,1,11.52,0Z"/>
                    </svg>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="col-12 ">
            <div>
              <div @click="changeSeatStatus('RA')" class="float-left" style="">
                <div class="cls-ra" style="width: 30px; height: 30px; border: 0px solid black;"></div>
                <svg
                    class="cls-ra"
                    id="Layer_1" data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100">
                  <path :class="cls-ra" d="M36,17.3H80.4a8.88,8.88,0,0,1,6.72-7.25A5.77,5.77,0,0,0,81.57,6H36a5.72,5.72,0,0,0-5.76,5.66A5.71,5.71,0,0,0,36,17.3Z"/>
                  <path :class="cls-ra" d="M80.29,82.79H36A5.66,5.66,0,1,0,36,94.1H81.47a6.13,6.13,0,0,0,5.44-3.41A8.77,8.77,0,0,1,80.29,82.79Z"/>
                  <path :class="cls-ra" d="M80.08,79.7V20.5H35.92A8.85,8.85,0,0,1,27.17,13h-18a4,4,0,0,0-4.06,4V82.79a4,4,0,0,0,4.06,3.95H27.28a8.65,8.65,0,0,1,8.75-7Z"/>
                  <path :class="cls-ra" d="M89.15,12.93a5.71,5.71,0,0,0-5.76,5.65V82.15a5.76,5.76,0,0,0,11.52,0V18.58A5.71,5.71,0,0,0,89.15,12.93Z"/>
                  <path :class="cls-ra" d="M90.21,9.94a8.93,8.93,0,0,0-8.74-7H36a8.94,8.94,0,0,0-8.75,6.93H9.15A7.22,7.22,0,0,0,2,17V82.79a7.06,7.06,0,0,0,7.15,7h18a8.85,8.85,0,0,0,8.75,7.26H81.47A8.91,8.91,0,0,0,90,90.9a8.81,8.81,0,0,0,8-8.75V18.58A8.84,8.84,0,0,0,90.21,9.94ZM36,6H81.57a5.77,5.77,0,0,1,5.55,4.06A8.88,8.88,0,0,0,80.4,17.3H36a5.71,5.71,0,0,1-5.76-5.65A5.72,5.72,0,0,1,36,6ZM27.28,86.74H9.15a4,4,0,0,1-4.06-3.95V17a4,4,0,0,1,4.06-4h18a8.85,8.85,0,0,0,8.75,7.47H80.08V79.7H36A8.65,8.65,0,0,0,27.28,86.74ZM81.47,94.1H36a5.66,5.66,0,1,1,0-11.31H80.29a8.77,8.77,0,0,0,6.62,7.9A6.13,6.13,0,0,1,81.47,94.1ZM94.91,82.15a5.76,5.76,0,0,1-11.52,0V18.58a5.76,5.76,0,0,1,11.52,0Z"/>
                </svg>
              </div>
              <v-row><v-col cols="12"></v-col></v-row>
              <v-row><v-col cols="12"></v-col></v-row>
              <span class="px-3"> - Свободные места</span>
            </div>
            <v-row><v-col cols="12"></v-col></v-row>
            <div>
              <div @click="changeSeatStatus('RB')" class="float-left" style="">
                <div class="cls-ra" style="width: 30px; height: 30px; border: 0px solid black;"></div>
                <svg
                     class="cls-rb"
                     id="Layer_1" data-name="Layer 1"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 100 100">
                  <path :class="cls-rb" d="M36,17.3H80.4a8.88,8.88,0,0,1,6.72-7.25A5.77,5.77,0,0,0,81.57,6H36a5.72,5.72,0,0,0-5.76,5.66A5.71,5.71,0,0,0,36,17.3Z"/>
                  <path :class="cls-rb" d="M80.29,82.79H36A5.66,5.66,0,1,0,36,94.1H81.47a6.13,6.13,0,0,0,5.44-3.41A8.77,8.77,0,0,1,80.29,82.79Z"/>
                  <path :class="cls-rb" d="M80.08,79.7V20.5H35.92A8.85,8.85,0,0,1,27.17,13h-18a4,4,0,0,0-4.06,4V82.79a4,4,0,0,0,4.06,3.95H27.28a8.65,8.65,0,0,1,8.75-7Z"/>
                  <path :class="cls-rb" d="M89.15,12.93a5.71,5.71,0,0,0-5.76,5.65V82.15a5.76,5.76,0,0,0,11.52,0V18.58A5.71,5.71,0,0,0,89.15,12.93Z"/>
                  <path :class="cls-rb" d="M90.21,9.94a8.93,8.93,0,0,0-8.74-7H36a8.94,8.94,0,0,0-8.75,6.93H9.15A7.22,7.22,0,0,0,2,17V82.79a7.06,7.06,0,0,0,7.15,7h18a8.85,8.85,0,0,0,8.75,7.26H81.47A8.91,8.91,0,0,0,90,90.9a8.81,8.81,0,0,0,8-8.75V18.58A8.84,8.84,0,0,0,90.21,9.94ZM36,6H81.57a5.77,5.77,0,0,1,5.55,4.06A8.88,8.88,0,0,0,80.4,17.3H36a5.71,5.71,0,0,1-5.76-5.65A5.72,5.72,0,0,1,36,6ZM27.28,86.74H9.15a4,4,0,0,1-4.06-3.95V17a4,4,0,0,1,4.06-4h18a8.85,8.85,0,0,0,8.75,7.47H80.08V79.7H36A8.65,8.65,0,0,0,27.28,86.74ZM81.47,94.1H36a5.66,5.66,0,1,1,0-11.31H80.29a8.77,8.77,0,0,0,6.62,7.9A6.13,6.13,0,0,1,81.47,94.1ZM94.91,82.15a5.76,5.76,0,0,1-11.52,0V18.58a5.76,5.76,0,0,1,11.52,0Z"/>
                </svg>
              </div>
              <v-row><v-col cols="12"></v-col></v-row>
              <v-row><v-col cols="12"></v-col></v-row>
              <span class="px-3"> - Забронировано/Куплено</span>
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
    date: null,
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
    seatStatus(status){
      if(this.selectedSeat != null) {
        if(this.selectedSeat.status === status)
          return 'active';
      }
      return '';
    },
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

<style>
.cls-selected{fill:green;stroke:#000;stroke-miterlimit:10;}
.cls-ra{fill:#fff;stroke:#000;stroke-miterlimit:10;}
.cls-rb{fill:gray;stroke:#000;stroke-miterlimit:10;}
.cls-fa{fill:#fff;stroke:red;stroke-miterlimit:10;}
.cls-fb{fill:pink;stroke:red;stroke-miterlimit:10;}
.cls-ma{fill:#fff;stroke:blue;stroke-miterlimit:10;}
.cls-mb{fill:royalblue;stroke:blue;stroke-miterlimit:10;}


</style>
