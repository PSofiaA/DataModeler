<template>
  <button type="button" class="btn-close">
    <i class="fa-solid fa-x"></i>
  </button>
</template>

<script>
export default {
  name: "CloseButton",
};
</script>

<style scoped>
.btn-close {
  position: absolute;
  top: 8px;
  right: 10px;
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 13px;
  background-color: rgba(0, 136, 169, 0.8);
  color: white;
  border-radius: 54%;
  width: 25px;
  height: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  &:hover {
    background: hsl(0, 90%, 46%);
    cursor: pointer;
    color: white;
    -webkit-transition: background-color 10ms linear;
    -ms-transition: background-color 10ms linear;
    transition: all 0.3s ease 0s;
  }
}
</style>
