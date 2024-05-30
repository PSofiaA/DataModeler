<template>
  <div class="navbar">
    <div class="project-name">
      <input placeholder="Диаграмма без названия" type="text" />
    </div>
    <div class="nav-container">
      <ul class="nav-operations">
        <li>
          <nav-button id="create-relationship" @click="this.isRelModalOpen = true">
            <i class="fa fa-arrows-left-right btn-text"></i>
            <span class="button-text">Создать отношение</span>
          </nav-button>
        </li>
        <li>
          <nav-button id="create-table" @click="showTableSidebar">
            <i class="fa fa-table btn-text"></i>
            <span class="button-text"> Создать сущность</span>
          </nav-button>
        </li>
        <li>
          <nav-button id="view-grid" @click="setCanvas">
            <i class="fa fa-table-cells btn-text"></i>
            <span class="button-text">Сетка</span>
          </nav-button>
        </li>
        <li>
          <nav-button @click="this.isGuideVisible = true">
            <i class="fa fa-question"></i>
          </nav-button>
        </li>
      </ul>
    </div>
    <div class="navbar-load" @click="save">
      <nav-button>
        <i class="fa fa-download"></i>
      </nav-button>
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
      <pattern id="tenthGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 50" fill="none" stroke="silver" stroke-width="0.5" />
      </pattern>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#tenthGrid)" />
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="0.5" />
      </pattern>

      <line id="line" stroke="black" stroke-width="2"></line>

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
        :relationshipID="rel.relationshipID"
        :parentTable="rel.parentTable"
        :childTable="rel.childTable"
        :type="rel.type"
        :x1="rel.x1"
        :y1="rel.y1"
        :x2="rel.x2"
        :y2="rel.y2"
        @relationshipClicked="relationshipModalEdit(rel)"
      ></entity-relationship>
    </svg>
  </div>

  <edit-box v-model:show="isModalOpen">
    <entity-edit-form
      :entity="pickedEntity"
      @editEntity="editEntity"
      @deleteEntity="deleteEntity"
      @entityModalClose="entityModalClose"
    ></entity-edit-form>
  </edit-box>
  <user-guide-box v-show="this.isGuideVisible" @guideClose="setGuide"></user-guide-box>

  <edit-box v-model:show="isRelModalOpen"
    ><relationship-form
      :entityRel="pickedRel"
      @createRel="createRelationship"
      @relModalClose="relModalClose"
      @deleteRel="deleteRelationship"
    ></relationship-form
  ></edit-box>
</template>

<script>
import EntityList from "@/components/CanvasElements/TheEntityList.vue";
import UserGuideBox from "@/components/UI/UserGuideBox.vue";
import EditBox from "@/components/UI/EditBox.vue";
import EntityRelationship from "@/components/CanvasElements/EntityRelationship.vue";
import EntityEditForm from "@/components/Forms/EntityEditForm.vue";
import RelationshipForm from "@/components/Forms/RelationshipForm.vue";

export default {
  components: {
    UserGuideBox,
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
      pickedRel: null,
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
      let id = this.calcID();
      this.tables.push({
        tableID: id,
        x: 250,
        y: 250,
        name: "Новая сущность",
        keys: [],
        childTables: [],
        styleType: 0,
      });
    },
    createRelationship(editedRel, flag) {
      this.isRelModalOpen = false;
      this.isCreatingRelationship = true;
      if (!flag) {
        setTimeout(() => {
          if (this.pickedChildTable == null && editedRel.type != "Recursive") {
            this.createRelationship(editedRel, flag);
          } else if (this.pickedParentTable != null && editedRel.type == "Recursive") {
            console.log("haha");
            this.drawRecursive(this.pickedParentTable);
          } else if (editedRel.type != "Recursive") {
            this.calcRelationship(
              this.pickedParentTable,
              this.pickedChildTable,
              editedRel.type
            );
            this.relModalClose();
          }
        }, 500);
      } else {
        const index = this.relationships.findIndex(
          (x) => editedRel.relationshipID === x.relationshipID
        );
        this.relationships[index].type = editedRel.type;
        this.relModalClose();
      }
    },
    calcRelationship(parent, child, relType) {
      let coordPair1 = this.calcCoordinates(parent, child)[0];
      let coordPair2 = this.calcCoordinates(parent, child)[1];
      let id = this.calcID();
      let finRelationship = {
        relationshipID: id,
        parentTable: parent,
        childTable: child,
        type: relType,
        x1: coordPair1[0],
        y1: coordPair1[1],
        x2: coordPair2[0],
        y2: coordPair2[1],
      };
      if (relType == "Identifying") this.tables[child].styleType = 10;
      const PKs = this.tables[parent].keys.filter(
        (currentKey) => currentKey.isPrimary == true
      );
      const Pk2 = JSON.parse(JSON.stringify(PKs));
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
    calcID() {
      return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 12).padStart(12, 0)
      );
    },
    drawRecursive(parent) {
      let id = this.calcID();
      let x = this.tables[parent].x;
      let y = this.tables[parent].y;
      let coords = this.calcRecursiveCoordinates(x, y);
      let finRelationship = {
        relationshipID: id,
        parentTable: parent,
        childTable: parent,
        type: "Recursive",
        x1: coords[0],
        y1: coords[1],
        x2: coords[2],
        y2: coords[3],
      };
      const PKs = this.tables[parent].keys.filter(
        (currentKey) => currentKey.isPrimary == true
      );
      const Pk2 = JSON.parse(JSON.stringify(PKs));
      for (const pk of Pk2) {
        pk.isPrimary = false;
        pk.isForeign = true;
        pk.foreignEntity = parent;
        this.tables[parent].keys.push(pk);
      }
      this.relationships.push(finRelationship);
      this.isCreatingRelationship = false;
      let line = document.getElementById("line");
      line.setAttribute("x1", 0);
      line.setAttribute("y1", 0);
      line.setAttribute("x2", 0);
      line.setAttribute("y2", 0);
      this.pickedChildTable = null;
      this.pickedParentTable = null;
      this.pickedRel = null;
      this.isCreatingRelationship = false;
    },

    updateRelationship(rectA) {
      const rels = this.relationships.filter(
        (item) => item.parentTable == rectA || item.childTable == rectA
      );
      for (const rel of rels) {
        if (rel.type != "Recursive") {
          let coordPair1 = this.calcCoordinates(rel.parentTable, rel.childTable)[0];
          let coordPair2 = this.calcCoordinates(rel.parentTable, rel.childTable)[1];
          rel.x1 = coordPair1[0];
          rel.y1 = coordPair1[1];
          rel.x2 = coordPair2[0];
          rel.y2 = coordPair2[1];
        } else {
          let x = this.tables[rel.parentTable].x;
          let y = this.tables[rel.parentTable].y;
          let coords = this.calcRecursiveCoordinates(x, y);
          rel.x1 = coords[0];
          rel.y1 = coords[1];
          rel.x2 = coords[2];
          rel.y2 = coords[3];
        }
      }
    },
    calcRecursiveCoordinates(x, y) {
      let x1 = x + 95;
      let y1 = y;
      let x2 = x + 190;
      let y2 = y + 50;
      return [x1, y1, x2, y2];
    },
    calcCoordinates(parent, child) {
      let centerXP = this.tables[parent].x + 190 / 2;
      let centerYP = this.tables[parent].y + 100 / 2;
      let centerXC = this.tables[child].x + 190 / 2;
      let centerYC = this.tables[child].y + 100 / 2;

      let distX = centerXP - centerXC;
      let distY = centerYP - centerYC;

      let finDist1 = this.calcDistance(-distX, -distY, centerXP, centerYP, 190, 100);
      let finDist2 = this.calcDistance(+distX, +distY, centerXC, centerYC, 190, 100);

      return [finDist1, finDist2];
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
    relationshipModalEdit(event) {
      this.pickedRel = event;
      this.isRelModalOpen = true;
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
      this.pickedChildTable = null;
      this.pickedParentTable = null;
      this.pickedRel = null;
      this.isCreatingRelationship = false;
      this.isRelModalOpen = false;
    },
    editEntity(editedEntity) {
      const index = this.tables.findIndex((x) => editedEntity.tableID === x.tableID);
      this.tables[index] = editedEntity;
      this.isModalOpen = false;
    },
    deleteEntity(editedEntity) {
      const index = this.tables.findIndex((x) => editedEntity.tableID === x.tableID);
      this.relationships.forEach(function (rel, index) {
        if (rel.parentTable == index) {
          const childIndex = this.tables.findIndex(
            (x) => rel.childTable.tableID === x.tableID
          );
          this.tables[childIndex].styleType = "0";
        }
      });
      this.tables.splice(index, 1);
      // this.relationships = this.relationships.filter(
      //   (rel) => rel.parentTable != index && rel.childTable != index
      // );

      this.entityModalClose();
    },
    updateEntityKeys(editedEntity) {},
    deleteRelationship(relationship) {
      const index = this.relationships.findIndex(
        (x) => relationship.relationshipID === x.relationshipID
      );
      this.relationships.splice(index, 1);
      this.pickedRel = null;
      this.relModalClose();
    },
    createEntity(table) {
      this.tables.push(table);
      this.isCreatingTable = false;
    },
    pickEntity(tableID) {
      if (this.pickedParentTable == null) {
        this.pickedParentTable = this.tables
          .map(function (e) {
            return e.tableID;
          })
          .indexOf(tableID);
      } else if (this.pickedParentTable != null) {
        this.pickedChildTable = this.tables
          .map(function (e) {
            return e.tableID;
          })
          .indexOf(tableID);
      }
    },
    moveOnCanvas(event) {
      if (this.pickedParentTable != null && this.isCreatingRelationship != true) {
        this.moveEntity(event);
      } else if (this.pickedParentTable != null && this.isCreatingRelationship == true) {
        let line = document.getElementById("line");
        line.setAttribute("x1", this.tables[this.pickedParentTable].x + 95);
        line.setAttribute("y1", this.tables[this.pickedParentTable].y + 50);
        line.setAttribute("x2", event.offsetX);
        line.setAttribute("y2", event.offsetY);
      } else {
        this.resetLine(line);
      }
    },
    resetLine(line) {
      line.setAttribute("x1", 0);
      line.setAttribute("y1", 0);
      line.setAttribute("x2", 0);
      line.setAttribute("y2", 0);
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
li i text {
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

.btn-text {
  margin-right: 5px;
  color: #ecf0f1;
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
  height: 100vh;
}

@media screen and (max-width: 1050px) {
  .button-text {
    display: none;
  }
}
</style>
