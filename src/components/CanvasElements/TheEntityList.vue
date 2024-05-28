<template>
  <entity-table
    @tableDown="this.$emit('tableDown', table.tableID)"
    @tableUp="this.$emit('tableUp', table.tableID)"
    @tableEdit="this.$emit('tableEdit', table.tableID)"
    v-for="(table, tableID) in tables"
    :name="table.name"
    :tableID="table.tableID"
    :x="table.x"
    :y="table.y"
    :childTables="table.childTables"
    :parentTables="table.parentTables"
    :styleType="table.styleType"
    :keys="table.keys"
  ></entity-table>
</template>

<script>
import EntityTable from "@/components/CanvasElements/EntityTable.vue";
export default {
  name: "EntityList",
  emits: ["tableUp", "tableDown", "tableEdit"],
  components: {
    EntityTable,
  },
  props: {
    tables: {
      type: Array,
    },
  },
  methods: {},
};
</script>

<style scoped></style>
