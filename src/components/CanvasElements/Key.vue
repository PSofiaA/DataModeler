<template>
  <text>{{ keyName }}</text>
</template>

<script>
export default {
  name: "EntityKey",
  props: {
    keyID: {
      type: String,
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
    isForeign: {
      type: Boolean,
      default: false,
    },
    foreignEntity: {
      type: Number,
    },
  },
};
</script>

<style scoped></style>
