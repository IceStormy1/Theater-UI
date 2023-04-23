<template>
  <div>
    <Menubar class="p-mb-3" :model="items"/>
  </div>
  <router-view/>
</template>


<script>
import Menubar from "primevue/menubar";

// export default defineComponent({


// <script lang="ts">
// import { defineComponent } from "vue";
// import Button from 'primevue/button';
//
// export default defineComponent({
//   name: "Home",
//   components: {
//     Button
//   },
// });

export default {
  components: {
    Menubar: Menubar
  },
  mounted() {
    this.items = [
      {
        label: 'Главная',
        to   : "/",
      }
    ];
  },
  data() {
    return {
      items: [],
    }
  }
};
</script>
