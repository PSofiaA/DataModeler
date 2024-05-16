<template>
  <rect
    @dblclick="this.$emit('tableEdit')"
    @mousedown="this.$emit('tableDown')"
    @mouseup="pick"
    id="entity"
    class="entity-table"
    v-bind="{ x: x, y: y }"
  >
  </rect>
  <text
    class="svg-entity-name"
    v-if="keys.length != 0"
    v-bind="{
      x: x + 10,
      y: y - 5,
    }"
    font-weight="600"
  >
    {{ name }}
  </text>
  <!--  v-bind="{
      x: x + 50,
      y: y + 55,
    }" -->
  <text
    v-else
    class="svg-entity-name"
    dominant-baseline="middle"
    text-anchor="middle"
    v-bind="{
      x: x + 75,
      y: y + 50,
    }"
    font-weight="600"
  >
    {{ name }}
  </text>

  <text
    v-for="(entityKey, index) in filteredPKs"
    v-bind="{ x: x + 13, y: y + 15 * (1 + index) + 5 }"
    font-size="15"
    font-weight="600"
    fill="black"
    >{{ this.showModifiers(entityKey) }}
  </text>
  <line
    class="svg-entity-header-line"
    v-if="filteredPKs.length != 0"
    v-bind="{
      x1: x + 10,
      y1: y + filteredPKs.length * 16 + 10,
      x2: x + 130,
      y2: y + filteredPKs.length * 16 + 10,
    }"
  />
  <text
    v-for="(entityKey, index) in filteredRKs"
    v-bind="{
      x: x + 13,
      y: y + filteredPKs.length * 15 + 15 + 15 * (1 + index),
    }"
    font-size="15"
    font-weight="500"
    fill="black"
    >{{ this.showModifiers(entityKey) }}
  </text>
  <!-- <line
    class="svg-entity-header-line"
    v-bind="{
      x1: x + 10,
      y1: y + 30,
      x2: x + 130,
      y2: y + 30,
    }"
  /> -->
  <text> </text>
</template>

<script>
export default {
  name: "EntityTable",
  emits: ["tableDown", "tableUp", "tableEdit"],
  data() {
    return {
      offsetPK: 25,
      offsetRK: 30,
    };
  },
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

    keys: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    parentTables: {
      type: Array,
      default: () => [],
    },
    childTables: {
      type: Array,
      default: () => [],
    },
    styleType: {
      default: 0,
    },
  },
  computed: {
    filteredPKs() {
      // console.log("pk", this.keys);
      return this.keys.filter((d) => d.isPrimary == true);
    },
    filteredRKs() {
      // console.log("rk", this.keys);
      return this.keys.filter((d) => d.isPrimary == false);
    },
  },
  methods: {
    showModifiers(entityKey) {
      if (entityKey.isUnique) {
        return entityKey.name + "(AK)";
      } else {
        return entityKey.name;
      }
    },
    pick(event) {
      this.$emit("tableUp");
    },
  },
};
</script>

<style scoped>
rect {
  z-index: 1;
  width: 150px;
  height: 100px;
  fill: white;
  stroke: black;
  cursor: move;
  rx: v-bind (styleType);
}
.svg-entity-name {
  color: black;
}
.svg-entity-header-line {
  stroke-width: 0.6;
  stroke: black;
}
rect:hover {
  filter: drop-shadow(0 0 0.4rem rgba(76, 74, 74, 0.358));
}
/* .picked {
  stroke-width: 1;
  stroke: red;
} */
</style>
