<template>
  <div class="key-modal-content">
    <div class="modal-title">Атрибут</div>
    <hr />
    <form @submit.prevent>
      <div class="attribute-property">Имя ключа:</div>
      <input class="box-property" type="text" />

      <div class="attribute-property">Тип данных:</div>
      <div class="select-wrapper">
        <select class="box-property" id="select">
          <option>Выберите тип данных</option>
          <option>Выберите тип данных</option>
          <option>Выберите тип данных</option>
        </select>
      </div>

      <label class="attribute-property">
        <input type="checkbox" /> Первичный ключ
      </label>
      <div class="property-descriptor">Описание первичного ключа</div>

      <label class="attribute-property">
        <input type="checkbox" /> Уникальный/альтернативный ключ
      </label>
      <div class="property-descriptor">Описание альтернативного ключа</div>

      <label class="attribute-property">
        <input type="checkbox" /> NOT NULL
      </label>
      <div class="property-descriptor">Описание not null ключа</div>
      <button @click="submitKey">ОК</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "key-form",
  data() {
    return {};
  },
  props: {
    key: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped>
.key-modal-content {
  width: 450px;
  height: 440px;
}
.modal-title {
  height: 45px;
  padding: 15px 25px 0px;
  font-size: 1.2em;
  letter-spacing: 1px;
}
hr {
  width: 400;
  size: 0.9;
  color: #e7e3dd;
}
form {
  margin: 10px 25px 20px;
  display: flex;
  flex-direction: column;
}
.attribute-property {
  font-weight: 500;
  font-size: 1.1em;
  margin-top: 10px;
}
.property-descriptor {
  font-weight: 200;
  margin: 0px 22px 10px;
}
button {
  width: 60px;
  height: 30px;
  background-color: #269eef;
  border: 1px solid #269eef;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.box-property {
  border-radius: 5px;
  height: 35px;
  border: 1px solid var(--button-border-color);
  margin-top: 10px;
  padding: 0px 15px 0px;
}
select::part(button) {
}
label input {
  margin-right: 5px;
}
</style>
