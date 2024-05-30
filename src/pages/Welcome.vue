<template>
  <section class="about">
    <div class="about-container">
      <div class="column-left">
        <h1>1XDataModeler</h1>
        <p>
          Проектируйте диаграмы баз данных<br />
          в нотации 1DEF1X
        </p>
        <a href="#examples-container">Узнать больше</a>
      </div>
      <div class="column-right">
        <img
          src="C:\Users\Администратор\Desktop\DataModeler\src\assets\home-main.png"
        />
      </div>
    </div>
    <div id="examples-container">
      <div class="column-left">
        <p>
          Проектируйте диаграмы баз данных<br />
          в нотации 1DEF1X
        </p>
        <a href="#examples-container">Узнать больше</a>
      </div>
      <div class="column-right">
        <img
          class="example-pic"
          src="C:\Users\Администратор\Desktop\DataModeler\src\assets\entity level small.jpg"
        />
      </div>
      <div class="column-left">
        <img
          class="example-pic"
          src="C:\Users\Администратор\Desktop\DataModeler\src\assets\key level small.jpg"
        />
      </div>
      <div class="column-right examples">
        <p>
          Проектируйте диаграмы баз данных<br />
          в нотации 1DEF1X
        </p>
        <a href="#examples-container">Узнать больше</a>
      </div>
      <div class="column-left">
        <p>
          Проектируйте диаграмы баз данных<br />
          в нотации 1DEF1X
        </p>
        <a href="#examples-container">Узнать больше</a>
      </div>
      <div class="column-right examples">
        <img
          class="example-pic"
          src="C:\Users\Администратор\Desktop\DataModeler\src\assets\FA small.jpg"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 90vh;
  padding: 1rem calc((100vw - 1300px) / 2);
}
#examples-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* background-color: pink; */
}
.column-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #000;
  padding: 0px 20px;
  margin-left: 40px;
}

.column-left h1 {
  margin-bottom: 1rem;
  font-size: 3rem;
}

.column-left p {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  line-height: 1.5;
}

a {
  text-decoration: none;
  padding: 1rem 3rem;
  font-size: 1rem;
  border: none;
  color: #fff;
  background: #000;
  border-radius: 50px;
}

a:hover {
  cursor: pointer;
  border: none;
  background: rgba(0, 136, 169, 0.8);
  color: #fff;
}

.column-right {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
}
.examples {
  flex-direction: column;
}
.img {
  width: 100%;
  height: 100%;
}
.example-pic {
  margin: 30px 10px;
  border: 1px solid #000;
  width: 90%;
  height: 90%;
}
@media screen and (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
  }
}
</style>
