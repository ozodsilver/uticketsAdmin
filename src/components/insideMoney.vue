<template>
  <div class="container">
    <i
      class="fas fa-arrow-left fa-2x text-dark my-4"
      style="cursor: pointer"
      @click="router.go(-1)"
    ></i>

    <p class="float-end mt-4">установка одинаковой цены для всех секторов</p>
    <h2 class="my-4 d-flex align-items-center gap-2">
      <span class="w-100">Изменить цену билета </span>
      <input
        type="text"
        class="form-control"
        placeholder="update"
        v-model="update"
      />
      <button class="btn btn-success" @click="updateAll">update</button>
    </h2>

    <div class="d-flex justify-content-center" v-if="loading">
      <div class="spinner spinner-border"></div>
    </div>

    <div class="row" v-else>
      <div class="col-4" v-for="(sector, index) in sortSector" :key="sector.id">
        <div
          class="card mt-4 shadow-lg bg-light ripple"
          data-mdb-ripple-color="primary"
        >
          <div class="card-body">
            <h5 class="card-title text-dark">sector {{ sector.sector }}</h5>
            <p class="text-dark">Current price:{{ sector.ticketPrice }} sum</p>

            <router-link
              :to="{
                name: 'insideMoneyUpdate',
                params: { id: sector.id, secId: sector.sector },
              }"
              type="button"
              class="btn btn-dark opacity-75"
              >Изменять</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { reactive, onMounted, ref, computed } from "vue";

let loading = ref(true);
let selectValue = ref();
let router = useRouter();
let route = useRoute();
let sectors = reactive([]);
let sortSector = computed(() => {
  return sectors.sort((a, b) => {
    return a.sector - b.sector;
  });
});
let price = ref("");
let update = ref("");

const updatePrice = (index) => {
  sectors.forEach((el, idx) => {
    if (index == el.sector) {
   
    }
  });
};

let arr = ref([])


let updateAll = () => {

if(update.value !== ''){


  
  sectors.forEach(el =>{
  el.ticketPrice = update.value
  console.log(el);
arr.value.push({id:el.id,sector:el.sector, ticketPrice:update.value})
})



  axios.patch(
    `${window.base}api/Events/EditPrices/${route.params.id}`,
    arr.value,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }
  ).then(el =>{
    console.log(el);
    if(el.status == 200 ){
      update.value = ''
    }
  }).catch(error =>{
    console.log(error);
  });
}else{
      alert('есть пустое поле')
    }
};

onMounted(() => {
  axios
    .get(`${window.base}api/Events/GetPrices/${route.params.id}`)
    .then((el) => {
      console.log(el.data);
      loading.value = false;
      el.data.forEach((el) => {
        sectors.push(el);
      });
    });

 
});
</script>

<style lang="scss" scoped>

</style>
