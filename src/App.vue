<template>
  <div class="project-main">
    <img src="./assets/project-icon.png" />
    <input
      class="project-name"
      placeholder="Диаграмма без названия"
      type="text"
    />
  </div>
  <the-navbar></the-navbar>
  <the-canvas></the-canvas>
  <sidebar-box :leftSidebarOpen="true">
    <the-table-sidebar></the-table-sidebar
  ></sidebar-box>
</template>

<script>
import TheCanvas from "./components/TheCanvas.vue";
import TheNavbar from "./components/TheNavbar.vue";
import TheTableSidebar from "./components/TheTableSidebar.vue";

export default {
  components: {
    TheCanvas,
    TheNavbar,
    TheTableSidebar,
  },
  data() {
    return {
      projectTitle: "",
    };
  },
};
</script>

<style scoped>
.project-main {
  display: flex;
  text-align: left;
  height: 45px;
  background-color: #f0ebf2;
  border-bottom: rgb(192, 186, 186) solid 1px;
  white-space: nowrap;
  /* box-shadow: inset 0 -5px 1 0 cornflowerblue; f1eaf5 */
}
img {
  margin: 8px;
}
.project-name {
  font-size: 20px;
  width: 100%;
  border: none;
  background-color: transparent;
  outline-width: 0;
  padding: 10px 15px;
  letter-spacing: 2px;
}
</style>
