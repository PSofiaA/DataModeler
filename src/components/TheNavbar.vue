<template>
  <div class="navbar-container-buttons">
    <div class="navbar-load">
      <button>
        <img src="..\assets\upload-icon.png" />
      </button>
      <button>
        <img src="..\assets\download-icon.png" />
      </button>
    </div>

    <div class="navbar-operations">
      <button id="create-table" @click="showTableSidebar">
        <img src="..\assets\table-icon.png" />
      </button>
      <button
        id="create-relationship"
        @click="showRelationshipSidebar"
      >
        <img src="..\assets\rel-icon.png" />
      </button>
      <button id="view-grid">
        <img src="..\assets\view-icon.png" />
      </button>
    </div>
  </div>
  <sidebar-box :leftSidebarOpen="this.isCreatingTable">
    <the-table-sidebar></the-table-sidebar
  ></sidebar-box>
</template>

<script>
import TheTableSidebar from "./TheTableSidebar.vue";
export default {
  components: {
    TheTableSidebar,
  },
  name: "TheNavbar",
  data() {
    return {
      isCreatingTable: false,
      isCreatingRelationship: false,
    };
  },
  methods: {
    showTableSidebar() {
      console.log("Creating Table");
      this.isCreatingTable = !this.isCreatingTable;
    },
    showRelationshipSidebar() {
      console.log("Creating Relationship");
      this.isCreatingRelationship =
        !this.isCreatingRelationship;
    },
    createEntity() {},
  },
};
</script>

<style scoped>
.navbar-container-buttons {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: #e7e3dd;
  height: 40px;
  border-bottom: rgb(192, 186, 186) solid 1px;
}
.navbar-load {
  margin: 0px 10px 0px;
}

button {
  height: 30px;
  background: none;
  border: none;
}

.navbar-operations {
  margin-left: 70px;
}

.navbar-operations > button {
  margin-right: 20px;
}
img {
  height: 80%;
  opacity: 0.8;
}
</style>
