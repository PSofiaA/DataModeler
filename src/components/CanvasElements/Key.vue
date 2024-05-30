<template>
  <text>{{ keyName }}</text>
</template>

<script>
export default {
  name: "EntityKey",
  props: {
    keyID: {
      type: String,
      required: true,
    },
    keyName: {
      type: String,
      required: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
      required: true,
    },
    dataType: {
      type: String,
      required: true,
    },
    isUnique: {
      type: Boolean,
      default: false,
      required: true,
    },
    isNotNULL: {
      type: Boolean,
      default: false,
      required: true,
    },
    isForeign: {
      type: Boolean,
      default: false,
      required: true,
    },
    foreignEntity: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style scoped></style>
