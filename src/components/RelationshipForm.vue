<template>
  <div class="modal-title">Отношение</div>
  <hr />
  <div class="modal-content">
    <form @submit.prevent="handleSubmit">
      <div class="relationship-property">Тип отношения:</div>
      <label class="select-wrapper">
        <select
          class="box-property"
          id="select"
          v-model="this.relType"
          required
        >
          <option class="placeholder" selected disabled value="">
            Выберите тип отношения
          </option>
          <option value="NonIdentifying">
            Неидентифицирующая определенная обязательная
          </option>

          <option value="NonIdentifying Optional">
            Неидентифицирующая определенная необязательная
          </option>

          <option value="Identifying">Идентифицирующая определенная</option>
          <option value="M2M">Непределенная</option>
        </select>
      </label>
      <div class="relationship-property">Описание отношения:</div>
      <textarea id="comment"></textarea>
      <button type="submit">ОК</button>
      <close-button class="close-button" type="button" @click="keyModalClose"
        >X</close-button
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "RelationshipForm",
  emits: ["createRel", "relModalClose"],
  data() {
    return {
      relType: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("form submitted");
      console.log("form submitted", this.relType);
      this.$emit("createRel", this.relType);
    },
    keyModalClose() {
      this.$emit("relModalClose");
    },
  },
};
</script>

<style scoped>
.modal-content {
  width: 340px;
  height: 225px;
}
.modal-title {
  height: 40px;
  padding: 10px 25px 0px;
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
button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: fit-content;
  padding: 7px;
  height: 30px;
  background-color: rgba(0, 136, 169, 0.8);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;
}
button:hover {
  background-color: rgba(0, 136, 169, 1);
}

.relationship-property {
  font-weight: 500;
  font-size: 1.1em;
  margin-top: 10px;
}
.box-property {
  width: 230px;
  border-radius: 5px;
  height: 35px;
  border: 1px solid var(--button-border-color);
  margin-top: 10px;
  padding: 0px 15px 0px;
}
label input {
  margin-right: 5px;
}
#comment {
  margin-top: 10px;
  resize: none;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid var(--button-border-color);
  width: 230px;
  height: 60px;
  font-family: "Montserrat", sans-serif;
}
textarea:focus,
select:focus {
  outline: 1.7px solid rgba(0, 136, 169, 0.9);
}
.placeholder {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
}
</style>
