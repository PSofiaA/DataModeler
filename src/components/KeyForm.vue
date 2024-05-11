<!-- bigint, bit, bit varying, boolean, char, character varying, character, varchar, date, double precision, integer, interval, numeric, decimal, real, smallint, time (с часовым поясом и без), timestamp (с часовым поясом и без), xml. -->

<template>
  <div class="key-modal-content">
    <div class="modal-title">Атрибут</div>
    <hr />
    <form @submit.prevent="handleSubmit">
      <label class="attribute-property">Имя ключа:</label>
      <input-box
        class="box-property"
        type="text"
        v-model="editedKey.name"
        required
      />

      <label class="attribute-property">Тип данных:</label>
      <label class="select-wrapper">
        <select
          class="box-property"
          id="select"
          v-model="editedKey.dataType"
          required
        >
          <option class="placeholder" selected disabled value="">
            Select language
          </option>
          <option value="char">CHAR</option>
          <option value="varchar">VARCHAR</option>
          <option value="integer">INTEGER</option>
          <option value="numeric">NUMERIC</option>
          <option value="text">TEXT</option>
        </select>
      </label>

      <label class="attribute-property">
        <input type="checkbox" v-model="editedKey.isPrimary" />
        Первичный ключ
      </label>
      <div class="property-descriptor">Описание первичного ключа</div>

      <label class="attribute-property">
        <input type="checkbox" v-model="editedKey.isUnique" />
        Уникальный/альтернативный ключ
      </label>
      <div class="property-descriptor">Описание альтернативного ключа</div>

      <label class="attribute-property">
        <input type="checkbox" v-model="editedKey.isNotNULL" /> NOT NULL
      </label>
      <div class="property-descriptor">Описание not null ключа</div>
      <button type="submit">ОК</button>
      <close-button class="close-button" type="button" @click="keyModalClose"
        >X</close-button
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "key-form",
  emits: ["editKey", "keyModalClose"],
  data() {
    return {
      editedKey: { ...this.entityKey },
      isEditing: false,
    };
  },
  props: {
    entityKey: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    if (this.entityKey) {
      this.editedKey = { ...this.entityKey };
      this.isEditing = true;
    } else {
      this.editedKey.isNotNULL = false;
      this.editedKey.isUnique = false;
      this.editedKey.isPrimary = false;
    }
  },
  methods: {
    handleSubmit() {
      console.log("key form submitted");
      this.$emit("editKey", this.editedKey, this.isEditing);
      this.isEditing = false;
      console.log("key form flag", this.isEditing);
    },
    keyModalClose() {
      this.editedKey = null;
      this.isEditing = false;
      this.$emit("keyModalClose");
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
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.box-property {
  width: 200px;
  border-radius: 5px;
  height: 35px;
  border: 1px solid var(--button-border-color);
  margin-top: 10px;
  padding: 0px 15px 0px;
}
label input {
  margin-right: 5px;
}
</style>
