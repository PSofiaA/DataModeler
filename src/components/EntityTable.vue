<template>
  <rect
    class="entity-table"
    v-bind="{ x: coordinates.x, y: coordinates.y }"
    @mousedown="dragEntity"
    @mouseup="dropEntity"
  >
  </rect>
  <line
    class="svg-entity-header-line"
    v-bind="{
      x1: coordinates.x,
      y1: coordinates.y + 30,
      x2: coordinates.x + 150,
      y2: coordinates.y + 30,
    }"
  />
  <text
    class="svg-entity-name"
    v-bind="{
      x: coordinates.x + 50,
      y: coordinates.y - 2,
    }"
  >
    {{ this.name }}
  </text>
</template>

<script>
export default {
  name: "EntityTable",
  data() {
    return {
      id: 0,
      name: "Entity",
      coordinates: {
        x: 400,
        y: 200,
      },
    };
  },
  methods: {
    dragEntity() {
      console.log("move");
      document.addEventListener(
        "mousemove",
        this.moveEntity
      );
    },
    moveEntity(event) {
      console.log("move");
      this.coordinates.x =
        this.coordinates.x + event.movementX;
      this.coordinates.y =
        this.coordinates.y + event.movementY;
    },
    dropEntity() {
      document.removeEventListener(
        "mousemove",
        this.moveEntity
      );
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

.svg-entity-header-line {
  stroke-width: 0.6;
  stroke: black;
}
</style>
