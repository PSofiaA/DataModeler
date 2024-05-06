<template>
  <div class="modal-content">
    <form @submit.prevent>
      <div class="modal-topbar">
        <img src="../assets/project-icon.png" />
        <div class="modal-title">Редактировать сущность</div>
      </div>

      <div class="edit-name">
        <div>Имя сущности:</div>
        <input v-model="editedEntity.name" />
      </div>

      <button @click="editEntity">ОК</button>
      <button @click="openKeyModal">Добавить ключ</button>
    </form>
    <div class="modal-keys">
      <table>
        <tr style="background-color: #e7e3dd">
          <th>PK</th>
          <th>Имя</th>
          <th>Тип данных</th>
          <th>NOT NULL</th>
          <th>UNIQUE</th>
        </tr>
        <tr v-for="key in entity.keys" :key="key.keyID">
          <td>{{ key.isPrimary }}</td>
          <td>{{ key.name }}</td>
          <td>{{ key.dataType }}</td>
          <td>{{ key.isNULL }}</td>
          <td>{{ key.isUnique }}</td>
        </tr>
      </table>
    </div>
    <edit-box v-model:show="isKeyModalOpen"><key-form></key-form></edit-box>
  </div>
</template>

<script>
import KeyForm from "./KeyForm.vue";
export default {
  components: {
    KeyForm,
  },
  name: "EntityEditForm",
  emits: ["editEntity"],
  data() {
    return {
      isKeyModalOpen: false,
      editedEntity: { ...this.entity },
    };
  },
  props: { entity: { type: Object } },
  methods: {
    editEntity() {
      this.$emit("editEntity", this.editedEntity);
    },
    openKeyModal() {
      this.isKeyModalOpen = true;
    },
  },
};
</script>

<style scoped>
.modal-content {
  width: 600px;
  height: 500px;
}
.modal-topbar {
  height: 30px;
  color: black;
  background-color: #e7e3dd;
  border-radius: 4px 4px 0px 0px;
  display: flex;
}
.modal-title {
  padding: 2px 3px 2px;
  font-size: 1.2em;
  letter-spacing: 0;
}
.edit-name {
  margin-left: 35px;
  padding: 3px;
}
input {
  font-size: 15px;
  width: 30%;
  border: 1px solid var(--button-border-color);
  background-color: transparent;
  outline-width: 0;
  padding: 3px;
  margin-top: 3px;
  margin-bottom: 10px;
}
img {
  padding: 3px 3px 2px;
  height: 90%;
  opacity: 0.8;
}
/* button {
  position: absolute;
  bottom: 20px;
  right: 20px;
} */
.modal-keys {
  width: 100%;
  height: 350px;
  border: 1px solid var(--button-border-color);
}
table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  /* border-collapse: collapse; */
}
.table th {
  font-weight: bold;
  background: #efefef;
  border: 1px solid #dddddd;
  padding: 2px;
}
.table td {
  border: 1px solid #dddddd;
  padding: 5px;
}
</style>
