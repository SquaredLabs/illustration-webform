<template>
  <div class="formContainer">
      
      <div class="panel">
        <div class="request title">
          <h4 class="wo">#</h4> 
          <h4 class="name">Name</h4> 
          <h4 class="deadline">Deadline</h4> 
        </div>
        <div  v-for="request in requests" :key="request.wo">
          <div class="request">
            <h4 class="wo">{{request.wo_number}}</h4> 
            <h4 class="name">{{request.contactName}}</h4> 
            <h4 class="deadline">{{deadlineDisplay(request)}}</h4> 
          </div>
          
        </div>
      </div>
  </div>
</template>

<script>
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default {
  async asyncData ( ) {
    const URL = process.env.NOODE_ENV ==="production" ?
     process.env.URL : `http://localhost:3000/getRequests`;
    
    let data = await fetch(URL)
    let requests = await data.json()
    
    return {requests:requests}
  },
  components: {

  
  },

  data: () => ({
    requests: []
  }),
  computed: {
    
   
  },
  methods: {
    deadlineDisplay(request){
      let date = request.deadlineDate;
      return date !== '' ? date : 'N/A'
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
}
.request {
  display: flex;
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5rem;
  margin-top: 1em;
  border-radius: 2px;
  background: white;
}
.title {
  font-size: 1.3rem;
}
.request * {
  margin: 0 1rem 0 1rem;
  width: 6rem;
}
.wo {
  
}
.name {

}
.deadline {

}

</style>
