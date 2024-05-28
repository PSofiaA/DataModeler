<template>
  <!-- @click="hideDialog" -->
  <!-- @click.stop -->
  <div class="edit" v-if="show">
    <div class="edit-content">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditBox",

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.edit {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  position: fixed;
  display: flex;
  z-index: 2;
}

.edit-content {
  position: relative;
  margin: auto;
  background: white;
  border: 1px solid var(--button-border-color);
  border-radius: 10px;
}
</style>
