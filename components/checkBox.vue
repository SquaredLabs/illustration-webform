<template>
  <div>
    <label class="control control-radio">
      <input :name="name" :value="value" :checked= "computedVal" 
             type="radio" class="radioButton" 
             @change="change(null)" @input="$emit('update:model', value)">
      <div class="control_indicator"/>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    model: {
      type: Boolean,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    change: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    computedVal() {
      return this.value === this.model;
    }
  }
};
</script>


<style scoped>
.control {
  font-family: arial;
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 5px;
  padding-top: 1px;
  cursor: pointer;
  font-size: 16px;
}
.control input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.control_indicator {
  position: absolute;
  top: -5px;
  left: 0;
  height: 20px;
  width: 20px;
  background: #e6e6e6;
  border: 2px dashed #000000;
}
.control-radio .control_indicator {
  border-radius: 3%;
}

.control:hover input ~ .control_indicator,
.control input:focus ~ .control_indicator {
  background: #cccccc;
}

.control input:checked ~ .control_indicator {
  background: #2aa1c0;
}
.control:hover input:not([disabled]):checked ~ .control_indicator,
.control input:checked:focus ~ .control_indicator {
  background-color: #0e6647d;
}
.control input:disabled ~ .control_indicator {
  background: #e6e6e6;
  opacity: 0.6;
  pointer-events: none;
}
.control_indicator:after {
  box-sizing: unset;
  content: "";
  position: absolute;
  display: none;
}
.control input:checked ~ .control_indicator:after {
  display: block;
}
.control-radio .control_indicator:after {
  left: 6px;
  top: 6px;
  height: 0px;
  width: 0px;
  border-radius: 50%;
  background: #ffffff;
}
.control-radio input:disabled ~ .control_indicator:after {
  background: #7b7b7b;
}
</style>
