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
      <h1>[squared labs] Scientific Illustration Request</h1>
    </div>

    <div class="form oneliner">
      <h2 class="question">Is this a journal cover illustration request?</h2>

      <span class="questionSub">YES *Free Service</span>
      <checkBox id="YES" :model.sync="cover" :value="true" type="radio" name="serviceCover" />

      <span class="questionSub">NO *Paid Service</span>
      <checkBox id="NO" :model.sync="cover" :value="false" type="radio" name="serviceCover" />
    </div>

    <hr>

    <div class="form">
      <h2 class="question">Provide a brief description of what you would like illustrated:</h2>
      <textarea v-model="description" class="description textInput" placeholder="description"/>
    </div>

    <hr>

    <div class="form oneliner">
      <h2 class="question">Is there a hard deadline?</h2>
      <div class="deadlineSelect">
        <p>Yes: </p>
        <datePicker v-model="deadlineDate" input-class="textInput" name="uniquename" @selected="checkDate"/>
        <p>No</p>
        <checkBox :change="checkDate" :model.sync="deadline" :value="false" type="radio" name="deadline" />
      </div>
    </div>

    <hr>

    <div class="form">
      <h2 class="question">If available, please attach the following:</h2>
        <h3 class="question file">A copy of the article/draft for the illustrators to reference</h3>
        <dropzone id="article" ref="article" :options="uploadOptions" :destroyDropzone="true"></dropzone>
        <h3 class="question file">Any reference photos for content or style</h3>
        <dropzone id="reference" ref="reference" :options="uploadOptions" :destroyDropzone="true"></dropzone>
        <h3 class="question file">Any additional illustrations that will be included with the anticipated illustration</h3>
        <dropzone id="additional" ref="additional" :options="uploadOptions" :destroyDropzone="true"></dropzone>
        <h3 class="question file">The initial illustration (in the case of a remake of an existing illustration)</h3>
        <dropzone id="original" ref="original" :options="uploadOptions" :destroyDropzone="true"></dropzone>
    </div>
    <hr>

    <div class="form">
      <h2 class="question">If relevant, please provide the name of the journal 
      where the work will be submitted
      (for the illustrators to work within journal standards).
      </h2>
      <input v-model="journalName" type="text" class="textInput">
    </div>

    <hr>

    <div class="form">
      <h2 class="question">Primary contact information:</h2>
      <div class="oneliner">
        <input v-model="contactName" type="text" class="textInput" placeholder="Full Name">
        <input v-model="contactEmail" type="text" class="textInput" placeholder="Email">
        <input v-model="contactPhone" type="text" class="textInput" placeholder="Phone">
      </div>
    </div>
    <hr>

    <div v-show="!cover" class="form">
      <h2 class="question">Expected KFS account number note, 
      there will be no billing until a preliminary quote is provided):
      </h2>
      <input v-model="KFS" type="text" class="textInput" placeholder="KFS"> 
    </div>

    <hr>

    <div class="form">
      <button :class="{disabled: submitText!=='Submit'}" class="button" @click="submit">{{ submitText }}</button>
    </div>
    
  </div>
</template>

<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";
import checkBox from "~/components/checkBox.vue";
import datePicker from "vuejs-datepicker";

const verifyForm = require("~/lib/VerifyForm");
require("es6-promise").polyfill();
require("isomorphic-fetch");

function submitFile(dropzone, wo) {
  if (dropzone.getQueuedFiles().length === 0) return;
  dropzone.on("sending", function(file, xhr, formData) {
    formData.append("wo", wo);
  });
  dropzone.processQueue();
}

export default {
  components: {
    checkBox,
    datePicker,
    Dropzone
  },

  data: () => ({
    cover: false,
    description: "",
    deadline: false,
    deadlineDate: "",
    journalName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    KFS: "",
    alertText: "",
    uploadOptions: {
      url: "/api/uploadFile",
      autoProcessQueue: false,
      paramName: "file"
    }
  }),

  computed: {
    submitText() {
      let errorText = verifyForm(this.$data);
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
      let response = await fetch("/api/submit", {
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
        let wo = jsonRes.wo;
        submitFile(this.$refs.article.dropzone, wo);
        submitFile(this.$refs.reference.dropzone, wo);
        submitFile(this.$refs.additional.dropzone, wo);
        submitFile(this.$refs.original.dropzone, wo);
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
        //article,reference,additional,original
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
  justify-content: space-between;
  flex-wrap: wrap;
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
  background: rgba(0, 0, 0, 0.05);
  outline: none;
  border: none;
  padding: 1em;
  font-size: 0.9em;
  color: black;
  transition: all 0.3s ease;
  border-radius: 3px;
  margin-top: 1em;
}

.textInput:hover {
  background: rgba(0, 0, 0, 0.1);
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
