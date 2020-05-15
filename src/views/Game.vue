<template>
  <b-container fluid>
    <div class="gameContainer">
      <b-row>
        <b-col class="left">
          <canvasPaintable v-if="userStatus == 'true'"></canvasPaintable>
          <canvasPaintableClient v-else :key="canvasData"></canvasPaintableClient>
        </b-col>
      </b-row>
      <b-row class="right">
      <b-col class="choose">
          <div v-if="userStatus == 'true'">
            Question : {{question}}
            <button class="btn btn-primary" @click.prevent="begin" :disabled="isDisabled"> {{ startGameLabel }} </button><br>
              {{ problemsCount }} Problem(s) left<br>
              {{ timerCount }}<br>
          </div>
          <div v-if="problemsCount === -1">
            <h2>The winner is : {{winner}}</h2>
          </div>
          <p class="chooseTitle">Choose your answer :</p>
          <div class="buttonGroup" v-if="isDisabled && userStatus == 'false'">
            <b-button @click.prevent="checkAnswer(choiceA)" :disabled="disableButton">{{choiceA}}</b-button>
            <b-button @click.prevent="checkAnswer(choiceB)" :disabled="disableButton">{{choiceB}}</b-button>
            <b-button @click.prevent="checkAnswer(choiceC)" :disabled="disableButton">{{choiceC}}</b-button>
            <b-button @click.prevent="checkAnswer(choiceD)" :disabled="disableButton">{{choiceD}}</b-button>
          </div>
      </b-col>
      <div v-if="userStatus == 'false'">
        <h1>{{userTimer}}</h1>
      </div>
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
      questions: [],
      question: '',
      timerCount: 0,
      problemsCount: 5,
      canAnswer: false,
      isDisabled: false,
      startGameLabel: 'Start Game!',
      userTimer: 0,
      storeIndex: [],
      choiceA: 'button',
      choiceB: 'button',
      choiceC: 'button',
      choiceD: 'button',
      answer: '',
      score: 0,
      disableButton: false,
      winner: ''
    }
  },
  methods: {
    fetchData () {
      Axios({
        method: 'get',
        url: 'https://frozen-plateau-23556.herokuapp.com/rooms/question',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.questions = data
        })
    },
    begin () {
      this.isDisabled = true
      this.problemsCount--
      this.timerCount = 5
      this.canAnswer = true
      this.startGameLabel = 'Next'
      this.randomIndex()
      this.question = this.questions[this.storeIndex.length - 1].clue
      this.choiceA = this.questions[this.storeIndex.length - 1].choices[0].choice
      this.choiceB = this.questions[this.storeIndex.length - 1].choices[1].choice
      this.choiceC = this.questions[this.storeIndex.length - 1].choices[2].choice
      this.choiceD = this.questions[this.storeIndex.length - 1].choices[3].choice
      const button = [this.storeIndex, this.isDisabled]
      socket.emit('play', (button))
    },
    randomIndex () {
      const randomIndex = Math.floor(Math.random() * 9)
      if (!this.storeIndex.length) {
        this.storeIndex.push(randomIndex)
      }
      for (let i = 0; i < this.storeIndex.length; i++) {
        if (this.storeIndex[i] !== randomIndex) {
          this.storeIndex.push(randomIndex)
          break
        } else {
          i = 0
        }
      }
    },
    checkAnswer (value) {
      this.disableButton = true
      if (value === this.answer) {
        this.score = 100 - ((this.timerCount - this.userTimer) * 3)
      } else {
        this.score = 0
      }
      const data = {
        username: localStorage.getItem('userName'),
        score: this.score
      }
      socket.emit('update-score', data)
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
    socket.on('play', data => {
      this.storeIndex = data[0]
      this.isDisabled = data[1]
      if (this.storeIndex.length - 1 === 4) {
        this.choiceA = this.questions[9].choices[0].choice
        this.choiceB = this.questions[9].choices[1].choice
        this.choiceC = this.questions[9].choices[2].choice
        this.choiceD = this.questions[9].choices[3].choice
      }
      this.choiceA = this.questions[this.storeIndex.length - 1].choices[0].choice
      this.choiceB = this.questions[this.storeIndex.length - 1].choices[1].choice
      this.choiceC = this.questions[this.storeIndex.length - 1].choices[2].choice
      this.choiceD = this.questions[this.storeIndex.length - 1].choices[3].choice
      this.answer = this.question = this.questions[this.storeIndex.length - 1].clue
    })
    socket.on('gameplay', data => {
      this.userTimer = data
      if (this.userTimer === 24) {
        this.disableButton = false
      }
      if (this.userTimer === 0) {
        this.disableButton = true
      }
    })
    socket.on('scoreBoard', data => {
      let scoreMax = 0
      let name = ''
      for (let i = 0; i < data.length; i++) {
        if (scoreMax < data[i].score) {
          scoreMax = data[i].score
          name = data[i].username
        }
      }
      this.winner = name
      localStorage.setItem('score', data)
    })
    this.fetchData()
  },
  //  computed () {
  //  userTime : () => {
  //    socket.on('gameplay', (data) => {
  //      this.userTimer = data
  //      console.log(this.userTimer)
  //    })
  //  }
  //  },
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
            this.problemsCount--
            socket.emit('clear-scoreBoard')
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
