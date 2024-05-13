import "./assets/main.css";
import UIcomponents from "@/components/UI";
import icons from "@/components/icons";
import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

//https://stackoverflow.com/questions/66389974/using-font-awesome-in-vue-3
// import router from "./router";
library.add(fas);
export default FontAwesomeIcon;

const app = createApp(App);

// РЕГИСТРАЦИЯ UI КОМПОНЕНТОВ
UIcomponents.forEach((element) => {
  console.log(element);
  app.component(element.name, element);
});

// icons.forEach((element) => {
//   app.component(element.name, element);
// });

// app.use(router)

app.mount("#app");
app.component("fa", FontAwesomeIcon);
