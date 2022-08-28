<template>
  <div class="audioToolkitHero">
    <form @submit="panelCatch($event)">
    <p class='clipName'>file name here</p>
    <input type="file" @change="fileCatch($event, $event.target.files)"  />
    <button @click="playAudioStep1">play local file</button>
    <button @click="tutorial1">frequency tutorial 1</button>
    <button @click="oscInit">start osc</button>
    <button @click="oscStop">stop osc</button>
    <input @input="sliderChange($event)" ref='testImp' type="range" min="220" max="880" value="440" step="0.01"/>
    <button @click="oscType">osc Type</button>
    <button @click="oscSound">osc Sound</button>

    <!-- STEP 1, SELECT PRE-EXISITNG AUDIO FILE -->
    <select 
              ref="file-select-ref"
              @change.prevent="fileChange" 
            >
            <option value="placeholder" disabled selected>Select your audio clip</option>
            <option v-for="file in availableFilesArr" :key="file.id" :value="file.url">
           {{file.name}}
      </option>
    </select>
    <p>Loaded Audio: {{this.selectedAudioFile}}</p>


    <!-- Step x -->
    <button @click="playMainTrack">Play</button>
    <button @click="pauseMainTrack">Pause</button>
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

import song1 from '../../public/assets/ZHU_-_Good_Life_Audio.mp3'
import song2 from '../../public/assets/8-15-2022-goldclothes.wav'


import vocals1 from '../../public/assets/FREE VOCAL LOOP SAMPLES.mp3'
import vocals2 from '../../public/assets/FREE VOCAL SAMPLES.mp3'
import vocals3 from '../../public/assets/VOX SAMPLE PACK (+30 Royalty Free) vocal samples _ vol_9.mp3'


export default {
  name: 'AudioToolkit',
data(){
  return{
    clipSettings: { default: {} } ,
    privateKey:  { default: 0},
    audio: { default: {}},
    testOsc: null,
    testCtx: null,
    oscRunning: false,
    //Currently loaded audio file, for select value
    selectedAudioFile: null,
    //
    availableFilesArr: [
      {
        name:'song1',
        url:'song1-url',
        id: 1,
      },
      {
        name: 'song2',
        url:'song2-url',
        id: 2,
      },
      {
        name:'vocals1',
        url:'vocals1-url',
        id: 3,
      },
      {
        name: 'vaudioBufferocals2',
        url:'vocals2-url',
        id: 4,
      },
      {
        name:'vocals3',
        url:'vocals3-url',
        id: 5,
      },      
                      ]

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
    fileChange(){
      //this.$refs.file-select-ref
      //or
      console.log(this.$refs["file-select-ref"].value)
    },
    fileCatch(target, file) {
      console.log(target)
      console.log(file)
      
      
      
  this.fetchLocalFile(file)
    },
    playAudioStep1() {
      const ctx = new AudioContext();

      fetch(song2)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodedAudio => this.audioBuffer = decodedAudio)
        .then(()=> this.playAudioStep2(this.audioBuffer, ctx))
    },
    playAudioStep2(audioBuffer, context){
      const playSound = context.createBufferSource()
        playSound.buffer = audioBuffer;
        playSound.connect(context.destination)
        playSound.start()
    },
    //Tutorial About Frequency
    tutorial1(){
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();

      osc.connect(ctx.destination)
      // There are params in this such as frequency that can be manipulated
      console.log(osc)
      // Setting value here, could have something that moves value around?
    
      // plays a sine wave right away for one second
      osc.start(0);
      setTimeout(()=>{
      osc.frequency.value / 2

      },200)
      osc.stop(1);
      // Default value is 440htz, 440 is a reference pitch
      //An octive is doubling or halfing the frequency


      console.log(this.$refs.testImp)
    },
    oscStart(){
      const ctx = new AudioContext();

      this.testOsc = ctx.createOscillator();
      this.testCtx = ctx

      this.testOsc.connect(ctx.destination)


    },
    oscInit(){
      this.testOsc.start(0)
    },
    oscStop(){
      this.testOsc.stop();
    },
    sliderChange(e){
      
      this.testOsc.frequency.value = e.target.value
      
    },
    changeOscillator(oscillator, val){

      oscillator.frequency.value = val
    },
    oscType(){
      // The 4 oscillator types
      // representation of the voltage shape
      // In the base note of a C, there are overtones blended in with the exact pitch
      // sine wave is fundemental with no overtones     
      this.testOsc.type = 'sine';
      this.testOsc.type = 'square';
      this.testOsc.type = 'triangle';
      this.testOsc.type = 'sawtooth';

      
      this.testOsc.start();

      setTimeout(() => {
        this.testOsc.stop()
      }, 2000)

    },
    oscStart2(){
      //NO AUTO CONNECT TO SPEAKER like in oscStart
      const ctx = new AudioContext();

      this.testOsc = ctx.createOscillator();
      this.testCtx = ctx

      //this.testOsc.connect(ctx.destination)


    },
    oscSound() {
      // 8 DIFFERENT FILTERS IN WEB AUDIO API

      // AN OSCILLATOR IS A VOLTAGE SHAPTER
      //this.testOsc.start();
      // Nodes in the line of the audio are objects

      this.testOsc.type = 'sawtooth';

      //using ctx object in component state to get a createGain() node
      var gainNode = this.testCtx.createGain()

      var biquadNode = this.testCtx.createBiquadFilter();


      biquadNode.detune.value = .8;
      biquadNode.frequency.value = 410;
      // Q is the peak right by where the filter is at on the center of the eq
      // in a bandpass it controls the width
      biquadNode.Q.value = 10
      biquadNode.type = 'bandpass'
      gainNode.gain.value = .05;
      console.log(biquadNode)

      this.testOsc.connect(biquadNode)
      
      biquadNode.connect(gainNode)
      gainNode.connect(this.testCtx.destination)

      
      this.testOsc.start()

      setTimeout(() => {
        this.testOsc.stop()
      }, 2000)

      

    },
    playWhiteNoise() {
      //Step 1
      const audioContext = new ( window.AudioContext || window.webkitAudioContext)();
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
    this.oscStart2();
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