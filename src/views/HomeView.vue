<template>

  <div class="uk-slider-container-offset" uk-slider="center: true">

    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">

      <ul class="uk-slider-items uk-child-width-auto@m uk-grid">

        <li v-for="item in piecesOnSlider" class="w-5">
          <div class="uk-card uk-card-default ">
            <div class="uk-card-body uk-flex uk-flex-between">

              <img :src="item.mainPicture.directUrl" width="400" max-height="400" alt="123">

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
              <a><h3 class="uk-card-title hover:bg-yellow-400 uk-width-auto@m" @click="onClickb(item.id)">
                {{ item.pieceName }}</h3></a>
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
    </div>
    <div></div>
  </div>


  <div class="uk-child-width-1-2@m uk-child-width-1-3@l .uk-grid-collapse " uk-height-match=".uk-card-body" uk-grid>
    <div class="uk-child-width-1-2@m ">
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <div class="uk-text-center">
            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
              <img class="uk-transition-scale-up uk-transition-opaque" data-src="/src/assets/examplePiece.jpg" data-width="1000" data-height="667" alt="UIkit cards" uk-img="">
              <div class="uk-position-center">
                <span class="uk-transition-fade" uk-icon="icon: plus; ratio: 2"></span>
              </div>
            </div>
          </div>
          <div class="uk-card-badge uk-label">Новинка</div>
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">Телевизор Panasonic TX-43FR250</h3>
          <p class="uk-text-truncate">20'' (50 см) Телевизор LED Panasonic 20S30HA102B черный</p>
          <div class="uk-child-width-auto uk-flex-middle" uk-grid>
            <div>
              <span class="uk-text-emphasis uk-text-bold uk-text-large">6 999 р</span>
            </div>
            <div>
              <ul class="uk-iconnav uk-flex-right">
                <li><a href="#" uk-icon="icon: heart"></a></li>
                <li><a href="#" uk-icon="icon: comment"></a></li>
                <li><a href="#" uk-icon="icon: star"></a></li>
              </ul>
            </div>
          </div>
          <p class="uk-text-small uk-text-muted">100 шт. в наличии</p>

        </div>
        <div class="uk-card-footer">
          <div class="uk-flex uk-flex-between">
            <a class="uk-button uk-button-default" href="#">Подробнее</a>
            <button class="uk-button uk-button-primary uk-text-right">
              <span uk-icon="icon: cart;"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-child-width-1-2@m">
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <div class="uk-text-center">
            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
              <img class="uk-transition-scale-up uk-transition-opaque" data-src="/src/assets/examplePiece.jpg" data-width="1000" data-height="667" alt="UIkit cards" uk-img="">
              <div class="uk-position-center">
                <span class="uk-transition-fade" uk-icon="icon: plus; ratio: 2"></span>
              </div>
            </div>
          </div>
          <div class="uk-card-badge uk-label">Новинка</div>
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">Смартфон SAMSUNG Galaxy A7</h3>
          <p class="uk-text-truncate">(2018) 64GB Black (SM-A750FN/DS)</p>
          <div class="uk-child-width-auto uk-flex-middle" uk-grid>
            <div>
              <span class="uk-text-emphasis uk-text-bold uk-text-large">21 999 р</span>
            </div>
            <div>
              <ul class="uk-iconnav uk-flex-right">
                <li><a href="#" uk-icon="icon: heart"></a></li>
                <li><a href="#" uk-icon="icon: comment"></a></li>
                <li><a href="#" uk-icon="icon: star"></a></li>
              </ul>
            </div>
          </div>
          <p class="uk-text-small uk-text-muted">100 шт. в наличии</p>

        </div>
        <div class="uk-card-footer">
          <div class="uk-flex uk-flex-between">
            <a class="uk-button uk-button-default" href="#">Подробнее</a>
            <button class="uk-button uk-button-primary uk-text-right">
              <span uk-icon="icon: cart;"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-child-width-1-2@m">
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <div class="uk-text-center">
            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
              <img class="uk-transition-scale-up uk-transition-opaque" data-src="/src/assets/examplePiece.jpg" data-width="1000" data-height="667" alt="UIkit cards" uk-img="">
              <div class="uk-position-center">
                <span class="uk-transition-fade" uk-icon="icon: plus; ratio: 2"></span>
              </div>
            </div>
          </div>
          <div class="uk-card-badge uk-label">Новинка</div>
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">17.3" Ноутбук HP OMEN</h3>
          <p class="uk-text-truncate">17-an118ur, черный</p>
          <div class="uk-child-width-auto uk-flex-middle" uk-grid>
            <div>
              <span class="uk-text-emphasis uk-text-bold uk-text-large">120 000 р</span>
            </div>
            <div>
              <ul class="uk-iconnav uk-flex-right">
                <li><a href="#" uk-icon="icon: heart"></a></li>
                <li><a href="#" uk-icon="icon: comment"></a></li>
                <li><a href="#" uk-icon="icon: star"></a></li>
              </ul>
            </div>
          </div>
          <p class="uk-text-small uk-text-muted">100 шт. в наличии</p>

        </div>
        <div class="uk-card-footer">
          <div class="uk-flex uk-flex-between">
            <a class="uk-button uk-button-default" href="#">Подробнее</a>
            <button class="uk-button uk-button-primary uk-text-right">
              <span uk-icon="icon: cart;"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-child-width-1-2@m">
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <div class="uk-text-center">
            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
              <img class="uk-transition-scale-up uk-transition-opaque" data-src="/src/assets/examplePiece.jpg" data-width="1000" data-height="667" alt="UIkit cards" uk-img="">
              <div class="uk-position-center">
                <span class="uk-transition-fade" uk-icon="icon: plus; ratio: 2"></span>
              </div>
            </div>
          </div>
          <div class="uk-card-badge uk-label">Новинка</div>
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">Телевизор Panasonic TX-43FR250</h3>
          <p class="uk-text-truncate">20'' (50 см) Телевизор LED Panasonic 20S30HA102B черный</p>
          <div class="uk-child-width-auto uk-flex-middle" uk-grid>
            <div>
              <span class="uk-text-emphasis uk-text-bold uk-text-large">6 999 р</span>
            </div>
            <div>
              <ul class="uk-iconnav uk-flex-right">
                <li><a href="#" uk-icon="icon: heart"></a></li>
                <li><a href="#" uk-icon="icon: comment"></a></li>
                <li><a href="#" uk-icon="icon: star"></a></li>
              </ul>
            </div>
          </div>
          <p class="uk-text-small uk-text-muted">100 шт. в наличии</p>

        </div>
        <div class="uk-card-footer">
          <div class="uk-flex uk-flex-between">
            <a class="uk-button uk-button-default" href="#">Подробнее</a>
            <button class="uk-button uk-button-primary uk-text-right">
              <span uk-icon="icon: cart;"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-child-width-1-2@m">
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <div class="uk-text-center">
            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
              <img class="uk-transition-scale-up uk-transition-opaque" data-src="/src/assets/examplePiece.jpg" data-width="1000" data-height="667" alt="UIkit cards" uk-img="">
              <div class="uk-position-center">
                <span class="uk-transition-fade" uk-icon="icon: plus; ratio: 2"></span>
              </div>
            </div>
          </div>
          <div class="uk-card-badge uk-label">Новинка</div>
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">Телевизор Panasonic TX-43FR250</h3>
          <p class="uk-text-truncate">20'' (50 см) Телевизор LED Panasonic 20S30HA102B черный</p>
          <div class="uk-child-width-auto uk-flex-middle" uk-grid>
            <div>
              <span class="uk-text-emphasis uk-text-bold uk-text-large">6 999 р</span>
            </div>
            <div>
              <ul class="uk-iconnav uk-flex-right">
                <li><a href="#" uk-icon="icon: heart"></a></li>
                <li><a href="#" uk-icon="icon: comment"></a></li>
                <li><a href="#" uk-icon="icon: star"></a></li>
              </ul>
            </div>
          </div>
          <p class="uk-text-small uk-text-muted">100 шт. в наличии</p>

        </div>
        <div class="uk-card-footer">
          <div class="uk-flex uk-flex-between">
            <a class="uk-button uk-button-default" href="#">Подробнее</a>
            <button class="uk-button uk-button-primary uk-text-right">
              <span uk-icon="icon: cart;"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-child-width-1-2@m">
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <div class="uk-text-center">
            <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
              <img class="uk-transition-scale-up uk-transition-opaque" data-src="/src/assets/examplePiece.jpg" data-width="1000" data-height="667" alt="UIkit cards" uk-img="">
              <div class="uk-position-center">
                <span class="uk-transition-fade" uk-icon="icon: plus; ratio: 2"></span>
              </div>
            </div>
          </div>
          <div class="uk-card-badge uk-label">Новинка</div>
        </div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">Телевизор Panasonic TX-43FR250</h3>
          <p class="uk-text-truncate">20'' (50 см) Телевизор LED Panasonic 20S30HA102B черный</p>
          <div class="uk-child-width-auto uk-flex-middle" uk-grid>
            <div>
              <span class="uk-text-emphasis uk-text-bold uk-text-large">6 999 р</span>
            </div>
            <div>
              <ul class="uk-iconnav uk-flex-right">
                <li><a href="#" uk-icon="icon: heart"></a></li>
                <li><a href="#" uk-icon="icon: comment"></a></li>
                <li><a href="#" uk-icon="icon: star"></a></li>
              </ul>
            </div>
          </div>
          <p class="uk-text-small uk-text-muted">100 шт. в наличии</p>

        </div>
        <div class="uk-card-footer">
          <div class="uk-flex uk-flex-between">
            <a class="uk-button uk-button-default" href="#">Подробнее</a>
            <button class="uk-button uk-button-primary uk-text-right">
              <span uk-icon="icon: cart;"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
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
      piecesOnSlider: [],
      piecesOnDate: () => this.onClickf(),
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
        console.log(x)
        if (x.positionType === positionType)
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
        .then(response => {
          this.piecesOnSlider = response.data.items;
        });
  },
};
</script>

<style>
</style>
