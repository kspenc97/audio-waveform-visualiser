<template>
  <div class="audioToolkitHero">
    <form @submit="panelCatch($event)">
  
    <p class='clipName'>file name here</p>
    <input type="file" @change="fileCatch($event, $event.target.files)"  />
    <button @click="fetchLocalFile">play local file</button>
    <!-- Wishlist - dynamically load button settings template based on inbound prop -->
    <!-- Wishlist 5 levels - by 20% -->
    <div class='buttonAndSettings'>
    <p>{{this.clipSettings.reverbVal}}</p>
    <EffectButtonStandard @effectButtonEmit="effectButtonClick" buttonType="Reverb" :clipVal="this.clipSettings.id"  :inboundButtonData="this.clipSettings.reverbVal">
    </EffectButtonStandard>
    </div>

    <div class='buttonAndSettings'>
        <p>{{this.clipSettings.chorusVal}}</p>
        <!-- Wishlist 5 levels - by 20% -->
        <EffectButtonStandard @effectButtonEmit="effectButtonClick" buttonType="Chorus" :clipVal="this.clipSettings.id" :inboundButtonData="this.clipSettings.chorusVal">
        </EffectButtonStandard>
    </div>

    <div class='buttonAndSettings'>
        <p>{{this.clipSettings.delayVal}}</p>
        <!-- Wishlist 5 levels - by 20% -->
        <EffectButtonStandard @effectButtonEmit="effectButtonClick" buttonType="Delay" :clipVal="this.clipSettings.id" :inboundButtonData="this.clipSettings.delayVal">
        </EffectButtonStandard>
    </div>

    <div class='buttonAndSettings'>
        <p>{{this.clipSettings.trebleVal}}</p>
        <!-- Wishlist 5 levels - by 20% -->
        <EffectButtonStandard @effectButtonEmit="effectButtonClick" buttonType="Treble" :clipVal="this.clipSettings.id" :inboundButtonData="this.clipSettings.trebleVal">
        </EffectButtonStandard>
    </div>

    <div class='buttonAndSettings'>
        <p>{{this.clipSettings.bassVal}}</p>
        <!-- Wishlist raise or lower 1/3rd, 3 buttons on each size of 0 -->
        <EffectButtonStandard @effectButtonEmit="effectButtonClick" buttonType="Bass" :clipVal="this.clipSettings.id" :inboundButtonData="this.clipSettings.bassVal">
        </EffectButtonStandard>
    </div>

    <div class='buttonAndSettings'>
        <p>{{this.clipSettings.panVal}}</p>
        <!-- Wishlist raise or lower 1/3rd, 3 buttons on each size of 0 -->
        <EffectButtonStandard @effectButtonEmit="effectButtonClick" buttonType="Pan" :clipVal="this.clipSettings.id" :inboundButtonData="this.clipSettings.panVal">
        </EffectButtonStandard>
        <!-- Wishlist - left - right - auto -->
    </div>

    </form>
  </div>
</template>

<script>
import EffectButtonStandard from '../effect_buttons/EffectButtonStandard.vue'
import {mapState, mapActions} from 'vuex';

export default {
  name: 'AudioToolkit',
data(){
  return{
    clipSettings: { default: {} } ,
    privateKey:  { default: 0},
    audio: { default: {}}
  }
},
  computed:{
    ...mapState({
      clipsAndOptions: state => state.clipsAndOptions,
    }),
  },

  components :{
    EffectButtonStandard,
  },

  methods: {
    ...mapActions([
      'updateAClip',
    ]),
    fileCatch(target, file) {
      console.log(target)
      console.log(file)
      
      
      
  
    },
    fetchLocalFile() {
      const ctx = new AudioContext();
      let audio

      fetch("../assets/ZHU_-_Good_Life_Audio.mp3")
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
          audio = decodedAudio;
        })


        const playSound = ctx.createBufferSource()
        playSound.buffer = audio;
        playSound.connect(ctx.destination)
        playSound.start(ctx.currentTime)
    },
    playWhiteNoise() {
      //Step 1
      const audioContext = new AudioContext();
      // Step 2
      const buffer = audioContext.createBuffer(
        1,
        audioContext.sampleRate * 1,
        audioContext.sampleRate
        )
      // Step 3
      const channelData = buffer.getChannelData(0);
      // Step 3
      for(let i=0; i< buffer.length; i++) {
        channelData[i] = Math.random() * 2 -1;
      }

      //Step 4
      const whiteNoiseSource = audioContext.createBufferSource()
      //Ste4 4. assigning buffer to source, buffer is where length comes from
      // "buffers are cheap to make"
      whiteNoiseSource.buffer = buffer

      //Step 5 setting gain node
      const primaryGainControl = audioContext.createGain()
      primaryGainControl.gain.setValueAtTime(0.05, 0)


      // Step 6, connecting whote noise to gain node
      whiteNoiseSource.connect(primaryGainControl)

      // step 7 connecting gain control 
      // (which is gettting white noise inbound)
      // into the default audio destination for the browser/device
      primaryGainControl.connect(audioContext.destination)

      // step 8 - plays white noise
      whiteNoiseSource.start()


    },
    panelCatch(panelEvent) {
      //console.log(panelEvent)
    },
    effectButtonClick(payload) {
      switch(payload.effectButtonExport.buttonType) {
        case "Reverb":
          console.log('reverb click')
          this.clipSettings.reverbVal = payload.effectButtonExport.currentSetting
        break;
        case "Chorus":
          this.clipSettings.chorusVal = payload.effectButtonExport.currentSetting
        break;
        case "Delay":
          this.clipSettings.delayVal = payload.effectButtonExport.currentSetting
        break;
        case "Treble":
          this.clipSettings.trebleVal = payload.effectButtonExport.currentSetting
        break;
        case "Bass":
          this.clipSettings.bassVal = payload.effectButtonExport.currentSetting
        break;
        case "Pan":
          this.clipSettings.panVal = payload.effectButtonExport.currentSetting
        break;
      }
      this.updateAClip(this.clipSettings)
      Object.assign(this.clipSettings, this.clipsAndOptions[0])
      this.$forceUpdate();
    }
  },

  created() {
        Object.assign(this.clipSettings, this.clipsAndOptions[0])
  }
}
</script>

<style scoped>
    .audioToolkitHero{
        display: flex;
        flex-direction: column;
        width: 70%;
        border-color: black;
        border-width: 1px;
    }

    .buttonAndSettings{
        display: flex;
        flex-direction: column;
        width: 70%;
        border-color: black;
        border-width: 1px;
    }

</style>