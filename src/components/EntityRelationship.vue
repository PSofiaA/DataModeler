<template>
  <line
    class="stroke"
    @mousedown="lineClicked"
    v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"
  ></line>
  <line
    id="line1"
    @mousedown="lineClicked"
    v-bind="{ x1: x1, y1: y1, x2: x2, y2: y2 }"
  ></line>
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
      // if (event.target.classList.contains("line")) {
      //   console.log(event.target.href);
      // }
      this.$emit("relationshipClicked");
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
  /* stroke: black; */
}
</style>
