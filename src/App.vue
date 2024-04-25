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
      <button @click="showModal">
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

      <button id="create-relationship" @click="showRelationshipSidebar">
        <img src=".\assets\rel-icon.png" />
      </button>
      <button id="view-grid">
        <img src=".\assets\view-icon.png" />
      </button>
    </div>
  </div>
  <sidebar-box :leftSidebarOpen="this.isCreatingTable">
    <the-table-sidebar @createEntity="createEntity"></the-table-sidebar
  ></sidebar-box>
  <svg
    class="canvas"
    v-on:mousemove="moveOnCanvas"
    v-on:mouseup="dropEntity"
    v-on:mouseleave="dropEntity"
  >
    <entity-list
      @tableDown="pickEntity"
      @tableUp="dropEntity"
      @tableEdit="showModal"
      :tables="tables"
    ></entity-list>
  </svg>

  <edit-box v-model:show="isModalOpen">
    <entity-edit-form
      :entity="pickedEntity"
      @editEntity="editEntity"
    ></entity-edit-form>
  </edit-box>
</template>

<script>
import EntityList from "./components/TheEntityList.vue";
import TheTableSidebar from "./components/TheTableSidebar.vue";
import EntityEditForm from "./components/EntityEditForm.vue";
import EditBox from "./components/UI/EditBox.vue";

export default {
  components: {
    TheTableSidebar,
    EntityEditForm,
    EntityList,
    EditBox,
  },
  data() {
    return {
      projectTitle: "",
      pickedEntity: {},
      pickedParentTable: 0,
      pickedChildTable: 0,
      isCreatingTable: false,
      isCreatingRelationship: false,
      isModalOpen: false,
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
        {
          tableID: 12,
          name: "table3",
          x: 440,
          y: 489,
        },
      ],
    };
  },
  methods: {
    showTableSidebar() {
      this.isCreatingTable = !this.isCreatingTable;
    },
    showRelationshipSidebar() {
      this.isCreatingRelationship = !this.isCreatingRelationship;
    },
    showModal(tableID) {
      this.pickedParentTable = this.tables
        .map(function (e) {
          return e.tableID;
        })
        .indexOf(tableID);
      this.pickedEntity = this.tables[this.pickedParentTable];
      this.isModalOpen = true;
    },
    editEntity(editedEntity) {
      const index = this.tables.findIndex(
        (x) => editedEntity.tableID === x.tableID
      ); // find index
      this.tables[index] = editedEntity;
      this.isModalOpen = false;
    },
    createEntity(table) {
      this.tables.push(table);
      this.isCreatingTable = false;
    },
    pickEntity(tableID) {
      if (!this.isCreatingRelationship)
        this.pickedParentTable = this.tables
          .map(function (e) {
            return e.tableID;
          })
          .indexOf(tableID);
      console.log(this.pickedParentTable);
    },
    moveOnCanvas(event) {
      if (
        this.pickedParentTable != null &&
        this.isCreatingRelationship != true
      ) {
        this.moveEntity(event);
      } else if (
        this.pickedParentTable != null &&
        this.isCreatingRelationship == true
      ) {
        this.drawRelation(event);
      }
    },
    moveEntity(event) {
      if (
        this.pickedParentTable != null &&
        this.isCreatingRelationship != true
      ) {
        this.tables[this.pickedParentTable].x =
          this.tables[this.pickedParentTable].x + event.movementX;
        this.tables[this.pickedParentTable].y =
          this.tables[this.pickedParentTable].y + event.movementY;
      }
    },
    dropEntity() {
      this.pickedParentTable = null;
    },
    drawRelation(event) {
      let centerXP = this.tables[this.pickedParentTable].x + 100;
      let centerYP = this.tables[this.pickedParentTable].y + 150;

      if (this.pickedChildTable != null) {
        console.log(here);
        this.tables[this.pickedParentTable].childTables.push(
          this.tables[this.pickedChildTable].tableID
        );
      }
    },
    calcDistance(distX, distY, centerX, centerY, width, height) {
      width = width / 2;
      height = height / 2;
      if (Math.abs(distY / distX) < height / width) {
        return [
          centerX + (distX > 0 ? width : -width),
          centerY + (distY * width) / Math.abs(distX),
        ];
      } else {
        return [
          centerX + (distX * height) / Math.abs(distY),
          centerY + (distY > 0 ? height : -height),
        ];
      }
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
