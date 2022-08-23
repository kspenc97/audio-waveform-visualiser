<template>
  <div class="buttonHero">
    <button value="+1" @click="effectButtonClick($event)">+1 {{this.buttonType}}</button>
    <button value="0" @click="effectButtonClick($event)" >0 {{this.buttonType}}</button>
    <button value="-1" @click="effectButtonClick($event)">-1 {{this.buttonType}}</button>
    <p>{{this.displayVal}}</p>
  </div>
</template>

<script>
export default {

props: [
  'buttonType',
  'clipVal',
  'inboundButtonData',//need to use object instead
  ],

data(){
  return{
    currentSettings: {
      buttonType: this.buttonType,
      id:     this.clipVal,
    },
    displayVal: {default: 0},
  }
},

methods: {
effectButtonClick(buttonEvent){
    this.currentSettings.currentSetting = buttonEvent.target.value
    this.$emit('effectButtonEmit', {effectButtonExport: this.currentSettings})
}
},
created() {
    this.displayVal = this.inboundButtonData
}

}
</script>

<style scoped>
  .buttonHero {
    display: flex;
    flex-direction: row;
    width: 90%;
    border-color: black;
    border-width: 1px;
  }
</style>