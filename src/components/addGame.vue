<template>
  <div class="container mt-5">
    <h1>добавить новую игру</h1>
    <div class="row">
      <div class="col-12 mt-4">
        <input
          v-model="name"
          type="text"
          id="form12"
          class="form-control y"
          placeholder="заголовок"
        />
      </div>

      <div class="col-12 mt-4">
        <textarea
          v-model="description"
          class="form-control"
          style="height: 300px"
          placeholder="описание"
        />
      </div>

      <div class="col-12 mt-4">
        <label>Введите дату и время начала игры</label>
        <input
          v-model="time"
          type="datetime-local"
          class="form-control"
          placeholder="o'yin boshlanish sanasi"
        />
      </div>

      <div class="col-12 mt-4">
        <label>Опубликовать фото</label>
        <input
          ref="file"
          type="file"
          class="form-control"
          placeholder="o'yin boshlanish sanasi"
        />
        <n-button
          circle="true"
          class="mt-3 w-25"
          type="primary"
          :loading="loading"
          @click="postInfo"
        >
        отправить  
        </n-button>
        <!-- <button class="btn btn-success bg-gradient mt-4 w-25">Joylash</button> -->
      </div>
    </div>
  </div>
  <n-modal :show="showModalRef">
    <n-card
      style="width: 600px"
      type="success"
      class="bg-success text-white"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <h3>Данные успешно загружены</h3>
    <i class="far fa-check-circle d-block  display-1 text-white float-end"></i>
       {{ timeoutRef / 1000 }}s
    </n-card>
  </n-modal>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const name = ref("");
const description = ref("");
const time = ref("");
let file = ref(null);
const loading = ref(false);

const showModalRef = ref(false);
const timeoutRef = ref(3000);

const countdown = () => {
  if (timeoutRef.value <= 0) {
    showModalRef.value = false;
  } else {
    timeoutRef.value -= 1000;
    setTimeout(countdown, 1000);
  }
};

const postInfo = () => {
  let formData = new FormData();
  formData.append("File", file.value.files[0]);
  let data = {
    Name: name.value,
    Description: description.value,
    StartsAt: new Date(time.value).toJSON(),
    File: file.value.files[0],
  };
  console.log(file.value.files[0]);

  if (name.value !== "" && description.value !== "" && time.value !== "") {
    axios
      .post(`${window.base}api/Events/AddEvent`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
       
        console.log(res);
        if (res.status == 200) {
          console.log("200");
          showModalRef.value = true
      timeoutRef.value = 3000
  loading.value = false;
  countdown()
        }

        name.value = "";
        description.value = "";
        time.value = "";
      })
      .catch((err) => {
        console.log(err);
        loading.value = false;
      });
  } else {
    loading.value = false;
    alert("есть пустое поле данных");
  }
};
</script>

<style lang="scss" scoped></style>
