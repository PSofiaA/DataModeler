<template>
  <line v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"></line>
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
    x1: {
      type: Number,
    },
    y1: {
      type: Number,
    },
    x2: {
      type: Number,
    },
    y2: {
      type: Number,
    },
  },
};
</script>

<style scoped>
line {
  stroke-width: 1.1;
  stroke: black;
}
</style>
