<template>
  <b-container fluid>
    <div class="gameContainer">
      <b-row>
        <b-col class="left">
          <canvasPaintable></canvasPaintable>
          <canvasPaintableClient v-if="false" :key="canvasData"></canvasPaintableClient>
        </b-col>
      </b-row>
      <b-row class="right">
      <div v-if="userStatus == 'true'">
        <button class="btn btn-primary" @click="begin" :disabled="isDisabled"> {{ startGameLabel }} </button><br>
          {{ problemsCount }} Problem(s) left<br>
          {{ timerCount }}<br>
          can answer : {{ canAnswer }}
      </div>
      <div v-if="userStatus == 'false'">
        <h1>{{userTimer}}</h1>
      </div>
    </b-row>
    <b-row>
      <b-col class="bottom" cols="12" align-self="stretch">
        <canvasPaintable v-if="userStatus == 'true'"></canvasPaintable>
        <canvasPaintableClient v-else :key="canvasData"></canvasPaintableClient>
      </b-col>
    </b-row>
        </b-col> -->
        <b-col class="choose">
          <p class="chooseTitle">Choose your answer :</p>
          <div class="buttonGroup">
            <button>Button 1</button>
            <button>Button 1</button>
            <button>Button 1</button>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import canvasPaintable from '@/components/paintable'
import canvasPaintableClient from '@/components/paintableclient'
import socket from '@/config/socket'
import Axios from 'axios'

export default {
  name: 'Game',
  components: {
    canvasPaintable,
    canvasPaintableClient
  },
  data () {
    return {
      canvasData: '',
      datas: [],
      userStatus: localStorage.getItem('status'),
      question: [],
      timerCount: 0,
      problemsCount: 5,
      canAnswer: false,
      isDisabled: false,
      startGameLabel: 'Start Game!',
      userTimer: 0
    }
  },
  methods: {
    fetchData () {
      Axios({
        method: 'get',
        url: 'http://localhost:3000/rooms/question',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.question = data
        })
    },
    begin () {
      this.isDisabled = true
      this.problemsCount--
      this.timerCount = 20
      this.canAnswer = true
      this.startGameLabel = 'Next'
    }
  },
  created () {
    socket.on('returnPaintableData', (data) => {
      localStorage.setItem('myscreen', data)
      this.canvasData = data
    })
    socket.on('user-connect', (data) => {
      this.datas = data
    })
    socket.on('user-logout', (data) => {
      localStorage.clear()
    })
    this.fetchData()
  },
  computed () {
    socket.on('gameplay', (data) => {
      this.userTimer = data
      console.log(this.userTimer)
    })
  },
  watch: {
    timerCount: {
      handler (value) {
        if (value > 0) {
          setTimeout(() => {
            this.canAnswer = true
            this.timerCount--
            socket.emit('gameplay', this.timerCount)
          }, 1000)
        } else {
          this.canAnswer = false
          if (this.problemsCount > 0) {
            this.isDisabled = false
          } else if (this.problemsCount < 1) {
            this.isDisabled = true
            this.startGameLabel = 'Finished!'
          }
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  }
}
</script>

<style scoped>
.gameContainer {
  display: flex;
}
.scoreContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
}
.scoreCard {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  background: #409d7e;
  align-items: center;
  width: 20vw;
  margin-left: -29vw;
  margin-top: 5px;
  height: 100vh;
}
.scoreTitle {
  font-size: 22px;
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
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 250px;
}
.chooseTitle {
  font-weight: bold;
  font-size: 35px;
}
.buttonGroup {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
}
button {
  border: none;
  background: #409d7e;
  width: 7vw;
  height: 5vh;
  border-radius: 30px;
  color: white;
  margin-top: 50px;
}
button:focus {
  outline: none;
}
.left {
  margin-left: -150px;
  padding-left: 0;
}
</style>
