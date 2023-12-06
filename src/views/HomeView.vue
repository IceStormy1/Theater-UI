<template>

  <div class="uk-slider-container-offset" uk-slider="center: true">

    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">

      <ul class="uk-slider-items uk-child-width-auto@m uk-grid">

        <li v-for="item in piecesOnSlider" class="w-5">
          <div class="uk-card uk-card-default" style="border-radius: 15px; margin-top: 30px">
            <div class="uk-card-body uk-flex uk-flex-between">

              <v-img
                  cover
                  height="400"
                  :src="item.mainPicture.directUrl"
                  style="border-radius: 15px;"
              ></v-img>

              <div class="uk-card-body w-5">
                <p>Актеры спектакля:</p>
                <ul>
                  <li v-for="actors in getWorkersByPositionType(item.workerShortInformation, 'Actor')">
                    {{ actors.fullName }}
                  </li>
                </ul>
                <p>Режиссер:</p>
                <ul>
                  <li v-for="producer in getWorkersByPositionType(item.workerShortInformation, 'Producer')">
                    {{ producer.fullName }}
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <a><h3 class="uk-card-title hover:bg-yellow-400 uk-width-auto@m" @click="onClickb(item.id)" style="margin-left: 38px">
                {{ item.pieceName }}</h3></a>
              <p style="margin-left: 38px">{{ item.shortDescription }}</p>
              <v-row>
                <v-col cols="12"></v-col>
              </v-row>
            </div>
          </div>
        </li>

      </ul>

      <a class="uk-position-center-left  uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous
         uk-slider-item="previous"></a>
      <a class="uk-position-center-right  uk-position-small uk-hidden-hover" href="#" uk-slidenav-next
         uk-slider-item="next"></a>

    </div>

    <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

  </div>

  <div class="uk-child-width-expand@s uk-text-center" uk-grid>
    <div></div>
    <div class="uk-card uk-card-body">
      <div id="app" style="max-width: 650px;">
        <vue-inline-calendar width="400"
                             @click="onClickf($event)"
                             @update:selected-date="onClickf($event)"
                             :locale="ru-ru"
                             :showYear="false"
                             :disablePastDays="true"/>
      </div>
      <h2 v-if="piecesOnDate.length === 0">На выбранную дату ничего не найдено</h2>
    </div>
    <div></div>
  </div>

<div class="uk-grid-collapse uk-child-width-expand@s uk-flex uk-flex-center" uk-grid>
    <v-card
        v-for="pieceD in piecesOnDate"
        class="mx-6"
        max-width="400"
    >

      <v-img
          cover
          height="250"
          :src="pieceD.mainPicture.directUrl"
      ></v-img>

      <v-card-item>
        <v-card-title>{{pieceD.pieceName}}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{pieceD.pieceGenre}}</span>

          <v-icon
              color="error"
              icon="mdi-fire-circle"
              size="small"
          ></v-icon>
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

        <div>{{pieceD.shortDescription}}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-title>Предстоящие даты</v-card-title>

      <div class="px-4">
        <v-chip-group v-model="selection">
          <v-chip v-for="pieceDate in pieceD.pieceDates"
                  uk-toggle="target: #modal-buy-ticket"
                  @click="loadTickets(pieceDate.pieceId, pieceDate.id, pieceDate.date)">
            {{formatDate(pieceDate.date, 'DD.MM HH:mm')}}
          </v-chip>
        </v-chip-group>
      </div>

      <v-card-actions>
        <v-btn
            color="deep-purple-lighten-2"
            variant="text"
            @click="onClickb(pieceD.id)"
        >
          Подробнее
        </v-btn>
      </v-card-actions>
    </v-card>

</div>

  <!-- Модальное окно покупки билета -->
  <div id="modal-buy-ticket" uk-modal ref="modal-edit" bg-close="false">
    <BookTicket :tickets="tickets" :date="selectedDateInModal"></BookTicket>
  </div>
</template>

<script>

import VueInlineCalendar from 'vue-inline-calendar';
import "vue-inline-calendar/dist/style.css";

import Button from "primevue/button";
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Carousel from 'primevue/carousel'
import axios from "axios";
import dayjs from 'dayjs';
import {useToast} from "vue-toastification";

export default {
  components: {
    Card: Card,
    Button: Button,
    DataViewLayoutOptions: DataViewLayoutOptions,
    DataView: DataView,
    Carousel,
    VueInlineCalendar
  },
  data() {
    return {
      selectedDate: null,
      selectedDateInModal: null,
      layout: 'grid',
      piecesOnSlider: [],
      piecesOnDate: () => this.onClickf(),
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
      responsiveOptions: [
        {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
        }
      ]
    }
  },
  methods: {
    onClickb(spectacleId) {
      this.$router.push('/spectacle/' + spectacleId);
    },
    onClickf(event) {
      this.selectedDate = event;

      axios.get('piece',
          {
            params: {
              limit: 10,
              sortColumn: 'name',
              sortOrder: 0,
              date: this.selectedDate
            }
          })
          .then(response => {
            this.piecesOnDate = response.data.items;
          });
    },

    getWorkersByPositionType(workerShortInformation, positionType) {
      let actors = [];

      workerShortInformation.forEach(x => {
        if (x.positionType === positionType)
          actors.push(x);
      });

      return actors;
    },

    formatDate(dateString, format){
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format(format);
    },

    loadTickets(pieceId, dateId, date) {
      let config = {
        method: 'get',
        url: 'ticket/' + pieceId + '/date/' + dateId,
      };

      this.axios(config)
          .then((response) => {
            this.tickets = response.data;
            this.selectedDateInModal = this.formatDate(date, 'DD.MM HH:mm');
          })
          .catch(function (error) {
            const toast = useToast();

            toast.error(error.response.data.title);
          });
    },
  },

  mounted() {
    axios.get('piece',
        {
          params: {
            limit: 10,
            sortColumn: 'name',
            sortOrder: 0
          }
        })
        .then(response => {
          this.piecesOnSlider = response.data.items;
        });
  },
};
</script>

<style>
</style>
