<template>
  <!-- v-show="leftSidebarOpen" -->
  <div
    class="sidebar-left"
    v-show="leftSidebarOpen"
    @click="hideSidebar"
  >
    <div class="sidebar-content" @click.stop>
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarBox",
  props: {
    leftSidebarOpen: Boolean,
    default: false,
  },
  methods: {
    methods: {
      hideSidebar() {
        this.$emit("update:show", false);
      },
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
  background-color: var(--sidebar-color);
}
</style>
