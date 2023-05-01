<template>

  <div class="uk-slider-container-offset" uk-slider="center: true">

    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">

      <ul class="uk-slider-items uk-child-width-auto@m uk-grid">

        <li v-for="item in products" class="w-5">
          <div class="uk-card uk-card-default ">
            <div class="uk-card-body uk-flex uk-flex-between">

              <img :src="item.mainPicture.directUrl" width="400" max-height="400" alt="123">

              <div class="uk-card-body w-5">
                <p>Актеры спектакля:</p>
                <ul>
                  <li v-for="actors in getWorkersByPositionType(item.workerShortInformation, 'Actor')">{{ actors.fullName }}</li>
                </ul>
                <p>Режиссер:</p>
                <ul>
                  <li v-for="producer in getWorkersByPositionType(item.workerShortInformation, 'Producer')">{{ producer.fullName }}</li>
                </ul>
              </div>
            </div>
            <div>
             <h3 class="uk-card-title hover:bg-yellow-400 uk-width-auto@m" @click="onClickb(item.id)">{{ item.pieceName }}</h3>
              <p>{{ item.shortDescription }}</p>
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

  <div id="app" style="max-width: 400px; max-height: 10px">
    <vue-inline-calendar @update:selected-date="selectedDate = $event" :locale="ru-ru"	/>
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
      layout: 'grid',
      products: [],
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

    getWorkersByPositionType(workerShortInformation, positionType){
      let actors = [];

      workerShortInformation.forEach(x=>
      {
        console.log(x)
        if(x.positionType === positionType)
          actors.push(x);
      });

      return actors;
    }
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
        .then(response =>
        {
          this.products = response.data.items;
        });
  },
};
</script>

<style>
</style>
