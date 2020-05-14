<template>
<div>
    <p class="username">Hi Amir, what do you want?</p>
    <div class="cardRoomList mx-auto">
        <form class="cardRoom" @submit.prevent="joinGame">
            <p class="title">Join Room bray</p>
            <input type="text" class="roomName" v-model="joinName">
            <button type="submit">join room</button>
        </form>
        <form class="cardRoom" @submit.prevent="toGame">
            <p>Insert room name :</p>
            <input class="roomName" type="text" placeholder="room name" v-model="roomName">
            <input class="submit" type="submit" value="Create Room">
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Room',
  data () {
    return {
      roomName: '',
      message: '',
      joinName: ''
    }
  },
  methods: {
    toGame () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/rooms',
        data: {
          name: this.roomName
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.message = data.msg
          return axios({
            method: 'patch',
            url: 'http://localhost:3000/users/getroom',
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
        url: 'http://localhost:3000/users/joinroom',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: this.joinName
        }
      })
        .then(({ data }) => {
          this.message = data.msg
          console.log(this.message)
          this.$router.push('/game')
        })
    }
  }
}
</script>

<style scoped>
.username {
    font-weight: bold;
    font-size: 35px;
}
.cardRoomList{
    display: flex;
    width: 80vw;
    justify-content: center;
    margin-top: 90px;
}
.cardRoom {
    background:blue;
    width: 20vw;
    height: 40vh;
    border-radius: 20px;
    padding: 100px 0 0 0;
}
.title {
    color: #ffffff;
    font-size: 35px;
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: 2px;
}
button {
    margin-top: 80px;
    color: white;
    text-transform: capitalize;
    border-radius: 20px;
    width: 10vw;
    height: 4vh;
    font-size: 18px;
    font-weight: bold;
    background: none;
}
button:focus {
    outline: none;
}
button:hover {
    color: blue;
    border: none;
    background: white;
    font-weight: bold;
}
.cardRoom {
    background:blue;
    width: 20vw;
    height: 40vh;
    border-radius: 20px;
    padding: 100px 0 0 0;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    padding: 80px 40px 0 40px;
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
}
.roomName:focus {
    outline: none;
}
.submit{
    margin-top: 80px;
    color: white;
    text-transform: capitalize;
    border-radius: 20px;
    width: 10vw;
    height: 4vh;
    font-size: 18px;
    font-weight: bold;
    background: none;
    margin-left: 20%;
}
.submit:hover {
    color: blue;
    border: none;
    background: white;
    font-weight: bold;
}
.submit:focus {
    outline: none;
}
</style>
