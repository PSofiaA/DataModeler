<template>
  <div class="key-modal-content">
    <div class="modal-title">Атрибут</div>
    <hr />
    <!-- добавить проверку на одинаковые имена, запретить в одной сущности два ключа с одним и тем же названием -->
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
            Выберите тип данных
          </option>
          <option value="char">CHAR</option>
          <option value="varchar">VARCHAR</option>
          <option value="integer">INTEGER</option>
          <option value="numeric">NUMERIC</option>
          <option value="text">TEXT</option>
          <option value="time">TIME</option>
          <option value="date">DATE</option>
        </select>
      </label>

      <label class="attribute-property">
        <input
          type="checkbox"
          @change="setPrimary($event, editedKey.isUnique)"
          v-model="editedKey.isPrimary"
        />
        <!-- <input type="checkbox" v-model="editedKey.isPrimary" /> -->
        Первичный ключ
      </label>
      <div class="property-descriptor">Ключ является первичным</div>
      <!--    @change="setUnique($event, editedKey.isPrimary)" -->
      <label class="attribute-property">
        <input
          type="checkbox"
          v-model="editedKey.isUnique"
          @change="setUnique($event, editedKey.isPrimary)"
        />
        Уникальный/альтернативный ключ
      </label>
      <div class="property-descriptor">Данный ключ уникален</div>

      <label class="attribute-property">
        <input
          type="checkbox"
          @change="setNULL($event, editedKey.isPrimary)"
          v-model="editedKey.isNotNULL"
        />
        NOT NULL
      </label>
      <div class="property-descriptor">Данный ключ не может быть NULL</div>
      <div class="modal-buttons-container">
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
  name: "KeyForm",
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
      this.editedKey.isForeign = false;
    }
  },
  methods: {
    setPrimary(event, flag) {
      if (flag) {
        this.editedKey.isPrimary = false;
      } else if (event.target.checked) {
        this.editedKey.isPrimary = true;
        this.editedKey.isNotNULL = true;
      } else {
        this.editedKey.isPrimary = false;
        this.editedKey.isNotNULL = false;
      }
    },
    setUnique(event, flag) {
      if (event.target.checked && flag) {
        this.editedKey.isUnique = false;
        event.target.checked = false;
      }
    },
    setNULL(event, flag) {
      if (flag) {
        this.editedKey.isNOTNULL = true;
        event.target.checked = true;
      }
    },
    handleSubmit() {
      this.$emit("editKey", this.editedKey, this.isEditing);
      this.isEditing = false;
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
.modal-buttons-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
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
