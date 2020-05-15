<template>
<div>
    <p class="username">Hi {{userName}}, what do you want?</p>
    <div class="cardRoomList mx-auto">
        <form class="cardRoomJoin" @submit.prevent="joinGame">
            <p class="title">Join Room bray</p>
            <input type="text" class="roomName" placeholder="insert room name" v-model="joinName">
            <button type="submit">join room</button>
        </form>
        <form class="cardRoomCreate" @submit.prevent="toGame">
            <p class="title">Insert room name:</p>
            <input class="roomName" type="text" placeholder="room name" v-model="roomName">
            <input class="submit" type="submit" value="Create Room">
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//  import { Socket } from 'net'
import socket from '../config/socket'
export default {
  name: 'Room',
  data () {
    return {
      roomName: '',
      message: '',
      joinName: '',
      userName: localStorage.getItem('userName')
    }
  },
  methods: {
    toGame () {
      axios({
        method: 'post',
        url: 'https://frozen-plateau-23556.herokuapp.com/rooms',
        data: {
          name: this.roomName
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.message = data.msg
          localStorage.setItem('roomName', this.roomName)
          localStorage.setItem('status', true)
          return axios({
            method: 'patch',
            url: 'https://frozen-plateau-23556.herokuapp.com/users/getroom',
            data: {
              name: data.result.name,
              id: data.result.id
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
        })
        .then(({ data }) => {
          this.$router.push('/game')
        })
        .catch(err => {
          console.log(err)
        })
    },
    joinGame () {
      axios({
        method: 'patch',
        url: 'https://frozen-plateau-23556.herokuapp.com/users/joinroom',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: this.joinName
        }
      })
        .then(({ data }) => {
          this.message = data.msg
          localStorage.setItem('roomName', this.joinName)
          localStorage.setItem('status', false)
          console.log(this.message)
          socket.emit('user-connect', this.userName)
          this.$router.push('/game')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.username {
    font-weight: bold;
    font-size: 35px;
    margin-top: 50px;
    color: #4d4e52;
}
.cardRoomList{
    display: flex;
    width: 80vw;
    justify-content: center;
    margin-top: 20px;
}
.cardRoomJoin {
    background:#409d7e;
    width: 20vw;
    height: 50vh;
    border-radius: 20px;
    padding: 40px 0 0 0;
    margin: 0 40px 0;
}
.title {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: 1px;
}
button {
    margin-top: 80px;
    color: #409d7e;
    text-transform: capitalize;
    border-radius: 20px;
    width: 12vw;
    height: 6vh;
    font-size: 18px;
    font-weight: bold;
    background: white;
    border: none;
}
button:focus {
    outline: none;
}
button:hover {
    color: white;
    border: 2px solid white;
    background: #409d7e;
    font-weight: bold;
}
.cardRoomCreate {
    background:rgb(75, 75, 245);
    width: 20vw;
    height: 50vh;
    border-radius: 20px;
    padding: 40px 0 0 0;
}
.cardRoom p {
    color: white;
    font-size: 20px;
    text-align: left;
    padding-left: 10px;
}
.roomName {
    padding: 10px 0 10px 20px;
    border-radius: 20px;
    border: none;
    /* font-weight: bold; */
}
.roomName:focus {
    outline: none;
}
.submit{
    margin-top: 80px;
    color: rgb(75, 75, 245);
    text-transform: capitalize;
    border-radius: 20px;
    width: 12vw;
    height: 6vh;
    font-size: 18px;
    font-weight: bold;
    background: white;
    border: none;
}
.submit:hover {
    color: white;
    border: 2px solid white;
    background: rgb(75, 75, 245);
    font-weight: bold;
}
.submit:focus {
    outline: none;
}
</style>
