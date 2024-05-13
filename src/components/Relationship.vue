<template>
  <line></line>
</template>

<script>
export default {
  name: "EntityRelationship",
  props: {
    parentTable: {
      type: Number,
      required: true,
    },
    childTable: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
