<template>
  <button type="button" class="btn-close">
    <span class="icon-cross"></span>
    <span>X</span>
  </button>
</template>

<script>
export default {
  name: "CloseButton",
};
</script>

<style scoped>
.btn-close {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 15px;
  /* font-weight: bold; */
  background-color: rgba(0, 136, 169, 0.8);
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: hsl(0, 90%, 46%);
    color: white;
    -webkit-transition: background-color 10ms linear;
    -ms-transition: background-color 10ms linear;
    transition: all 0.3s ease 0s;
  }
}
</style>
