<template>
  <div class="modal-content">
    <div class="modal-title">Редактировать сущность</div>
    <hr />
    <form @submit.prevent="handleSubmit">
      <div class="entity-property">Имя сущности:</div>
      <input-box v-model="editedEntity.name" />
      <div class="modal-buttons">
        <button type="button" @click="keyModalCreate">Добавить ключ</button>
        <button type="handleSubmit">ОК</button>
      </div>
      <close-button @click="entityModalClose" class="close-button" type="button"
        >X</close-button
      >
    </form>
    <div class="modal-keys">
      <table>
        <tr style="background-color: #e7e3dd">
          <!-- <th>#</th> -->
          <th>PK</th>
          <th>Имя</th>
          <th>Тип данных</th>
          <th>NOT NULL</th>
          <th>UNIQUE</th>
          <th>#</th>
        </tr>
        <tr
          v-for="entityKey in entity.keys"
          :key="entityKey.keyID"
          @click="keyModalEdit(entityKey)"
        >
          <td>{{ entityKey.isPrimary }}</td>
          <td>{{ entityKey.name }}</td>
          <td>{{ entityKey.dataType }}</td>
          <td>{{ entityKey.isNotNULL }}</td>
          <td>{{ entityKey.isUnique }}</td>
          <td>
            <delete-button></delete-button>
          </td>
        </tr>
      </table>
    </div>
    <edit-box v-model:show="isKeyModalOpen"
      ><key-form
        :entityKey="editKey"
        @editKey="submitKey"
        @keyModalClose="keyModalClose"
      ></key-form
    ></edit-box>
  </div>
</template>

<script>
import KeyForm from "./KeyForm.vue";
export default {
  components: {
    KeyForm,
  },
  name: "EntityEditForm",
  emits: ["editEntity", "entityModalClose"],
  data() {
    return {
      isKeyModalOpen: false,
      editKey: null,
      editedEntity: { ...this.entity },
    };
  },
  props: { entity: { type: Object } },
  methods: {
    //async ??
    handleSubmit() {
      this.$emit("editEntity", this.editedEntity);
    },
    entityModalClose() {
      this.editedEntity = null;
      this.$emit("entityModalClose");
    },
    keyModalCreate() {
      this.isKeyModalOpen = true;
    },
    keyModalEdit(entityKey) {
      this.editKey = { ...entityKey };
      this.isKeyModalOpen = true;
    },
    keyModalClose() {
      this.editKey = null;
      this.isKeyModalOpen = false;
    },
    submitKey(editedKey, flag) {
      if (flag) {
        const index = this.editedEntity.keys.findIndex(
          (x) => editedKey.keyID === x.keyID
        );
        this.editedEntity.keys[index] = editedKey;
      } else {
        this.editedEntity.keys.push(editedKey);
      }
      this.isKeyModalOpen = false;
      this.editKey = null;
    },
  },
};
</script>

<style scoped>
.modal-content {
  width: 600px;
  height: 470px;
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
.entity-property {
  font-weight: 500;
  font-size: 1.1em;
  margin-top: 10px;
}
.modal-buttons {
  display: inline-block;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
button {
  width: fit-content;
  /* width: 110px; */
  padding: 10px;
  height: 35px;
  margin: 10px;
  background-color: #269eef;
  border: 1px solid #269eef;
  border-radius: 5px;
  color: white;
  font-weight: 500;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
/* (modal-content -  modal-keys)  / 2 - margin */
.modal-keys {
  width: 550px;
  height: 250px;
  margin-left: 25px;
  /* border: none; */
}
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-weight: bold;
  background: white;
  border: 1px solid #dddddd;
  padding: 5px;
}
table td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 5px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: lightblue;
  cursor: pointer;
}
</style>
