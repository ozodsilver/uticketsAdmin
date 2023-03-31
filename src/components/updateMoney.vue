<template>
    <div class="container">
<h2 class="my-5 text-secondary text-capitalize">выберите игру, цену которой необходимо изменить</h2>

<div class="row">
<div class="w-100 d-flex align-items-center justify-content-center" style="height:100vh" v-if = 'loade'>
    <div class="spinner spinner-border" >

</div>
</div>
<div class="col-6" v-for = 'info in infos' :key="info.id" v-else>
    <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 d-flex align-items-center p-2">
      <img
        :src="`https://test.utickets.uz/api/Images/${info.imageId}`"
        alt="Произошла ошибка при загрузке изображения"
        class="img-fluid rounded-start"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{info.name}}</h5>
        <p class="card-text">
          {{ info.description }}
        </p>
        <p class="card-text">
         <router-link class="btn btn-primary" :to="{name:'insideMoney', params:{id:info.id}}">Изменить</router-link>
        </p>
      </div>
    </div>
  </div>
</div>
</div>
</div>

    </div>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted, reactive} from 'vue'
let infos = reactive([])

let loade = ref(true)
onMounted(()=>{
    axios.get(`${window.base}api/Events`).then(res =>{
        console.log(res.data);
        if(res.data){
            loade.value = false
            res.data.forEach(el =>{
            infos.push(el)
        })
        }
       

    })
})


</script>

<style lang="scss" scoped>

</style>