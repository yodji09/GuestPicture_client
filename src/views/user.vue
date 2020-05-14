<template>
  <b-container fluid>
    <b-row class="top">
      <b-col class="scoreContainer" cols="4">
        <div class="scoreCard">
          <div class="scoreTitle">
            <p>SCORE BOARD</p>
          </div>
          <div class="scoreInfo">
            <p class="number">1.</p>
            <p class="name">M. Salah</p>
            <p class="score">8</p>
          </div>
          <div class="scoreInfo">
            <p class="number">2.</p>
            <p class="name">Lionel Messi</p>
            <p class="score">7</p>
          </div>
          <div class="scoreInfo">
            <p class="number">3.</p>
            <p class="name">Ronaldo</p>
            <p class="score">10</p>
          </div>
        </div>
      </b-col>
      <b-col class="choose" cols="8">
        <p class="chooseTitle">Choose your answer :</p>
        <div class="buttonGroup">
          <button>Button 1</button>
          <button>Button 1</button>
          <button>Button 1</button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'User'
}
</script>

<style scoped>
.top {
  width: 100vw;
  height: 50vh;
}
.top .scoreContainer {
  background: white;
}
.top .choose {
  background: white;
}
.scoreContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.scoreCard {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin-top: 20px;
  background: #98104e;
  align-items: center;
  width: 25vw;
  height: 90%;
  border-radius: 20px;
}
.scoreTitle {
  font-size: 35px;
  font-weight: bold;
  color: white;
}
.scoreInfo {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  width: 18vw;
  padding: 10px 20px 0;
  border-radius: 20px;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
  color: white;
}
.choose {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chooseTitle {
  font-weight: bold;
  font-size: 35px;
}
.buttonGroup {
  display: flex;
  margin-top: 30px;
  width: 25vw;
  justify-content: space-between;
}
button {
  border: none;
  background: chocolate;
  width: 7vw;
  height: 5vh;
  border-radius: 30px;
  color: white;
}
.bottom {
  background: white;
  height: 50vh;
  width: 100vw;
  border-top: 2px solid black;
  padding-top: 20px;
}
.bottom p {
  text-align: left;
  margin-left: 20px;
  font-weight: bold;
  font-size: 35px;
}
</style>
