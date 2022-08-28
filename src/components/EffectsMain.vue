<template>
  <div >
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
  name: 'Effects',
data(){
  return{
    // Current Audio context
    audioContext1: null,
    //Currently loaded audio file, for select value
    selectedAudioFile: null,
    //
    audioBuffer: null,
    // Main Audio Oscillator
    audioOsc: null,
    // Node array for loop
    nodeArr: [],
    // Data mockup for paramaters in loaded audio files
    availableFilesArr: [
      {
        name:'song1',
        url: song1,
        id: 1,
      },
      {
        name: 'song2',
        url: song2,
        id: 2,
      },
      {
        name:'vocals1',
        url: vocals1,
        id: 3,
      },
      {
        name: 'vocals2',
        url: vocals2,
        id: 4,
      },
      {
        name:'vocals3',
        url: vocals3,
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


  methods: {
    ...mapActions([
      'updateAClip',
    ]),
    // Step 1, get file from select
    fileChange(){
      //this.$refs.file-select-ref
      //or
      this.fileLoader(this.$refs["file-select-ref"].value)
    },
    // Step 2, init file once gotten from select
    fileLoader(fileName){       
        fetch(fileName)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => this.audioContext1.decodeAudioData(arrayBuffer))
          .then(decodedAudio => this.audioBuffer = decodedAudio)
          .then(()=> this.afterLoaded())    
    },
    // Step 3
    afterLoaded(){
        //uncoment to reenable playing
        //const playSound = this.audioContext1.createBufferSource()
        //playSound.buffer = this.audioBuffer;
        //playSound.connect(this.audioContext1.destination)
        //playSound.start()


        this.nodeCreation('gainNode');
        this.nodeCreation('biquadFilter')
        this.loadNodes();

    },


    // Catch all node creation function
    nodeCreation(type, settings) {
        switch(type) {
            case 'gainNode':
                  let gainNode = this.audioContext1.createGain();
                  gainNode.gain.value = .1;
                  this.nodeArr.push(gainNode);
                break;
            case 'biquadFilter':
                  let biquadNode = this.audioContext1.createBiquadFilter();
                  biquadNode.detune.value = .8;
                  biquadNode.frequency.value = 410;
                  biquadNode.Q.value = 10
                  biquadNode.type = 'bandpass'
                  this.nodeArr.push(biquadNode);
                break;
            default:
                console.log('note creation error')
                return
        }
    },
    
    loadNodes() {
        console.log(this.audioBuffer)
        this.nodeArr.forEach((node)=>{
            node.connect(this.audioContext1.destination)
        })

        this.audioOsc.start()
    
    },

    // Controls
    playMainTrack(){
        



        this.audioOsc.start();
    },
    pauseMainTrack(){


        this.audioOsc.stop();
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
  // Right now creating an audio context & oscillator and saving to component
  // State
  created(){
    // Doesnt work from component state without this two step process
    const ctx = new AudioContext(); // step 1
    this.audioContext1 = ctx;       // step 2
    
    this.audioOsc = this.audioContext1.createOscillator();


  }
}
</script>
