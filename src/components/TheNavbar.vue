<template>
  <div class="navbar-container">
    <div class="navbar-load">
      <button>
        <img src="..\assets\upload-icon.png" />
      </button>
      <button>
        <img src="..\assets\download-icon.png" />
      </button>
    </div>

    <div class="navbar-operations">
      <button id="create-table">
        <img src="..\assets\table-icon.png" />
      </button>
      <button id="create-relationship">
        <img src="..\assets\rel-icon.png" />
      </button>
      <button id="view-grid">
        <img src="..\assets\view-icon.png" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  methods: {
    hi() {
      console.log("clicked");
    },
  },
};
</script>

<style scoped>
.navbar-container {
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

.navbar-operations {
  margin-left: 40px;
}
button {
  height: 30px;
  background: none;
  border: none;
}
img {
  height: 80%;
  opacity: 0.8;
}
</style>
