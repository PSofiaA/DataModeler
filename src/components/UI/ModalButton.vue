<template>
  <button type="button" class="btn-close">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ModalButton",
};
</script>

<style scoped>
button {
  width: fit-content;
  padding: 7px;
  height: 30px;
  margin: 10px;
  background-color: rgba(0, 136, 169, 0.8);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;
}
button:hover {
  background-color: rgba(0, 136, 169, 1);
  cursor: pointer;
}
</style>
