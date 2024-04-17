<template>
  <div class="canvas-container">
    <svg class="canvas"></svg>
  </div>
</template>

<script>
export default {
  name: "TheCanvas",
};
</script>

<style scoped>
.canvas-container {
  overflow-y: scroll;
  height: 100vh;
  background-color: cadetblue;
}
/* .canvas {
  width: 100vw;
} */
</style>
