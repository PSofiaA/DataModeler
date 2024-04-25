<template>
  <form @submit.prevent>
    <h4>Редактирование сущности</h4>
    <input-box v-model="editedEntity.name"> </input-box>
    <button @click="editEntity">ОК</button>
  </form>
</template>

<script>
export default {
  name: "EntityEditForm",
  emits: ["editEntity"],
  data() {
    return {
      editedEntity: { ...this.entity },
    };
  },
  props: { entity: { type: Object } },
  methods: {
    editEntity() {
      this.$emit("editEntity", this.editedEntity);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
