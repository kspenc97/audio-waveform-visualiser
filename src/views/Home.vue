<template>
  <div class="hello">
    <AudioToolkit>
    </AudioToolkit>
  </div>
</template>

<script>
import AudioToolkit from '../views/AudioToolkit.vue'

export default {
  name: 'HelloWorld',

  components: {
    AudioToolkit
  },

  methods: {
    fileCatch(target, file) {
      console.log(target)
      console.log(file)
      console.log(this.params)
    },
    panelCatch(panelEvent) {
      console.log(panelEvent)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

