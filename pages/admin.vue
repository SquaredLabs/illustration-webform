<template>
  <div class="formContainer">
      
    <div class="panel" v-bind:class="{blurred: selectedRequest.wo_number}">
      <div class="request title">
        <h4 class="wo">#</h4> 
        <h4 class="name">Name</h4> 
        <h4 class="deadline">Deadline</h4> 
        <h4>Status</h4> 
      </div>

      <div v-for="request in requests" :key="request.wo" @click="selectedRequest = request">
        <div class="request listing">
          <h4 class="wo">{{request.wo_number}}</h4> 
          <h4 class="name">{{request.contactName}}</h4> 
          <h4 class="deadline">{{deadlineDisplay(request)}}</h4> 
          <h4>{{statusDisplay(request)}}</h4>
        </div>
      </div>
    </div>
    <footer>
      <button @click="adminShown=true">Add Administrators</button>
    </footer>

    <transition name="fade">
      <detail v-show="selectedRequest.wo_number" 
      :request="selectedRequest" :close="()=>{selectedRequest={}}" 
      :deadlineDisplay="deadlineDisplay"/>
    </transition>

    <transition name="fade">
      <modifyAdmins v-show="adminShown" 
      :close="()=>{adminShown=false}" 
      :admins="admins"/>
    </transition>

  </div>
</template>

<script>
import detail from "~/components/detail"
import modifyAdmins from "~/components/modifyAdmins"

require('es6-promise').polyfill();
require('isomorphic-fetch');

const setFilePaths = function(request){
  console.log(request.article)
  request.article = request.article || 'None'
  request.reference = request.reference || 'None'
  request.additional = request.additional || 'None'
  request.original = request.original || 'None'
}

export default {
  async mounted ( ) {
    const URL = process.env.NOODE_ENV ==="production" ?
     process.env.URL : `http://localhost:3000`;
    
    let data = await fetch(URL+'/getRequests')
    let requests = await data.json()
    this.requests = requests.sort((a,b)=>{return b.wo_number-a.wo_number})
    requests.forEach(setFilePaths)
  },
  components: {
    detail,
    modifyAdmins
  
  },

  data: () => ({
    requests: [],
    selectedRequest: {},
    admins: ['cam13052'],
    adminShown: false
  }),
  computed: {
    
   
  },
  methods: {
    deadlineDisplay(request){
      let date = request.deadlineDate;
      if(!date || date === '') return 'N/A'
      return date.split('T')[0]
    },
    statusDisplay(request){
      let status = request.status;

      switch(status){
        case null: return 'NEW'
        case 0:return 'NEW'
        case 1:return 'Pending Signature'
        case 2:return 'COMPLETE'
      }
    }
  }
}
</script>

<style>

.formContainer {
  display: flex;
  justify-content: center;
  background: #e1e2e1;
  height: 100%;
  width: 100%;
  position: absolute;
}

.panel {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 1em;
  height: auto;
  position: absolute;
  background: #f5f5f6;
  border-radius: 3px;
  padding: 2em;
  transition: all 0.3s ease;
}
.blurred {
  filter: blur(1px);
  -webkit-filter: blur(1px);
  -moz-filter: blur(1px);
  -o-filter: blur(1px);
  -ms-filter: blur(1px);
}

.request {
  display: flex;
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem;
  margin-top: 1em;
  border-radius: 2px;
  background: white;
  transition: ease 0.3s all;
}

.request.listing:hover {
  background: #f43f3e;
  color: white;
  cursor: pointer;
}

.title {
  font-size: 1.3rem;
  background: #f43f3e;
  color: white;
}

.request * {
  margin: 0 1rem 0 1rem;
  width: 6rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

footer {
  position: fixed;
  bottom: 1em;
}
footer button {
  color: white;
  background-color: #f43f3e;
  border: none;
  outline: none;
  padding: 1em;
  font-size: 1.2em;
  border-radius: 3px;
  border: solid transparent 1px;
  transition: all ease 0.3s;
}
footer button:hover {
  background-color: white;
  color: #f43f3e;
  cursor: pointer;
  border-color: black;
  
}

</style>
