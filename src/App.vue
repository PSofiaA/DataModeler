<template>
  <div class="project-main">
    <img src="./assets/project-icon.png" />
    <input
      class="project-name"
      placeholder="Диаграмма без названия"
      type="text"
    />
  </div>
  <div class="navbar-container-buttons">
    <div class="navbar-load">
      <button>
        <img src=".\assets\upload-icon.png" />
      </button>
      <button>
        <img src=".\assets\download-icon.png" />
      </button>
    </div>

    <div class="navbar-operations">
      <button id="create-table" @click="showTableSidebar">
        <img src=".\assets\table-icon.png" />
      </button>

      <button
        id="create-relationship"
        @click="showRelationshipSidebar"
      >
        <img src=".\assets\rel-icon.png" />
      </button>
      <button id="view-grid">
        <img src=".\assets\view-icon.png" />
      </button>
    </div>
  </div>
  <sidebar-box :leftSidebarOpen="this.isCreatingTable">
    <the-table-sidebar
      @createEntity="createEntity"
    ></the-table-sidebar
  ></sidebar-box>
  <svg
    class="canvas"
    v-on:mousemove="moveEntity"
    v-on:mouseup="dropEntity"
    v-on:mouseleave="dropEntity"
  >
    <entity-list
      @movingEntity="pickEntity"
      @stopMovingEntity="dropEntity"
      :tables="tables"
    ></entity-list>
  </svg>
</template>

<script>
import EntityList from "./components/TheEntityList.vue";
import TheTableSidebar from "./components/TheTableSidebar.vue";
export default {
  components: {
    TheTableSidebar,
    EntityList,
  },
  data() {
    return {
      projectTitle: "",
      isMovingTable: null,
      isCreatingTable: false,
      isCreatingRelationship: false,
      tables: [
        {
          tableID: 10,
          name: "table",
          x: 350,
          y: 289,
        },
        {
          tableID: 11,
          name: "table2",
          x: 270,
          y: 389,
        },
      ],
    };
  },
  methods: {
    showTableSidebar() {
      this.isCreatingTable = !this.isCreatingTable;
    },
    showRelationshipSidebar() {
      this.isCreatingRelationship =
        !this.isCreatingRelationship;
    },
    createEntity(table) {
      this.tables.push(table);
    },
    pickEntity(tableID) {
      this.isMovingTable = this.tables
        .map(function (e) {
          return e.tableID;
        })
        .indexOf(tableID);
      console.log(
        "moving index in array",
        this.isMovingTable
      );
    },
    moveEntity(event) {
      if (this.isMovingTable != null) {
        this.tables[this.isMovingTable].x =
          this.tables[this.isMovingTable].x +
          event.movementX;
        this.tables[this.isMovingTable].y =
          this.tables[this.isMovingTable].y +
          event.movementY;
      }
    },
    dropEntity() {
      this.isMovingTable = null;
    },
  },
};
</script>

<style scoped>
.project-main {
  display: flex;
  text-align: left;
  height: 45px;
  background-color: #f0ebf2;
  border-bottom: rgb(192, 186, 186) solid 1px;
  white-space: nowrap;
}

.project-name {
  font-size: 20px;
  width: 100%;
  border: none;
  background-color: transparent;
  outline-width: 0;
  padding: 10px 15px;
  letter-spacing: 2px;
}
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
  margin: 8px;
  height: 80%;
  opacity: 0.8;
}
.canvas {
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  background-color: cadetblue;
}
</style>
