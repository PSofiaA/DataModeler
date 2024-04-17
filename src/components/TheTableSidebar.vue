<template>
  <div id="sidebar-entity-input">
    <div class="sidebar-text-element">Имя сущности</div>
    <input-box
      v-model="this.name"
      placeholder="Entity name"
    />
    <!-- <div class="sidebar-text-element">Ключи</div>
    <input class="input" /> -->
  </div>
</template>

<script>
export default {
  name: "TheTableSidebar",
  data() {
    return {
      name: "",
    };
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
</style>
