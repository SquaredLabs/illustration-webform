<template>
  <div class = "alert" v-show="text!=''">
    <h3>Alert:</h3>
    <p>{{text}}</p>
    <button class="copyContact alertButton" v-on:click="clear">Okay</button>
  </div>
</template>
<script>
export default {
  props:{
    text: {required: true, type: String},
    clear: {required: true, type: Function}
  }
}
</script>
<style scoped>
.alert {
  position: fixed;
  z-index: 5;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid black 2px;
  border-radius: 2px;
}

.alert p {
  margin: 1em 0 1em 0;
}

.alertButton {
  width: 50%;
}
</style>

