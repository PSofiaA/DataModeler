<template>
  <entity-table
    @movingEntity="
      this.$emit('movingEntity', table.tableID)
    "
    @stopMovingEntity="
      this.$emit('stopMovingEntity', table.tableID)
    "
    v-for="(table, tableID) in tables"
    :name="table.name"
    :tableID="table.tableID"
    :x="table.x"
    :y="table.y"
  ></entity-table>
</template>

<script>
import EntityTable from "@/components/EntityTable.vue";
export default {
  name: "EntityList",
  emits: ["movingEntity", "stopMovingEntity"],
  components: {
    EntityTable,
  },
  props: {
    tables: {
      type: Array,
    },
  },
  methods: {
    pickEntity(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped></style>
