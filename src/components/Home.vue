<template>
  <div>
    <div class="row g-0">
      <div
        class="col-md-2 col-sm-3 bg-dark bg-gradient"
        style="height: 100vh; position: fixed; left: 0"
      >
        <h3 class="text-white p-3 m-4 text-center">Utickets админ</h3>
        <router-link to="/addGame" class="text-white d-block w-75 m-auto mt-5"
          >добавить  игру <i class="fas fa-plus"></i
        ></router-link>
        <router-link
          to="/updateMoney"
          class=" text-white  d-block w-75 m-auto mt-5"
          >Стоимость билета  <i class="fas fa-money-check-alt"></i>
        </router-link>
        <router-link
          to="/PhotoPost"
          class=" text-white  d-block w-75 m-auto mt-5"
          >Oпубликовать картинку <i class="fas fa-images"></i>
        </router-link>
      
      </div>

      <div
        class="col-sm-9 col-md-10 bg-light bg-gradient"
        style="height: 100vh; position: fixed; right: 0; overflow: auto"
      >
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.router-link-exact-active{
  color: rgb(9, 216, 9) !important;
}

</style>
