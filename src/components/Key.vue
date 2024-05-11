<template>
  <text>{{ keyName }}</text>
</template>

<script>
export default {
  name: "EntityKey",
  props: {
    keyID: {
      type: Number,
    },
    keyName: {
      type: String,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    dataType,
    isUnique: {
      type: Boolean,
      default: false,
    },
    isNotNULL: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
