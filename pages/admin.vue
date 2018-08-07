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

    <transition name="fade">
      <detail v-show="selectedRequest.wo_number" 
      :request="selectedRequest" :close="()=>{selectedRequest={}}" 
      :deadlineDisplay="deadlineDisplay"/>
    </transition>

  </div>
</template>

<script>
import detail from "~/components/detail"

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default {
  async mounted ( ) {
    const URL = process.env.NOODE_ENV ==="production" ?
     process.env.URL : `http://localhost:3000/getRequests`;
    
    let data = await fetch(URL)
    let requests = await data.json()
    this.requests=requests.sort((a,b)=>{return b.wo_number-a.wo_number})
  },
  components: {
    detail
  
  },

  data: () => ({
    requests: [],
    selectedRequest: {}
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

</style>
