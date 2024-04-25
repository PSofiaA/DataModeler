<template>
  <entity-key
    v-for="(key, keyID) in entityKeys"
    :keyName="key.keyName"
    :keyID="key.keyID"
  >
  </entity-key>
</template>

<script>
import EntityKey from "@/components/Key.vue";
export default {
  name: "KeyList",
  components: {
    EntityKey,
  },
  props: {},
};
</script>

<style scoped></style>
