<template>
  <div class="formContainer">
    <div class ="form branding">
      <p>UCONN</p>
      <p>Squared Labs</p>
    </div>

    <div class ="form title">
      <h1>[squared labs] Scientific Illustration Request</h1>
    </div>

    <div class="form oneliner">
        <h2 class="question">Is this a journal cover illustration request?</h2>

        <span class="questionSub">YES *Free Service</span>
        <checkBox type="radio" id="YES" name="serviceCover" :model.sync="cover" :value="true"  />

        <span class="questionSub">NO *Paid Service</span>
        <checkBox type="radio" id="NO"  name="serviceCover" :model.sync="cover" :value="false" />

    </div>
    <hr>

    <div class="form">
      <h2 class="question">Provide a brief description of what you would like illustrated:</h2>
      <textarea class="description textInput" v-model="description" placeholder="description"></textarea>
    </div>
    <hr>

    <div class="form oneliner">
      <h2 class="question">Is there a hard deadline?</h2>
      <div class="deadlineSelect">
        <p>Yes: </p>
        <datePicker input-class="textInput" v-model="deadlineDate" v-on:selected="checkDate" name="uniquename"></datePicker>
        <p>No</p>
        <checkBox type="radio" name="deadline" :change="checkDate" :model.sync="deadline" :value="false" />
      </div>
      
      
    </div>
    <hr>

    <div class="form">
      <h2 class="question">If available, please attach the following:</h2>
      
    </div>
    <hr>

    <div class="form">
      <h2 class="question">If relevant, please provide the name of the journal 
        where the work will be submitted
         (for the illustrators to work within journal standards).
      </h2>
      <input type="text" class="textInput" v-model="journalName"/>
      
    </div>
    <hr>

    <div class="form">
      <h2 class="question">Primary contact information:</h2>
      <div class="oneliner">
        <input type="text" class="textInput" v-model="contactName" placeholder="Full Name"/>
        <input type="text" class="textInput" v-model="contactEmail" placeholder="Email"/>
        <input type="text" class="textInput" v-model="contactPhone" placeholder="Phone"/>
      </div>
    </div>
    <hr>

    <div class="form">
      <h2 class="question">Expected KFS account number note, 
        there will be no billing until a preliminary quote is provided):
      </h2>
      <input type="text" class="textInput" v-model="KFS" placeholder="KFS"/>
      
      
    </div>
    <hr>
    <div class="form">
      <button class="button" v-bind:class="{disabled: submitText!=='Submit'}" v-on:click="submit">{{submitText}}</button>
      
      
    </div>
    


  </div>
</template>

<script>

import checkBox from "~/components/checkBox.vue"
import datePicker from 'vuejs-datepicker';

const getErrorFor = (object, keysToCheck)=>{
  for(let key of keysToCheck){
    if(object[key]===undefined)console.error('Object does not have key: '+key)
    if(object[key]==='')return `Missing Field: ${key}`
  }
  return 0;
}

export default {
  components: {
    checkBox,
    datePicker
  },

  data:() => ({
    cover: false,
    description: '',
    deadline: false,
    deadlineDate: '',
    journalName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    KFS: '',
  }),
  methods:{
    checkDate(date){
      if(date!==null) return this.deadline=true;
      this.deadlineDate=''
      return this.deadline=false;
    },
    submit(){
      alert('submit')
    },
  },
  computed: {
    submitText(){
      let keysToCheck = ['description', 'contactName', 'contactEmail', 'contactPhone', 'KFS']
      let errorText = getErrorFor(this.$data, keysToCheck)
      return  errorText || 'Submit';

    }
  }
}
</script>

<style>
.formContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 6em 20px 6em; 
}
.form {
  margin-top: 2em;
  margin-bottom: 4em;
}
.branding {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.title {
  margin-top: 4em;
  text-align: center;
  font-family: "SpaceMono";
  font-size: 80%;
  font-weight: 300;
}
.question {
  margin-bottom: 2em;
  font-size: 1.1em;
}
.oneliner {
  display: flex;
  justify-content: space-between;
}
.description {
  width: 100%;
  height: 5em;
  margin-top: 2em;
}
.deadlineSelect {
  display: flex;
  justify-content: center;
  height: 1em;

  align-items: center;
}
.deadlineSelect * {
  margin-left: 0.7em;
}
.textInput {
  background: rgba(0,0,0,0.05);
  outline: none;
  /* border: solid rgba(0,0,0,0.3) 1px; */
  border:none;
  padding: 1em;
  font-size: 0.9em;
  color: black;
  transition: all 0.3s ease;
  border-radius: 3px;
}
.textInput:hover {
  background: rgba(0,0,0,0.1);
}
.button {
  background: rgba(0, 141, 0, 0.287);
  outline: none;
  /* border: solid rgba(0,0,0,0.3) 1px; */
  border:none;
  padding: 1em;
  font-size: 0.9em;
  color: black;
  transition: all 0.3s ease;
  border-radius: 3px;
  width: 100%;
}
.button:hover {
  background: rgba(0, 141, 0, 0.116);
  cursor: pointer;
}
.button.disabled{
  background: rgba(255, 0, 0, 0.315);
  pointer-events: none;
}

</style>
