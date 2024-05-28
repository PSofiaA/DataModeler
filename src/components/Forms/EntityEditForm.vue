<template>
  <div class="modal-content">
    <div class="modal-title">Редактировать сущность</div>
    <hr />
    <form @submit.prevent="handleSubmit">
      <div class="entity-property">Имя сущности:</div>
      <input-box v-model="editedEntity.name" />
      <div class="modal-buttons-container">
        <modal-button type="button" @click="keyModalCreate">
          Добавить ключ
        </modal-button>
        <modal-button type="button" @click="deleteEntity">
          Удалить сущность
        </modal-button>
        <modal-button type="handleSubmit">ОК</modal-button>
      </div>
      <close-button class="close-button" @click="entityModalClose" type="button"
        >X</close-button
      >
    </form>
    <div class="modal-keys">
      <table>
        <tr style="background-color: #e7e3dd">
          <th style="width: 10%">PK</th>
          <th style="width: 15%">Имя</th>
          <th style="width: 10%">Тип данных</th>
          <th style="width: 10%">NOT NULL</th>
          <th style="width: 10%">UNIQUE</th>
          <th style="width: 10%" v-show="activeRow">Действие</th>
        </tr>
        <tr
          v-for="(entityKey, index) in entity.keys"
          :key="entityKey.keyID"
          @mouseover="activeRow = true"
          @mouseleave="activeRow = false"
        >
          <td v-if="entityKey.isPrimary == true">
            <i class="fa fa-key gold"></i>
          </td>
          <td v-else></td>
          <td>{{ entityKey.name }}</td>
          <td>{{ entityKey.dataType }}</td>
          <td v-if="entityKey.isNotNULL == true">
            <i class="fa fa-check"></i>
          </td>
          <td v-else><i class="fa fa-xmark"></i></td>
          <td v-if="entityKey.isUnique == true"><i class="fa fa-check"></i></td>
          <td v-else><i class="fa fa-xmark"></i></td>
          <td v-show="activeRow">
            <button
              type="button"
              class="action-button"
              id="edit"
              @click="keyModalEdit(entityKey, index)"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              type="button"
              class="action-button"
              id="delete"
              @click="deleteKey(index)"
            >
              <i class="fa fa-trash"></i>
            </button>
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
  emits: ["editEntity", "entityModalClose", "deleteEntity"],
  data() {
    return {
      activeRow: false,
      isKeyModalOpen: false,
      editKey: null,
      editedEntity: { ...this.entity },
    };
  },
  props: { entity: { type: Object } },
  methods: {
    handleSubmit() {
      this.$emit("editEntity", this.editedEntity);
    },
    deleteEntity() {
      this.$emit("deleteEntity", this.editedEntity);
    },
    entityModalClose(event) {
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
      // flag shows if this is already existed edited key or the new one
      if (flag) {
        let index = this.editedEntity.keys.findIndex(
          (x) => editedKey.keyID == x.keyID
        );
        this.editedEntity.keys[index] = editedKey;
      } else {
        editedKey.keyID =
          Date.now().toString(36) +
          Math.random().toString(36).substring(2, 12).padStart(12, 0);
        this.editedEntity.keys.push(editedKey);
      }
      this.isKeyModalOpen = false;
      this.editKey = null;
    },
    deleteKey(index) {
      this.editedEntity.keys.splice(index, 1);
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
.modal-buttons-container {
  display: inline-block;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.action-button {
  background: transparent;
  border: none;
  height: 15px;
}
.fa {
  font-size: 14px;
  color: #424242;
}
.fa-edit:hover {
  color: hsl(135, 69%, 35%);
}
.fa-trash:hover {
  color: hsl(0, 90%, 46%);
}
.white {
  color: #e7e3dd;
}
.action-button:hover {
  cursor: pointer;
}
.gold {
  color: #ffd700;
  text-shadow: 0 0 1px #000000aa;
}
/* (modal-content -  modal-keys)  / 2 - margin */
.modal-keys {
  width: 550px;
  height: 250px;
  margin-left: 25px;
}
table {
  width: 100%;
  overflow-y: auto;
  height: 250px;
  display: block;
  border-collapse: collapse;
}
table th {
  position: sticky;
  top: 0;
  font-weight: normal;
  background: white;
  height: 35px;
  background-color: rgba(0, 136, 169, 0.8);
  color: white;
  font-weight: 500;
  /* background-color: #269eef;
  color: white; */
  border: 1px solid #dddddd;
  padding: 5px;
}
table td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 5px;
}
tr {
  transition: all 0.3s ease 0s;
  width: min-content;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  font-weight: bold;
  background-color: rgba(0, 136, 169, 0.3);
  cursor: pointer;
}
</style>
