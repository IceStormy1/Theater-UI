<template>
  <div>Пользователь {{ $route.params.id }}</div>

  <div class="uk-text-center" uk-grid>
    <div class="uk-width-auto@m">
      <div class="uk-card uk-card-default uk-card-body">Автоматически</div>
    </div>
    <div class="uk-width-1-3@m">
      <div class="uk-card uk-card-default uk-card-body">1-3</div>
    </div>
    <div class="uk-width-expand@m">
      <div class="uk-card uk-card-default uk-card-body"></div>
    </div>
  </div>


</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>

</style>
