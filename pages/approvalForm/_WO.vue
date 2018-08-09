<template>
  <div class="formContainer">

    <div class = "alert" v-show="alertText!=''">
      <h3> Submitted: </h3>
      <p>{{alertText}}</p>
      <button class="copyContact alertButton" v-on:click="alertText=''">Okay</button>
    </div>

    <div class ="form branding">
      <p>UCONN</p>
      <p>Squared Labs</p>
    </div>

    <div class ="form title">
      <h1>[squared labs] Scientific Illustration Client Agreement</h1>
    </div>

    <div class="form oneliner">
      <h2 class="question">KFS Number (For billing)</h2>
      <input type="text" v-model="KFS" class="textInput" placeholder="KFS"/>

    </div>

    <hr>

    <div class="form oneliner">
      <h2 class="question">Scope of Work:</h2>
      <div class="oneliner">
        <p class="scopeLine compact">
        Based on discussions with
        <input v-model="contactName" type="text" class="textInput tiny" placeholder="Client">
        ,
        <input v-model="illustrator" type="text" class="textInput tiny" placeholder="Illustrator">
        </p>
        <p class="scopeLine compact">
        expects the project to take
        <input v-model="hours" type="text" class="textInput tiny" placeholder="Hours">
        (+-
        <input v-model="hoursPM" type="text" class="textInput tiny" placeholder="Hours">
        )
        </p>
        <div class="scopeLine">
          The agreed upon deadline for the 1st draft (if necessary)
          <datePicker v-model="deadline1" placeholder="Date" input-class="textInput tiny" name="uniquename"/>
        </div>
        <div class="scopeLine">
          The agreed upon deadline for the 2nd draft (if necessary) 
          <datePicker v-model="deadline2" placeholder="Date" input-class="textInput tiny" name="uniquename"/>
        </div>
        <div class="scopeLine"> 
          The agreed upon deadline for the final illustration
          <datePicker v-model="deadlineFinal" placeholder="Date" input-class="textInput tiny" name="uniquename"/>
        </div>
      </div>
      
    </div>

    <hr>

    <div class="form">
      <h2 class="question">NOTES:</h2>
      <p>
        It is the responsibility of the client to respond to drafts within 2 business days. 3 rounds of edits 
        will be the maximum unless there are changes due to an illustrator mistake. Larger changes that modify 
        scope, such as changing the whole layout, changing a majority of the imagery, etc. may either be denied 
        or may necessitate the establishment of a new project.
        Squared Labs, as well as the illustrator who created the piece, retain the right to use the piece for 
        either advertising or as part of a personal portfolio. 
        Illustrations are created individually for labs. Squared Labs will never give your illustration to 
        another lab or journal to use without prior permission.
        Upon completion of the illustration, you will receive a JPG, PDF, and (if there is one) an Adobe AI 
        file of the completed work. Originals (in a non-digital medium) will be retained by the illustrator.
        Clients will be required to provide email confirmation that the work was received.
        Clients agree to notify Squared Labs upon final public display of the illustration (journal article, 
        website, poster, etc.) and allow Squared Labs to use this information for further promotion of the service 
        (if you take a picture of the illustration in final print that’s even better!)
      </p>
      
    </div>

    <div class="form">
      <div class="oneliner">
        <input v-model="contactName" type="text" class="textInput" placeholder="Contact Name"> 
        <input v-model="contactSig" type="text" class="textInput" placeholder="Contact Signature"> 
        <datePicker v-model="signDate1" input-class="textInput" name="uniquename" placeholder="Date"/>
      </div>
      <div class="oneliner">
        <input v-model="illustrator" type="text" class="textInput" placeholder="Illustrator Name"> 
        <input v-model="illustratorSig" type="text" class="textInput" placeholder="Illustrator Signature"> 
        <datePicker v-model="signDate2" input-class="textInput" name="uniquename" placeholder="Date"/>
      </div>
    </div>

    <hr>

    <div class="form">
      <button :class="{disabled: submitText!=='Submit'}" class="button" @click="submit">{{ submitText }}</button>
    </div>
    
  </div>
</template>

<script>
// import checkBox from "~/components/checkBox.vue";
import datePicker from "vuejs-datepicker";

const verifyForm = require("~/lib_comp/VerifyForm");
require("es6-promise").polyfill();
require("isomorphic-fetch");

export default {
  components: {
    datePicker,
  },

  data: () => ({
    contactName: "",
    KFS: "",
    alertText: "",
    illustrator: "",
    contactName: "",
    hours:0,
    hoursPM:0,
    deadline1:'',
    deadline2:'',
    deadlineFinal:'',
    contactSig:"",
    illustratorSig:"",
    signDate1:"",
    signDate2:"",
  }),

  computed: {
    submitText() {
      let errorText = verifyForm(this.$data, 'approve');
      return errorText || "Submit";
    }
  },

  methods: {
    checkDate(date) {
      if (date !== null) return (this.deadline = true);
      this.deadlineDate = "";
      return (this.deadline = false);
    },
    async submit() {
      let response = await fetch("/api/approve", {
        method: "post",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(this.$data)
      });
      if (response.status >= 400) {
        console.error("Bad response from server");
      }
      let jsonRes = await response.json();
      this.alertText = jsonRes.text;
      if (jsonRes.status === 1) {
        if (process.env.NODE_ENV == "development") return;
        this.cover = false;
        this.description = "";
        this.deadline = false;
        this.deadlineDate = "";
        this.journalName = "";
        this.contactName = "";
        this.contactEmail = "";
        this.contactPhone = "";
        this.KFS = "";
      }
    }
  }
};
</script>

<style>

.formContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 6em 20px 6em;
}

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

.question.file {
  margin-top: 3em;
  font-size: 1em;
}

.oneliner {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 1em;
}

.scopeLine {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}

.scopeLine.compact {
  justify-content: flex-start;
}

.deadlineSelect {
  display: flex;
  justify-content: center;
  height: 1em;
  align-items: center;
  font-size: 0.5em;
  width: 15em;
}

.deadlineSelect * {
  margin-left: 0.7em;
}

.textInput {
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  border: none;
  padding: 1em;
  font-size: 0.9em;
  color: black;
  transition: all 0.3s ease;
  border-radius: 3px;
  margin-left: 1em;
}

.textInput:hover {
  background: rgba(0, 0, 0, 0.1);
}

.textInput.tiny {
  font-size: 0.7em;
  margin-top: 0;
  display: inline-block;
  width: 9em;
  margin: 0.1em;
  margin-left: 0.5em;
}

.button {
  background: rgba(0, 141, 0, 0.287);
  outline: none;
  border: none;
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

.button.disabled {
  background: rgba(255, 0, 0, 0.315);
  pointer-events: none;
}

</style>