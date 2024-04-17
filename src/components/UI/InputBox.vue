<template>
  <input
    :value="modelValue"
    @input="updateInput"
    type="text"
  />
</template>

<script>
export default {
  name: "InputBox",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
input {
  /* margin: 10px; */
  padding-left: 20px;
  display: block;
  height: var(--sidebar-input-height);
  width: calc(var(--sidebar-left-width) - 20px);
  background-color: var(--sidebar-input-color);
  border: 1px solid var(--button-border-color);
}
</style>
