<template>
<b-container>
  <b-row  align-v="center" class="row">
    <b-form class="w-50 mx-auto" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group>
      <p>Insert Your Cool Name</p>
        <b-form-input
          id="input-2"
          v-model="form.name"
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
      form: {
        name: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
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
