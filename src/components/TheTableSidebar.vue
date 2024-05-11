<template>
  <div id="sidebar-entity-input">
    <div class="sidebar-text-element">Имя сущности</div>
    <input-box v-model="entity.name" placeholder="Введите имя сущности" />
    <div class="submit-button">
      <button @click="createEntity">Создать</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTableSidebar",
  emits: ["createEntity"],
  data() {
    return {
      currentID: 1,
      entity: {
        name: "",
        keys: [],
      },
    };
  },
  methods: {
    createEntity() {
      this.entity.tableID = this.currentID;
      this.entity.x = 450;
      this.entity.y = 450;
      this.$emit("createEntity", this.entity);
      this.entity = {
        name: "",
      };
      this.currentID += 1;
    },
  },
};
</script>

<style scoped>
#sidebar-entity-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebar-text-element {
  padding: 10px 0px;
}
button {
  margin: 10px;
  width: auto;
  height: 20px;
}
</style>
