<template>
  <hr>
  <div class="container">
    <div class="row">
      <h2 class="my-4 text-success">Поместите изображение для carousel</h2>
      <div class="col-12">
        <form>
          <input type="file" class="form-control" id="img" ref="file" />

          <input
            type="text"
            class="form-control w-25 mt-4"
            v-model="url"
            placeholder="url"
          />
        </form>

        <button class="btn btn-primary mt-4" @click="handleFileUpload">
          опубликовать фото
        </button>
      </div>
    </div>

    <img :src="val" alt="">
  </div>
<hr>
<div class="container-fluid my-5">
<h2 class="text-danger">удалить фотографии</h2>

<div class="row">
<div class="col-12">
  <table class="table align-middle mb-0 bg-white">
  <thead class="bg-light">
    <tr>
      <th>Image</th>
      <th>Status</th>
      
   
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(info, index) in infos" :key="info.id">
      <td>
       
          <img
           :src="`https://test.utickets.uz/api/Images/${info.id}`" 
              alt=""
             
              class="rounded  w-25"
              />
        
  
      </td>
    
      <td>
        <span class="badge badge-success rounded-pill d-inline">Active</span>
      </td>
    
      <td>
        <button type="button" class="btn fs-6 btn-sm  btn-danger" @click="deleteImage(info.id, index)">
          <i class="far fa-trash-can"></i>
        </button>
      </td>
    </tr>
    

  </tbody>
</table>
</div>
</div>
</div>


</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
let file = ref("");
let url = ref("");
let infos = ref([])
let changeImg = () => {
  let data = new FormData();
  data.append("file", img.files[0]);
  console.log(data);
};


let handleFileUpload = () => {
  let data = new FormData();
  data.append("file", file.value.files[0]);

  if(file.value !== ''){
    axios
    .post(
      `${window.base}api/PhotoWheel`,

      {
        file: file.value.files[0],
        url: url.value,
      },

      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((el) => {
      console.log(el);
      url.value = ''
      file.value = ''
      alert('success')
    
      
    })
    .catch((error) => {
      console.log(error);
      alert('error ')
    });
  }
  console.log(file.value.files[0]);
};


// delete the img

let deleteImage = (id,idx)=>{

  infos.value.splice(idx,1)

axios.delete(`${window.base}api/PhotoWheel?id=${id}`,
{
  headers:{
    'Authorization':`Bearer ${localStorage.getItem('token')}`
  }
}
).then(response =>{
  console.log(response);
})
}


onMounted(() => {
  axios.get(`${window.base}api/PhotoWheel`).then(res =>{
    res.data.forEach(el =>{
      infos.value.push(el)
    })
  })
});
</script>

<style lang="scss" scoped></style>
