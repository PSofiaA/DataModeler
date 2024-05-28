import "./assets/main.css";
import UIcomponents from "@/components/UI";
import router from "./router/router";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// РЕГИСТРАЦИЯ UI КОМПОНЕНТОВ
UIcomponents.forEach((element) => {
  app.component(element.name, element);
});

app.use(router).mount("#app");
