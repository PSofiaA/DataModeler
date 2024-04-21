<template>
  <!--  @mousedown="dragEntity"
    @mouseup="dropEntity" -->
  <rect
    @mousedown="this.$emit('movingEntity')"
    @mouseup="this.$emit('stopMovingEntity')"
    class="entity-table"
    v-bind="{ x: x, y: y }"
  >
  </rect>
  <line
    class="svg-entity-header-line"
    v-bind="{
      x1: x,
      y1: y + 30,
      x2: x + 150,
      y2: y + 30,
    }"
  />
  <text
    class="svg-entity-name"
    v-bind="{
      x: x + 20,
      y: y - 2,
    }"
  >
    {{ name }}
  </text>
</template>

<script>
export default {
  name: "EntityTable",
  emits: ["movingEntity", "stopMovingEntity"],
  props: {
    tableID: {
      type: Number,
    },
    name: {
      type: String,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
};
</script>

<style scoped>
rect {
  width: 150px;
  height: 100px;
  fill: white;
  stroke: black;
  cursor: move;
}
rect.moving {
  stroke: blue;
}
.svg-entity-name {
  color: black;
}
.svg-entity-header-line {
  stroke-width: 0.6;
  stroke: black;
}
</style>
