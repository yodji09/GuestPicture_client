<template>
<div>
    <p class="username">Hi Amir, what do you want?</p>
    <div class="cardRoomList mx-auto">
        <div class="cardRoom">
            <p class="title">Room 1 bray</p>
            <button @click.prevent="toGame">join room</button>
        </div>
        <div class="createRoom" @submit.prevent="toGame" >
            <p>Insert room name :</p>
            <input class="roomName" type="text" placeholder="room name" v-model="roomName">
            <input class="submit" type="submit" value="Create Room">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data () {
    return {
      roomName: ''
    }
  },
  methods: {
    toGame () {
      this.$router.push('/game')
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
.createRoom {
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
.createRoom p {
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
