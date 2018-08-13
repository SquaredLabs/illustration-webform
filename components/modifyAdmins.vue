<template>
  <div class="admins">
    <alert :text="alertText" :clear="()=>alertText=''"/>
      
    <div class="adminBox">
      <div class="header">
        <h1 class="">Admin List</h1>
        <h1 class="close" @click="close">✖</h1>
      </div>
      <div class="list">
        <div class="admin" v-for="admin in admins" :key=admin>
          <span class="name">{{admin}}</span>
          <button class="del" @click="remove(admin)">
            ☒
          </button>
        </div>
      </div>

      <div class="controls">
        <input class ="control adminText" v-model="netID" type="text" placeholder="netID"/>
        <button class="control add" @click="add">+</button>
      </div>

    </div>
  </div>
</template>

<script>
import alert from "~/components/alert"

require('es6-promise').polyfill();
require('isomorphic-fetch');
const getURL = function(){
    return process.env.NODE_ENV ==="production" ?
     process.env.URL : `http://localhost:3000`;
}


export default {
  props: {

    close: { type: Function, required: true }
  },
  components:{
    alert
  },
  data: () =>({
    netID:"",
    admins: [],
    alertText: '',
  }),
  async mounted ( ) {
    await this.get()
  },
  methods:{
    async add(){
      let URL = getURL()
      let data = await fetch(`${URL}/addAdmin/${this.netID}`)
      this.alertText = await data.text()
    },
    async remove(netID){
      let URL = getURL()
      let data = await fetch(`${URL}/removeAdmin/${netID}`)
      this.alertText = await data.text()
      await this.get()
    },
    async get(){
      let URL = getURL()
      let data = await fetch(URL+'/getAdmins')
      let admins = await data.json()
      this.admins = admins.map(admin=>admin.netID)
      await this.get()
    }
  }
};
</script>


<style scoped>
.admins {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0.5);
}
.adminBox {
  background: #f43f3e;
  font-size: 1.1em;
  position: absolute;
  border-radius: 3px;
  width: 70%;
  height: 70%;
  min-width: 300px;
  min-height: 300px;
  padding: 1em;
  color: white;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.admin {
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: black;
  font-size: 1.2em;
  margin-top: 1em;
  padding: 0.5em;
  width: 80%;
  border-radius: 3px;
}
.del {
  border: none;
  outline: none;
  color: #f43f3e;
  font-size: 1.3em;
  background-color: white;
  transition: all 0.3s ease;
  border-radius: 3px;
}
.del:hover {
  cursor: pointer;
  font-size: 1.5em;
  background-color: #f43f3e;
  color: white;
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: black;
  padding: 0.3em;
  width: 100%;
  height: 3em;
  border-radius: 3px;
}
.controls {
  position: absolute;
  bottom: 10px;
  width: 50%;
  display: flex;
}
.control {
  font-size: 2em;
  border: none;
  border-radius: 3px;
  outline: none;
  padding: 0.2em;
  color: #f43f3e;
  background-color: rgb(236, 236, 236);
  transition: ease 0.3s all;
}
.control:hover {
  cursor: pointer;
  background-color: white;
}
.control.adminText:hover {
  cursor: text;
}
.control.add {
  margin-left: 0.5em;
}
.close {
  transition: all 0.3s ease;
}
.close:hover {
  cursor: pointer;
  align-self: flex-end;
  color: #f43f3e;
}
</style>


