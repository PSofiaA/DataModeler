import "./assets/main.css";
import UIcomponents from "@/components/UI";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// РЕГИСТРАЦИЯ UI КОМПОНЕНТОВ
UIcomponents.forEach((element) => {
  console.log(element);
  app.component(element.name, element);
});

app.mount("#app");
