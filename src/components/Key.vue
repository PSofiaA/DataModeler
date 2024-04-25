<template>
  <text>{{ keyName }}</text>
</template>

<script>
export default {
  name: "EntityKey",
  props: {
    keyID: {
      type: Number,
    },
    keyName: {
      type: String,
    },
    // isPrimary: {
    //     type: Boolean
    // },
    // dataType,
    // isUnique:{
    //     type:Boolean
    // },
    // isNULL: {
    //     type:Boolean
    //},
  },
};
</script>

<style scoped></style>
