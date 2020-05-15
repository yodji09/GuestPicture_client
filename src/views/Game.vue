<template>
  <b-container fluid>
    <b-row class="top">
      <b-col class="scoreContainer" cols="4">
        <div class="scoreCard">
          <div class="scoreTitle">
            <p>SCORE BOARD</p>
          </div>
          <div v-for="(data, i) in datas" :key='i'>
            <div class="scoreInfo">
              <p class="number">1.</p>
              <p class="name">{{data}}</p>
              <p class="score">8</p>
            </div>
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
    <b-row>
      <b-col class="bottom" cols="12" align-self="stretch">
        <button @click.prevent="submit"></button>
        <canvasPaintable v-if="userStatus"></canvasPaintable>
        <canvasPaintableClient v-else :key="canvasData"></canvasPaintableClient>
      </b-col>
    </b-row>
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
      userStatus: false,
      question: []
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
    submit () {
      console.log(this.status)
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
    this.userStatus = localStorage.getItem('status')
    this.fetchData()
  }
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
  background: #409d7e;
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
  padding-top: 100px;
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
