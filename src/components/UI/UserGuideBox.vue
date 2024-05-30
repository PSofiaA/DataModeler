<template>
  <!-- v-show="leftSidebarOpen" -->
  <div class="edit">
    <div class="sidebar-left">
      <header>1XDataModeler</header>
      <img
        src="C:\Users\Администратор\Desktop\DataModeler\src\assets\IDEF-title.png"
      />
      <ul>
        <li>
          Это - редактор для построения <br />диаграмм баз данных, который<br />позволяет
          проектировать и<br />управлять структурами баз <br />данных, создавая
          диаграммы с <br />таблицами, связями и <br />ограничениями.
        </li>

        <li>
          1XDataModeler использует <br />

          <a
            href="https://en.wikipedia.org/wiki/IDEF1X"
            title="IDEF1X документация"
          >
            нотацию IDEF1X.</a
          >
        </li>
        <li>
          Редактор упрощает процесс<br />разработки и управления базамиданных,
          делая его более <br />интуитивным и наглядным.
        </li>
      </ul>
      <button type="button" class="modal-button" @click="hideSidebar">
        Понятно!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserGuideBox",
  emits: ["guideClose"],
  props: {
    leftSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideSidebar() {
      this.$emit("guideClose");
    },
  },
};
</script>

<style scoped>
.sidebar-left {
  position: fixed;
  top: 115px;
  right: 10px;
  z-index: 1;
  width: 390px;
  height: 650px;
  background-color: #414249;
  border-right: #414249 solid 2px;
  border-radius: 10px;
  padding: 30px 40px;
  color: #ecf0f1;
  text-decoration: none;
}
a {
  color: rgb(0, 204, 255);
  filter: brightness(100%);
  text-decoration: inherit;
}
img {
  width: 310px;
  border: 30px solid white;
}
header {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
ul {
  padding: 0;
}
ul li {
  font-size: 17px;
  list-style: none;
  padding: 15px 0px;
  text-wrap: pretty;
  text-align: left;

  /* white-space: pre-wrap; */
  word-break: break-all;
}

.modal-button {
  width: fit-content;
  padding: 7px;
  height: 38px;
  margin: 10px;
  background-color: rgba(0, 136, 169, 0.8);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease 0s;
  position: absolute;
  bottom: 12px;
  left: 30px;
}
.modal-button:hover {
  cursor: pointer;
  background-color: rgba(0, 136, 169, 1);
}
@media screen and (max-height: 730px) {
  .sidebar-left {
    width: 390px;
    height: 500px;
  }
  img {
    display: none;
  }
}
@media screen and (max-width: 1050px) {
  .sidebar-left {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .edit {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 2;
  }
  img {
    border: 30px solid white;
  }
}
</style>
