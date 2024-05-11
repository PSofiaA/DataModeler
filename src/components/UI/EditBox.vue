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
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.edit-content {
  position: relative;
  margin: auto;
  background: white;
  border-radius: 10px;
}
</style>
