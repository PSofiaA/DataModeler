<template>
  <div class="edit" v-if="show" @click="hideDialog">
    <div class="edit-content" @click.stop>
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
  margin: auto;
  padding: 10px;
  background: white;
  border-radius: 5px;
  min-height: 500px;
  min-width: 600px;
}
</style>
