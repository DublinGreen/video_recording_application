<template>
  <div class="content">
    <div id="sub-heading">
      <p class="nav-summary">Snapbyte > My Recording</p>
      <h1 class="main-heading">My Recording 
        <span class="badge badge-secondary">{{ recordingList.length }}</span>
        <span id="navigation">
          <button type="button" class="btn-lg btn btn-light btn-plain" data-toggle="button" aria-pressed="false" autocomplete="off">
            <i class="bi bi-sort-alpha-down"></i> By Date
          </button>
          <button type="button" class="btn-lg btn btn-light btn-plain" data-toggle="button" aria-pressed="false" autocomplete="off">
            <i class="bi bi-filter"></i> Add Filter <i class="bi bi-chevron-down"></i>
          </button>
          <button type="button" class="btn-blue btn-lg btn btn-info" data-toggle="modal" aria-pressed="false" autocomplete="off" data-target="#recordingModal">
            <i class="bi bi-camera-video"></i> New Request
          </button>
          <button v-on:click="this.useCapture = false" type="button" class="btn-lg btn btn-danger" data-toggle="button" aria-pressed="false" autocomplete="off">
            <i class="bi bi-display-fill"></i> Stop Recording
          </button>
          <button v-on:click="this.useRecord = true" type="button" class="btn-lg btn btn-success" data-toggle="button" aria-pressed="false" autocomplete="off">
            <i class="bi bi-display"></i> Start Recording
          </button>
        </span>
        <div class="clearfix"></div>
      </h1>
    </div>
    <div class="clearfix"></div><br>
    <div class="container">
      <form id="uploadForm">
        <input hidden type="file" name="file" accept=".webm" @change="changeFile" />
        <video ref="recordedVideo" id="recordedVideo" width="320" height="240" style="display:none; border: 1px solid #f00" control="true">
          <source :src="file" type="video/webm">
        </video>
      </form>
      <br>
      <table class="table table-striped" style="margin-left: -40px;">
        <thead class="thead-dark">
          <tr>
            <th scope="col"><strong>Recordings</strong></th>
            <th scope="col"><strong>Title</strong></th>
            <th scope="col"><strong>Views</strong></th>
            <th scope="col"><strong>Size</strong></th>
            <th scope="col"><strong>Last Modified</strong></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in recordingList" :key="item.id">
            <td>
              <video :ref="item.id" :id="item.id" width="150" height="100" control="true" style="border-radius: 15px;">
                <source :src="file" type="video/webm">
              </video>
            </td>
            <th class="recordList" scope="row">{{item.recording}}</th>
            <td class="recordList">{{item.title}}</td>
            <td class="recordList">{{item.views}}</td>
            <td class="recordList">{{item.size}}Kb</td>
            <td class="recordList">{{item.lastModified}}</td>
            <td>....</td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- Modal -->
<div class="modal fade" id="recordingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h3 class="modal-title" id="exampleModalLabel"><strong>New Recording</strong></h3>
      </div>
      <div class="modal-body">
          
          <div class="preview-wrapper" v-show="this.useCapture">
              <h5><i class="bi bi-record-circle-fill" style="color: #f00;"></i> Live Preview</h5>
              <video id="vpreview" class="preview" autoplay></video>
          </div>

          <div class="video-mask" v-show="this.useCamera">
            <h2 style="text-align:center">Camera Preview</h2>
            <video v-show="this.useCamera" id="recorded" ref="recorded" playsinline loop></video>
          </div>

        <div class="mbsc-form-group">
          <div class="form-group">
            <label for="exampleInputEmail1">Recorded File Name</label>
            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Filename" v-model="this.saveFileName">
            <small id="emailHelp" class="form-text text-muted">Please add filename or app will use default</small>
          </div>
          <label>
              <input mbsc-switch data-label="Switch On" data-description="Capture Screen" v-model="useCapture" type="checkbox" checked />
          </label>
          <label>
              <input mbsc-switch data-label="Switch On" data-description="Record Screen" v-show="this.useCapture" v-model="useRecord" type="checkbox" unchecked />
          </label>
          <label>
              <input mbsc-switch data-label="Switch On" data-description="Record Camera" v-model="useCamera" type="checkbox" checked />
          </label>
          <label>
              <input mbsc-switch data-label="Switch On" data-description="Record Audio" type="checkbox" v-model="useAudio" checked />
          </label>
          <label>
              <input mbsc-switch data-label="Switch On" data-description="Show Cursor" type="checkbox" v-model="useCursor"  checked />
          </label>

          <br>
          <button v-show="this.useCapture"  v-on:click="this.useRecord = true" type="button" class="action-btn btn-blue btn-lg btn btn-info" data-toggle="modal" aria-pressed="false" autocomplete="off" data-target="#recordingModal">
            Start Recording
          </button>

      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'TheWelcome',
  components: {
  },
  data() {
    return {
        displayMediaOptions: {
            video: {
                displaySurface: "window",
                cursor: "always"
            },
            audio: true,
        },
        useCapture: false,
        useRecord: false,
        useCamera: false,
        useAudio: true,
        timestamp : new Date().getTime(),
        saveFileName: "screen-recording",
        fileFormat: ".webm",
        suggestedName: "",
        useCursor: true,
        mediaRecorder: [],
        chunks: [],
        isRecording: false,
        videoUrl: "",
        recordingList: [],
        record: {
          id: 0, 
          recording: "", 
          title: "", 
          views: 1, 
          size: "", 
          lastModified: "" 
        },
        recordingListKey: 'recordingList',
        file: null,
        counter: 1,
    }
  },
  methods: {
    changeFile(e){
      const files = e.target.files;
      let size = Math.round(files[0].size/1024 * 100) / 100
      const path = (window.URL || window.webkitURL).createObjectURL(files[0]);
      this.file = path;
      this.$refs.recordedVideo.load();

      this.record = {
        id: this.counter++,
        recording: files[0].name,
        title: files[0].name,
        views: 1,
        size: size,
        lastModified: new Date().toUTCString() 
      };           
      this.recordingList.push(this.record);
    },
    updateOptions() {
        if(this.useAudio && this.$refs){
          this.displayMediaOptions.audio = this.$refs.setup.$refs.audio.checked;
        }
        
        if(this.useCursor){
          this.displayMediaOptions.video.cursor = this.$refs.setup.$refs.cursor.checked?"always":"never";
        }
    },
    async startCapture() {
        const videoElem = document.getElementById("vpreview");

        try {
            videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
                this.displayMediaOptions
            );
            this.useCapture = true;
        } catch (err) {
            console.error(err);
        }
    },
    stopCapture() {
      try {
        const videoElem = document.getElementById("vpreview");
        let tracks = videoElem.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        this.dumpOptionsInfo(videoElem);
        videoElem.srcObject = null;
        this.useCapture = false;
        this.isRecording = false;
      } catch (err) {
          console.error(err);
      }
    },
    async startRecord() {
        if (!this.isRecording) {
            const videoElem = document.getElementById("vpreview");
            this.mediaRecorder = new MediaRecorder(videoElem.srcObject);

              // Prompt the user to choose where to save the recording file.
            const suggestedName = `${this.saveFileName}-${new Date().getTime()}${this.fileFormat}`;
            this.suggestedName = suggestedName;
            this.timestamp = new Date().getTime();
            const handle = await window.showSaveFilePicker({ suggestedName });
            
            const writable = await handle.createWritable();
            console.log(handle);
            console.log(writable);

            this.mediaRecorder.start();
            var t = this;

            this.mediaRecorder.addEventListener("dataavailable", async (event) => {
              // Write chunks to the file.
              await writable.write(event.data);
              if (this.mediaRecorder.state === "inactive") {
                // Close the file when the recording stops.
                await writable.close();
              }
            });

            this.mediaRecorder.onstop = function() {  
              var blob = new Blob(t.chunks, { 'type' : 'video/webm; codecs=mpeg4,vorbis' });
              t.chunks = [];
              t.videoUrl = window.URL.createObjectURL(blob);
              blob.lastModifiedDate = new Date();
              blob.name = this.suggestedName;
            }
            this.isRecording = true;
        }
        else {
            this.mediaRecorder.stop();
            this.isRecording = false;
        }
        
    },
    async startCamera(){
      // Request access to the user's camera
      navigator.mediaDevices.getUserMedia({ video: true, audio: this.useAudio })
        .then(function(stream) {
          // Access was granted, so we can display the camera stream
          const video = document.getElementById('recorded');
          video.srcObject = stream;
          video.play();
        })
        .catch(function(err) {
          // Access was denied, so we cannot display the camera stream
          console.log('Access to camera was denied: ', err);
        });
    },
    stopCamera(){
      navigator.mediaDevices.getUserMedia({ video: true, audio: this.useAudio })
        .then(function(stream) {
          const video = document.getElementById('recorded');
          video.srcObject = stream;
          video.pause();
          stream.getTracks()[0].stop();

          let videoTrack = stream.getVideoTracks()[0];
          let audioTrack = stream.getAudioTracks()[0];
          stream.removeTrack(videoTrack);
          stream.removeTrack(audioTrack);
        })
        .catch(function(err) {
          console.log('Unable to turn off camera', err);
        });

        navigator.mediaDevices.onstop = function() {  
        }
    },
    dumpOptionsInfo(videoElem) {
      const videoTrack = videoElem.srcObject.getVideoTracks()[0];
      console.log("Track settings:");
      console.log(JSON.stringify(videoTrack.getSettings(), null, 2));
      console.log("Track constraints:");
      console.log(JSON.stringify(videoTrack.getConstraints(), null, 2));
    },
  },
  watch: {
    useCamera: function (val) {
      if(val){
        this.startCamera();
      }else{
        this.stopCamera();
      }
    },
    useCapture: function (val) {
      if(val){
        this.startCapture();
      }else{
        this.stopCapture();
      }
    },
    useRecord: function (val) {
      if(val){
        this.startRecord();
      }else{
        this.stopCapture();
        this.useCamera = false;
        this.useCapture = false;
      }
    },
  }
}
</script>

<style scoped lang="less"> 

#navigation{
  width: 60%;
  float: right;
}

#uploadForm{
  margin-left: -35px
}

#sub-heading{
  display: block;
  margin-left: 100px;
}

input {
  margin-top: 1rem;
}

input::file-selector-button {
  font-weight: bold;
  color: dodgerblue;
  padding: 0.5em;
  border: thin solid grey;
  border-radius: 3px;
}

.recordList{
  padding-top: 50px;
}

#file{
  display: none;
}

.close{
  font-size: 3em;
  font-weight: bolder;
  padding-top: 10px;
}

.action-btn{
  font-weight: bold;
  display:block;
  width: 60%;
  text-align: center;
  margin: auto;
  font-size: 1.5em;
}

.btn-blue{
  background-color: #0DABD8;
}

button{
  border-radius: 25px;
  margin: 0px 10px 10px;
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  opacity: 1;
}

.button-plain{
  color: #637C8E;
}

.main-heading{
  text-align: left;
  font: normal normal 300 24px/35px Poppins;
  letter-spacing: 0px;
  color: #000000;
  margin-top: 0px;
}

.nav-summary{
  text-align: left;
  font: normal normal normal 14px/26px Poppins;
  letter-spacing: 0px;
  color: #637C8E;
  opacity: 1;
  margin-top: -30px;
}

.video-mask{
    width: 550px;
    height: 450px;
    border-radius: 25px; 
    overflow: hidden; 
    box-shadow: 3px 3px 3px #1d1818;
}

.field {
    margin: 1rem 0;
}
.input-number {
    width: 3rem;
}

.input-text {
    width: 7rem;
}
.input-text, .input-number {
    background-color: var(--color-bg);
    color: var(--color-text);
    border: 0;
    border-bottom: 0.1rem solid;
    outline: 0;
    transition: .25s;
    padding: 0.1rem;
    font-size: 1rem;
}
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.px {
    display: inline;
}
.px::after {
    content: 'px';
    border-bottom: 0.1rem solid;
    padding: 0.1rem;
    transition: .25s;
}
.input-checkbox {
    width: 0.75rem;
    height: 0.75rem;
}

/* campture styles */

.setup-block {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.btn-group {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    gap: 1rem;
    margin: 1rem 0 2rem;
}
.disabled {
    opacity: 0.2;
    cursor: default;
}
.disabled::before {
    opacity: 0;
}
.content-wrapper {
    display: grid;
    align-items: baseline;
    grid-template-columns: 1fr 2fr;
}
.preview {
    margin: 1rem 0;
    width: 100%;
    height: 100%;
    background-color: black;
}
.preview-wrapper {
    margin: 0 3rem 0 0;
}

.btn-red {
    color: #91261f;
    border-color: #91261f;
}
.btn-red::before {
    background-color: #91261f;
}
</style>