<template>
  <div class="navbar">
    <div class="project-name">
      <i class="fa fa-database"></i>
      <input placeholder="Диаграмма без названия" type="text" />
    </div>
    <div class="nav-container">
      <ul class="nav-operations">
        <li>
          <!-- createRelationship -->
          <!-- <button id="create-relationship" @click="createRelationship"> -->
          <button id="create-relationship" @click="this.isRelModalOpen = true">
            <i class="fa-solid fa-arrows-left-right"></i>
            <span class="button-text">Создать отношение</span>
          </button>
        </li>
        <li>
          <button id="create-table" @click="showTableSidebar">
            <i class="fa-solid fa-table"></i>
            <span class="button-text"> Создать сущность</span>
          </button>
        </li>
        <li>
          <button id="view-grid" @click="setCanvas">
            <i class="fa-solid fa-table-cells"></i>
            <span class="button-text">Сетка</span>
          </button>
        </li>
        <li>
          <button @click="this.isGuideVisible = true">
            <i class="fa-solid fa-question"></i>
          </button>
        </li>
      </ul>
    </div>
    <div class="navbar-load" @click="save">
      <button>
        <i class="fa-solid fa-download"></i>
      </button>
    </div>
  </div>
  <div class="canvas-container">
    <svg
      class="canvas"
      id="projectBD"
      v-on:mousemove="moveOnCanvas"
      v-on:mouseup="dropEntity"
      v-on:mouseleave="dropEntity"
    >
      <pattern
        id="tenthGrid"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 60 0 L 0 0 0 50"
          fill="none"
          stroke="silver"
          stroke-width="0.5"
        />
      </pattern>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#tenthGrid)" />
        <path
          d="M 100 0 L 0 0 0 100"
          fill="none"
          stroke="gray"
          stroke-width="0.5"
        />
      </pattern>

      <rect v-if="isGridView" width="100%" height="100vh" fill="url(#grid)" />
      <entity-list
        @tableDown="pickEntity"
        @tableUp="dropEntity"
        @tableEdit="showModal"
        :tables="tables"
      ></entity-list>
      <entity-relationship
        v-for="(rel, index) in this.relationships"
        :key="index"
        :parentTable="rel.parentTable"
        :childTable="rel.childTable"
        :type="rel.type"
        :x1="rel.x1"
        :y1="rel.y1"
        :x2="rel.x2"
        :y2="rel.y2"
        @relationshipClicked="relationshipModalEdit"
      ></entity-relationship>
    </svg>
  </div>

  <edit-box v-model:show="isModalOpen">
    <entity-edit-form
      :entity="pickedEntity"
      @editEntity="editEntity"
      @entityModalClose="entityModalClose"
    ></entity-edit-form>
  </edit-box>
  <sidebar-box
    v-show="this.isGuideVisible"
    @guideClose="setGuide"
  ></sidebar-box>

  <edit-box v-model:show="isRelModalOpen"
    ><relationship-form
      @createRel="createRelationship"
      @relModalClose="relModalClose"
    ></relationship-form
  ></edit-box>
</template>

<script>
import EntityList from "./components/TheEntityList.vue";
import TheTableSidebar from "./components/TheTableSidebar.vue";
import EntityEditForm from "./components/EntityEditForm.vue";
import EditBox from "./components/UI/EditBox.vue";
import EntityRelationship from "./components/EntityRelationship.vue";
import RelationshipForm from "./components/RelationshipForm.vue";

export default {
  components: {
    TheTableSidebar,
    EntityEditForm,
    EntityList,
    EditBox,
    EntityRelationship,
    RelationshipForm,
  },

  data() {
    return {
      projectTitle: "",
      isGridView: true,

      pickedEntity: {},
      pickedParentTable: null,
      pickedChildTable: null,

      isGuideVisible: true,
      isCreatingRelationship: false,
      isRelModalOpen: false,
      isModalOpen: false,
      relationships: [],
      tables: [],
    };
  },
  methods: {
    setGuide() {
      this.isGuideVisible = false;
    },
    showTableSidebar() {
      this.tables.push({
        tableID:
          Date.now().toString(36) +
          Math.random().toString(36).substring(2, 12).padStart(12, 0),
        x: 450,
        y: 450,
        name: "Новая сущность",
        keys: [],
        childTables: [],
      });
      // this.currentEntityID += 1;
    },
    createRelationship(relType) {
      this.isRelModalOpen = false;
      this.isCreatingRelationship = true;
      setTimeout(() => {
        if (this.pickedChildTable == null) {
          this.createRelationship(relType);
        } else {
          this.calcRelationship(
            this.pickedParentTable,
            this.pickedChildTable,
            relType
          );
          // this.tables[this.pickedParentTable].childTables.push(
          //   this.pickedChildTable
          // );
          this.pickedChildTable = null;
          this.pickedParentTable = null;
          this.isCreatingRelationship = false;
        }
      }, 500);
    },
    calcRelationship(parent, child, relType) {
      let p1 = this.calcCoordinates(parent, child)[0];
      let p2 = this.calcCoordinates(parent, child)[1];
      let finRelationship = {
        parentTable: parent,
        childTable: child,
        type: relType,
        x1: p1[0],
        y1: p1[1],
        x2: p2[0],
        y2: p2[1],
      };
      if (relType == "Identifying") this.tables[child].styleType = 10;
      const PKs = this.tables[parent].keys.filter(
        (currentKey) => currentKey.isPrimary == true
      );
      const Pk2 = JSON.parse(JSON.stringify(PKs));
      this.tables[parent].childTables.push(child);
      for (const pk of Pk2) {
        if (relType == "NonIdentifying" || relType.includes("Optional")) {
          pk.isPrimary = false;
        }
        pk.isForeign = true;
        pk.foreignEntity = parent;
        if (relType != "M2M") this.tables[child].keys.push(pk);
      }
      this.relationships.push(finRelationship);
    },
    updateRelationship(rectA) {
      const rels = this.relationships.filter(
        (item) => item.parentTable == rectA || item.childTable == rectA
      );
      for (const rel of rels) {
        let p1 = this.calcCoordinates(rel.parentTable, rel.childTable)[0];
        let p2 = this.calcCoordinates(rel.parentTable, rel.childTable)[1];
        rel.x1 = p1[0];
        rel.y1 = p1[1];
        rel.x2 = p2[0];
        rel.y2 = p2[1];
      }
    },
    calcCoordinates(parent, child) {
      let centerXP = this.tables[parent].x + 190 / 2;
      let centerYP = this.tables[parent].y + 100 / 2;
      let centerXC = this.tables[child].x + 190 / 2;
      let centerYC = this.tables[child].y + 100 / 2;

      let distX = centerXP - centerXC;
      let distY = centerYP - centerYC;

      let p1 = this.calcDistance(-distX, -distY, centerXP, centerYP, 190, 100);
      let p2 = this.calcDistance(+distX, +distY, centerXC, centerYC, 190, 100);

      return [p1, p2];
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
    relationshipModalEdit() {
      alert("rel clicked");
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
    entityModalClose() {
      this.pickedEntity = null;
      this.isModalOpen = false;
    },
    relModalClose() {
      this.isRelModalOpen = false;
    },
    editEntity(editedEntity) {
      const index = this.tables.findIndex(
        (x) => editedEntity.tableID === x.tableID
      ); // find index of edited entity
      // if (editedEntity.childTables.length != 0) {
      //   parentPKs = JSON.parse(
      //     JSON.stringify(
      //       this.editedEntity.keys.filter((d) => d.isPrimary == false)
      //     )
      //   );
      //}
      this.tables[index] = editedEntity;
      this.isModalOpen = false;
    },
    createEntity(table) {
      this.tables.push(table);
      this.isCreatingTable = false;
    },
    pickEntity(tableID) {
      if (this.pickedParentTable == null) {
        console.log("pick parent");
        this.pickedParentTable = this.tables
          .map(function (e) {
            return e.tableID;
          })
          .indexOf(tableID);
      } else if (this.pickedParentTable != null) {
        console.log("Pick child");
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
      this.tables[this.pickedParentTable].x =
        this.tables[this.pickedParentTable].x + event.movementX;
      this.tables[this.pickedParentTable].y =
        this.tables[this.pickedParentTable].y + event.movementY;
      this.updateRelationship(this.pickedParentTable);
    },
    dropEntity() {
      if (this.isCreatingRelationship == false) this.pickedParentTable = null;
    },
    setCanvas() {
      this.isGridView = !this.isGridView;
    },
    zoomIn() {},
    zoomOut() {},
    downloadSVG(event) {
      const svg = document.querySelector("svg");
      const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
      const a = document.createElement("a");
      const e = new MouseEvent("click");
      a.download = "download.svg";
      a.href = "data:image/svg+xml;base64," + base64doc;
      a.dispatchEvent(e);
    },
    triggerDownload(imgURI, fileName) {
      let a = document.createElement("a");

      a.setAttribute("download", "image.svg");
      a.setAttribute("href", imgURI);
      a.setAttribute("target", "_blank");

      a.click();
    },
    save() {
      const svg = document.querySelector("svg");
      console.log(svg);
      let data = new XMLSerializer().serializeToString(svg);
      let svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
      let url = URL.createObjectURL(svgBlob);

      this.triggerDownload(url);
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #414249;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 50px 3px 10px;
  height: 60px;
}
li i button text {
  font-weight: 500;
  font-size: 20px;
  color: #ecf0f1;
  text-decoration: none;
}
.nav-operations {
  padding: 0px;
  list-style: none;
}
.nav-operations li {
  display: inline-block;
  padding: 10px 20px;
}
.nav-operations li i input {
  transition: all 0.3s ease 0s;
}

button {
  padding: 9px, 25px;
  color: #ecf0f1;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease 0s;
}
button:hover {
  height: 30px;
  border-radius: 40px;
  background-color: rgba(0, 136, 169, 0.8);
}
.button-text {
  margin: 5px;
}
.fa {
  margin-left: 10px;
  font-size: 26px;
  color: #4fb9ff;
}
input {
  color: #ecf0f1;
  font-size: 25px;
  border: none;
  width: 340px;
  background-color: transparent;
  outline-width: 0;
  padding: 10px 15px;
  letter-spacing: 1px;
}
.canvas-container {
  position: relative;
  height: 100%;
}
.canvas {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  /* background-color: #24252a; */
}

#connection {
  stroke-width: 1;
  stroke: red;
}

@media screen and (max-width: 1050px) {
  .button-text {
    display: none;
  }
  sidebar-box {
    color: red;
    width: 20px;
  }
}
</style>
