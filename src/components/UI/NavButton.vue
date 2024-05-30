<template>
  <button type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "NavButton",
};
</script>

<style scoped>
button {
  padding: 9px, 25px;
  color: #ecf0f1;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease 0s;
}
button:hover {
  height: 40px;
  border-radius: 40px;
  background-color: rgba(0, 136, 169, 0.8);
}
.button-text {
  margin: 5px;
}
</style>
