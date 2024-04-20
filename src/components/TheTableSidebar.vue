<template>
  <div id="sidebar-entity-input">
    <div class="sidebar-text-element">Имя сущности</div>
    <input-box
      v-model="this.name"
      placeholder="Entity name"
    />
    <div class="submit-buttons">
      <button>Создать</button>
    </div>
    <!-- <div class="sidebar-text-element">Ключи</div>
    <input class="input" /> -->
  </div>
</template>

<script>
export default {
  name: "TheTableSidebar",
  data() {
    return {
      entity: {
        name: "",
      },
    };
  },
  methods: {
    createEntity() {
      this.post.id = Date.now();
      this.$emit("createEntity", this.entity);
      this.entity = {
        name: "",
      };
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
