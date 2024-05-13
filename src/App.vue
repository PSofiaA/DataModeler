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

      <button id="create-relationship" @click="createRelationship">
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
    <g v-for="rel in this.relationships" id="connection">
      {{ drawRelationship(rel) }}
    </g>
    <!-- <line id="connection"></line> -->
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
      @entityModalClose="entityModalClose"
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
      pickedParent: null,
      pickedParentTable: null,
      pickedChildTable: null,
      isCreatingTable: false,
      isCreatingRelationship: false,
      isModalOpen: false,
      relationships: [
        {
          parentTable: 0,
          childTable: 1,
          type: "regular",
        },
        {
          parentTable: 1,
          childTable: 0,
          type: "regular",
        },
      ],
      tables: [
        {
          tableID: 10,
          name: "table",
          x: 350,
          y: 289,
          keys: [],
        },
        {
          tableID: 11,
          name: "table2",
          x: 270,
          y: 389,
          keys: [
            {
              keyID: 1,
              name: "IDcustomer",
              isPrimary: true,
              dataType: "char",
              isUnique: true,
              isNotNULL: true,
            },
            {
              keyID: 2,
              name: "2",
              isPrimary: false,
              dataType: "char",
              isUnique: false,
              isNotNULL: false,
            },
          ],
        },
        {
          tableID: 12,
          name: "table3",
          x: 440,
          y: 489,
          keys: [],
        },
      ],
    };
  },
  methods: {
    showTableSidebar() {
      this.isCreatingTable = !this.isCreatingTable;
      // console.log(this.tables[this.relationships[0].parentTable].x);
    },
    createRelationship() {
      this.isCreatingRelationship = true;
      setTimeout(() => {
        if (this.pickedChildTable == null) {
          // console.log("Waiting for child input, ", this.pickedChildTable);
          this.createRelationship();
        } else {
          // console.log("Final child input, ", this.pickedChildTable);
          // console.log("Final parent input, ", this.pickedParentTable);
          // let parent = this.pickedParentTable;
          // let child = this.pickedChildTable;
          this.relationships.push({
            parentTable: this.pickedParentTable,
            childTable: this.pickedChildTable,
            type: "new",
          });
          this.pickedChildTable = null;
          this.pickedParentTable = null;
          this.isCreatingRelationship = false;
        }
      }, 500);
    },
    drawRelationship() {
      let centerXP = this.tables[this.relationships[1].parentTable].x + 150 / 2;
      let centerYP = this.tables[this.relationships[1].parentTable].y + 100 / 2;
      let centerXC = this.tables[this.relationships[1].childTable].x + 150 / 2;
      let centerYC = this.tables[this.relationships[1].childTable].y + 100 / 2;

      let distX = centerXP - centerXC;
      let distY = centerYP - centerYC;
      // console.log(here);
      let p1 = this.calcDistance(distX, distY, centerXP, centerYP, 150, 100);
      let p2 = this.calcDistance(-distX, -distY, centerXC, centerYC, 150, 100);

      var cxn = document.getElementById("connection");

      cxn.setAttributeNS(null, "x1", p1[0]);
      cxn.setAttributeNS(null, "y1", p1[1]);
      cxn.setAttributeNS(null, "x2", p2[0]);
      cxn.setAttributeNS(null, "y2", p2[1]);
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
    // createRecursiveRelationship() {},
    showModal(tableID) {
      this.pickedParentTable = this.tables
        .map(function (e) {
          return e.tableID;
        })
        .indexOf(tableID);
      this.pickedEntity = this.tables[this.pickedParentTable];
      this.isModalOpen = true;
    },
    entityModalClose() {
      this.pickedEntity = null;
      this.isModalOpen = false;
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
      if (this.pickedParentTable == null)
        this.pickedParentTable = this.tables
          .map(function (e) {
            return e.tableID;
          })
          .indexOf(tableID);
      else if (this.pickedParentTable != null) {
        console.log("Picking child");
        this.pickedChildTable = this.tables
          .map(function (e) {
            return e.tableID;
          })
          .indexOf(tableID);
      }
      console.log("Picked", this.pickedParentTable);
      console.log("Picked child", this.pickedChildTable);
    },
    moveOnCanvas(event) {
      if (
        this.pickedParentTable != null &&
        this.isCreatingRelationship != true
      ) {
        this.moveEntity(event);
      }
    },
    moveEntity(event) {
      // console.log(event);
      this.tables[this.pickedParentTable].x =
        this.tables[this.pickedParentTable].x + event.movementX;
      this.tables[this.pickedParentTable].y =
        this.tables[this.pickedParentTable].y + event.movementY;
    },
    dropEntity() {
      if (this.isCreatingRelationship == false) this.pickedParentTable = null;
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
}

#connection {
  stroke-width: 1;
  stroke: red;
}
</style>
