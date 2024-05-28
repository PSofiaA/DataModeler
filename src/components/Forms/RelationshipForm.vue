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
          v-model="this.editedRel.type"
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

      <div class="modal-buttons-container">
        <modal-button
          v-show="this.isEditing"
          type="button"
          @click="deleteRelation"
        >
          Удалить отношение
        </modal-button>
        <modal-button type="submit">ОК</modal-button>
      </div>

      <close-button class="close-button" type="button" @click="keyModalClose"
        >X</close-button
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "RelationshipForm",
  emits: ["createRel", "relModalClose", "deleteRel"],
  data() {
    return {
      isEditing: false,
      editedRel: { ...this.entityRel },
    };
  },
  props: {
    entityRel: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    if (this.entityRel) {
      this.editedRel = { ...this.entityRel };
      this.isEditing = true;
    } else {
      this.editedRel.type = "";
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("createRel", this.editedRel, this.isEditing);
    },
    deleteRelation() {
      this.$emit("deleteRel", this.entityRel);
    },
    keyModalClose() {
      this.editedRel = null;
      this.isEditing = false;
      this.$emit("relModalClose");
    },
  },
};
</script>

<style scoped>
.modal-content {
  width: 370px;
  height: 240px;
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
.modal-buttons-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
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
