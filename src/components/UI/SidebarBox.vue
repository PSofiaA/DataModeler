<template>
  <!-- v-show="leftSidebarOpen" -->
  <div
    class="sidebar-left"
    v-show="leftSidebarOpen"
    @click="hideSidebar"
  >
    <!-- <div class="sidebar-content" @click.stop> -->
    <slot> </slot>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "SidebarBox",
  props: {
    leftSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideSidebar() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.sidebar-left {
  overflow: hidden;
  position: absolute;
  top: 85px;
  left: 0;
  z-index: 2;
  width: var(--sidebar-left-width);
  height: 100vh;
  background-color: #e7e3dd;
  border-right: rgb(192, 186, 186) solid 2px;
  /* transition: max-height 0.5s, overflow 0s; */
}
</style>
