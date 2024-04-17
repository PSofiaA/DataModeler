import "./assets/main.css";
import UIcomponents from "@/components/UI";
import icons from "@/components/icons";
import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";

const app = createApp(App);

// РЕГИСТРАЦИЯ UI КОМПОНЕНТОВ
UIcomponents.forEach((element) => {
  app.component(element.name, element);
});

icons.forEach((element) => {
  app.component(element.name, element);
});

// app.use(router)

app.mount("#app");
