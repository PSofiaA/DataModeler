<template>
  <line v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"></line>
</template>

<script>
export default {
  name: "EntityRelation",
  props: {
    parentEntityIndex: {
      type: Number,
    },
    childEntityIndex: {
      type: Number,
    },
    x1: { type: Number },
    x2: { type: Number },
    y1: { type: Number },
    y2: { type: Number },
  },
};
</script>

<style scoped>
line {
  stroke: black;
}
</style>
