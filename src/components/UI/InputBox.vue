<template>
  <input class="input" type="text" />
</template>

<script>
export default {
  name: "InputBox",
};
</script>

<style scoped>
.box-input {
  margin: auto;
  display: block;
  height: var(--sidebar-input-height);
  width: calc(var(--sidebar-left-width) - 20px);
  background-color: var(--sidebar-input-color);
  border: 1px solid var(--button-border-color);
  border-radius: var(--input-border-radius);
}
</style>
