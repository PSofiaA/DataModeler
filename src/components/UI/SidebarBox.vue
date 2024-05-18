<template>
  <!-- v-show="leftSidebarOpen" -->
  <div class="sidebar-left">
    <header>Lorem ipsum</header>
    <img
      src="C:\Users\Администратор\Desktop\DataModeler\src\assets\IDEF-title.png"
    />
    <ul>
      <li>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Malesuada
        pellentesque elit eget gravida cum sociis natoque. Tortor consequat id
        porta nibh venenatis cras.
        <a href="https://yourwebsite.com" title="IDEF1X документация"
          >документация IDEF1X</a
        >
      </li>

      <li>
        Sit amet massa vitae tortor condimentum lacinia quis. Urna nunc id
        cursus metus aliquam.
      </li>
      <li>Posuere ac ut consequat semper viverra nam.</li>
    </ul>
    <button type="button" class="modal-button" @click="hideSidebar">
      Понятно!
    </button>
    <!-- <div class="sidebar-content" @click.stop> -->
    <slot> </slot>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "SidebarBox",
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
  top: 90px;
  right: 10px;
  z-index: 1;
  width: 390px;
  height: 630px;
  background-color: #414249;
  border-right: #414249 solid 2px;
  border-radius: 10px;
  padding: 30px 40px;
  color: #ecf0f1;
  text-decoration: none;
  /* transition: max-height 0.5s, overflow 0s; */
}
a {
  color: rgb(0, 204, 255);
  filter: brightness(100%);
  text-decoration: inherit;
}
img {
  width: 310px;
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
  bottom: 20px;
  left: 30px;
}
.modal-button:hover {
  cursor: pointer;
  background-color: rgba(0, 136, 169, 1);
}
</style>
