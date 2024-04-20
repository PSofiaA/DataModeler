<template>
  <entity-table
    v-for="table in tables"
    :table="table"
    :key="table.id"
  ></entity-table>
</template>

<script>
import EntityTable from "@/components/EntityTable.vue";
export default {
  name: "EntityList",
  components: {
    EntityTable,
  },
  props: {
    tables: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>
