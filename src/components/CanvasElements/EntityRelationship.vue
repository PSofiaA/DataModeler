<template>
  <line
    class="stroke"
    @mousedown="lineClicked"
    v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"
  ></line>
  <line
    id="line1"
    @mousedown="lineClicked"
    :class="type"
    v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"
  ></line>

  <circle r="5" v-bind="{ cx: x2, cy: y2 }" />
  <circle r="5" v-if="checkM2M(type)" v-bind="{ cx: x1, cy: y1 }" />

  <rect
    v-bind="{
      x: x1 - 4,
      y: y1 - 4,
    }"
    v-if="checkOptional(type)"
    transform="rotate(45)"
    width="8"
    height="8"
    stroke="black"
    fill="white"
    stroke-width="2"
  />
</template>

<script>
export default {
  name: "EntityRelationship",
  emits: ["relationshipClicked"],
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
  methods: {
    lineClicked(event) {
      console.log(event.target);
      this.$emit("relationshipClicked");
    },
    checkM2M(type) {
      if (type.includes("M2M")) return true;
      else return false;
    },
    checkOptional(type) {
      if (type.includes("Optional")) return true;
      else return false;
    },
  },
};
</script>

<style scoped>
line {
  stroke-width: 1.6;
  stroke: black;
}
svg line:hover {
  cursor: pointer;
}
.stroke {
  stroke-width: 7;
  stroke-opacity: 0;
}
.Identifying {
  stroke-dasharray: 0;
}
.NonIdentifying {
  stroke-dasharray: 10;
}
rect {
  transform-origin: center;
  transform-box: fill-box;
}
</style>
