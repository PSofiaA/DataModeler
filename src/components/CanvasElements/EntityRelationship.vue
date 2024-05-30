<template>
  <line
    v-if="type != 'Recursive'"
    class="stroke"
    @mousedown="lineClicked"
    v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"
  ></line>
  <line
    v-if="type != 'Recursive'"
    id="line1"
    @mousedown="lineClicked"
    :class="type"
    v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"
  ></line>
  <g v-if="type == 'Recursive'" @mousedown="lineClicked" class="Recursive">
    <line v-bind="{ x1: x1, y1: y1, x2: x1, y2: y1 - 30 }"> </line>
    <line v-bind="{ x1: x1, y1: y1 - 30, x2: x1 + 125, y2: y1 - 30 }"> </line>
    <line v-bind="{ x1: x1 + 125, y1: y1 - 30, x2: x1 + 125, y2: y1 + 50 }">
    </line>
    <line v-bind="{ x1: x1 + 125, y1: y1 + 50, x2: x2, y2: y2 }"> </line>
  </g>

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
    relationshipID: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    x1: {
      type: Number,
      required: true,
    },
    y1: {
      type: Number,
      required: true,
    },
    x2: {
      type: Number,
      required: true,
    },
    y2: {
      type: Number,
      required: true,
    },
    parentTable: {
      type: Number,
      required: true,
    },
    childTable: {
      type: Number,
      required: true,
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
      if (type.includes("Optional") || type.includes("Recursive")) return true;
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

.Recursive {
  stroke-dasharray: 10;
}
rect {
  transform-origin: center;
  transform-box: fill-box;
}
</style>
