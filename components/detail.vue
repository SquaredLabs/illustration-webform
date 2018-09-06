<template>
  <div class="detail">
    <div class="detailBox">
      <div class="header">
        <h1 class="">Request #{{request.wo_number}} </h1>
        <h1 class="">Submitted By: {{request.contactName}}</h1>
        <h1 class="close" @click="close">✖</h1>
      </div>

      <div class="data">
        <div class="contact">
          <h2 class="coreHeader">Contact </h2>
          <h4>Email: {{request.contactEmail}} </h4>
          <h4>Phone: {{request.contactPhone}} </h4>
          <h4>KFS: {{request.KFS}}</h4>
        </div>

        <div class="deadline">
          <h2 class="coreHeader">Deadline</h2>
          <h4>{{deadlineDisplay(request)}} </h4>
        </div>

        <div class="description">
          <h2 class="coreHeader">Description</h2>
          <div>{{request.description}} </div>
        </div>
        <!-- article reference  additional  original -->
        <div class="files">
          <h2 class="coreHeader">Files</h2>
          <fileLink :request="request" keyName="article"/>
          <fileLink :request="request" keyName="reference"/>
          <fileLink :request="request" keyName="additional"/>
          <fileLink :request="request" keyName="original"/>
        </div>
      </div>

      <div class="controls">
        <button class="control approve" @click="loadContract">{{contractText}}</button>
      </div>
    </div>
  </div>
</template>

<script>

import fileLink from '~/components/fileLink'
export default {
  components:{
    fileLink
  },
  props: {
    request: { type: Object, required: true },
    deadlineDisplay: { type: Function, required: true },
    close: { type: Function, required: true }
  },
  methods:{
    async loadContract(){
      let woEncrypted = await this.getEncryptedWO(this.request.wo_number)
      this.$router.push(`approvalForm/${woEncrypted}`)
    },
    async getEncryptedWO(WO){
      let data = await fetch(`/getEncryptedWO/${WO}`,{credentials: 'same-origin'})
      let encrypted = await data.text()
      return encrypted
    }
  },
  computed: {
    contractText(){
      switch(this.request.status){
        case null || 0:
          return 'Create Contract'
          break
        case 1: 
          return 'View Contract'
          break
        case 2:
          return 'View Signed Contract'
          break
      }
    }
  }
};
</script>


<style scoped>
.detail {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0.5);
}
.detailBox {
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
.data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1em;
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: white;
  color: black;
  padding: 0.3em;
  width: 100%;
  height: 3em;
  font-size: 0.7em;
  border-radius: 3px;
}
.coreHeader {
  background-color: white;
  color: black;
  display: inline-block;
  border-radius: 3px;
  padding: 5px;
  margin: 0.3em 0 0.3em 0;
}
.controls {
  position: absolute;
  bottom: 10px;
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.control {
  font-size: 2em;
  border: none;
  border-radius: 3px;
  outline: none;
  padding: 0.2em;
  color: #f43f3e;
  transition: ease 0.3s all;
}
.control:hover {
  cursor: pointer;
  background-color: white;
}
.approve {
  background-color: rgb(236, 236, 236);
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
