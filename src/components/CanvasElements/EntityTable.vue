<template>
  <rect
    @dblclick="this.$emit('tableEdit')"
    @mousedown="this.$emit('tableDown')"
    @mouseup="this.$emit('tableUp')"
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
  <text
    v-else
    class="svg-entity-name"
    dominant-baseline="middle"
    text-anchor="middle"
    v-bind="{
      x: x + 95,
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
      x2: x + 180,
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
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    keys: {
      type: Array,
      default: () => [],
      required: true,
    },
    styleType: {
      default: 0,
      required: true,
    },
  },
  computed: {
    filteredPKs() {
      return this.keys.filter((d) => d.isPrimary == true);
    },
    filteredRKs() {
      return this.keys.filter((d) => d.isPrimary == false);
    },
  },
  methods: {
    showModifiers(entityKey) {
      if (entityKey.isUnique) {
        return entityKey.name + "(AK)";
      } else if (entityKey.isForeign) {
        return entityKey.name + "(FK)";
      } else {
        return entityKey.name;
      }
    },
  },
};
</script>

<style scoped>
rect {
  overflow: hidden;
  stroke-width: 1.6;
  width: 190px;
  height: 100px;
  fill: white;
  stroke: black;
  cursor: move;
  border-radius: 5px;
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
text {
  word-wrap: inherit;
}
line {
  stroke-width: 1.6;
  stroke: black;
}
</style>
