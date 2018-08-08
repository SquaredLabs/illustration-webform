<template>
  <div class="link">
    <p>{{capitalizedType}}: 
      <a v-if="request[keyName]!='None'" :href="'/getFile/'+request[keyName]" download>{{displayName}}</a>
      <span v-else>{{displayName}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    request: { type: Object, required: true },
    keyName: {type: String, required: true}
  },
  computed:{
    displayName(){
      let path = this.request[this.keyName]
      if(!path) return
      return path.split('/').pop()
      
    },
    capitalizedType(){
      return this.keyName.charAt(0).toUpperCase() + this.keyName.substr(1);
    }
  }
};
</script>


<style scoped>

</style>


