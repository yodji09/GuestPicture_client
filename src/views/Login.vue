<template>
<b-container>
  <b-row  align-v="center" class="row">
    <b-form class="w-50 mx-auto" @submit.prevent="login">
      <b-form-group>
      <p>Insert Your Cool Name</p>
        <b-form-input
          id="input-2"
          v-model="userName"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      show: true
    }
  },
  methods: {
    login () {
      localStorage.setItem('userName', this.userName)
      this.$router.push('/room')
      this.userName = ''
    }
  }
}
</script>

<style scoped>
.row {
  padding-top: 30%;
}
p {
  font-family: 'Chango', cursive;
  font-size: 25px;
  font-weight: bold;
  color: #bd392a;
}
</style>
