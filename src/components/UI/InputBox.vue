<template>
  <input :value="modelValue" @input="updateInput" type="text" />
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
  width: 200px;
  margin-right: 5px;
  margin-top: 10px;
  border-radius: 5px;
  height: 35px;
  border: 1px solid var(--button-border-color);
  padding: 0px 15px 0px;
  letter-spacing: 1px;
}

input:focus {
  outline: 1.7px solid rgba(0, 136, 169, 0.9);
}
</style>
