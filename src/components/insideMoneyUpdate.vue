<template>
  <div>
    <div class="container">
      <i class="fas fa-arrow-left fa-2x text-dark my-4  " style="cursor: pointer;" @click="backOneStep"></i>
      <h2 class="my-5">Oбновить цену этого сектора</h2>

      <input type="text" placeholder="Стоимость билета" class="form-control w-50" v-model = 'updateTicket' />
     
      
     <div class="d-flex align-items-end gap-4">
      <n-button :loading="loading" type="success" class="w-25 mt-4" @click="updateMoney" >
        изменять
      </n-button>

     <div v-if="success">
      <i class="fas fa-circle-check fa-2x text-success"></i>
      измененный
     </div>
     </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
let router = useRouter()
let route = useRoute();
let backOneStep = ()=>{
  router.go(-1)
}

let success = ref(false)
const updateTicket = ref('')
const updateMoney = ()=>{
if(updateTicket.value !== ''){
  axios.patch(`${window.base}api/Events/EditPrices/${route.params.id}`, 
  [{
    "id": `${route.params.id}`,
    "sector": +`${route.params.secId}`,
    "ticketPrice": +updateTicket.value
  }],
  {
   headers:{
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-type': 'application/json'
   }
    
  }).then(res =>{
    if(res.status == 200){
     setTimeout(() => {
      success.value = true
     }, 10);

     setTimeout(() => {
      success.value = false
      updateTicket.value = ''
     }, 2000);
    }
    console.log(res);
  })
}else{
  alert('есть пустое поле')
}
}
</script>

<style lang="scss" scoped></style>
