<template>
  <div class="main-navbar">
    <div class="title"><i class="fa fa-database"></i> 1XDataModeler</div>
    <ul class="nav-pages">
      <li>
        <button @click="$router.push('/')">
          <!-- <i class="fa-solid fa-house"></i> -->
          <span class="button-text">Домой</span>
        </button>
      </li>
      <li>
        <button @click="$router.push('/users')">
          <span class="button-text">Создать диаграмму</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheMainNavigation",
};
</script>

<style scoped>
.main-navbar {
  /* background-color: rgba(0, 136, 169, 0.8); */
  background-color: #35363c;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
}
.title {
  color: #ecf0f1;
  font-size: 21px;
  padding: 1px 5px;
  letter-spacing: -0.5px;
}
li i button text {
  font-weight: 500;
  font-size: 20px;
  color: #ecf0f1;
  text-decoration: none;
}

.nav-pages {
  padding: 0px;
  margin: 0px 30px;
  list-style: none;
}

.nav-pages li {
  display: inline-block;
  padding: 2px 15px;
}

button {
  padding: 11px 5px;
  color: #ecf0f1;
  border: none;
  text-align: center;
  background-color: transparent;
  cursor: pointer;
  font-size: 17px;
  transition: all 0.3s ease 0s;
}

button:hover {
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
.fa {
  margin: 0px 10px;
  font-size: 26px;
  color: rgb(6, 174, 216);
}
/* hr {
  border: none;
  border-top: 1px solid #ecf0f1;
  color: #ecf0f1;
  overflow: visible;
  text-align: center;
} */
</style>
