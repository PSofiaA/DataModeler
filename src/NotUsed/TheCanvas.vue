<template>
  <!-- <div class="canvas-container"> </div> -->
  <svg class="canvas">
    <entity-list></entity-list>
    <!-- <entity-table></entity-table>
    <entity-table></entity-table>
    <entity-table></entity-table> -->
  </svg>
</template>

<script>
import EntityTable from "./EntityTable.vue";
import EntityList from "./TheEntityList.vue";
export default {
  components: {
    EntityTable,
    EntityList,
  },
  props: {},
  name: "TheCanvas",
  data() {
    return {};
  },
};
</script>

<style scoped>
/* .canvas-container {

  height: 100vh;
  background-color: cadetblue;
} */
.canvas {
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  background-color: cadetblue;
}
</style>
