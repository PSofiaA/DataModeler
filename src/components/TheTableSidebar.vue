<template>
  <div id="sidebar-entity-input">
    <div class="sidebar-text-element">Имя сущности</div>
    <input class="input" />
    <div class="sidebar-text-element">Ключи</div>
    <input class="input" />
  </div>
</template>

<script>
export default { name: "TheTableSidebar" };
</script>

<style scoped>
.sidebar-text-element {
  padding: 10px;
}
.input {
  margin: auto;
  display: block;
  height: var(--sidebar-input-height);
  width: calc(var(--sidebar-left-width) - 20px);
  background-color: var(--sidebar-input-color);
  border: 1px solid var(--button-border-color);
  border-radius: var(--input-border-radius);
}
</style>
