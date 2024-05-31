import { Component } from '@angular/core';
import * as data from "../assets/songs.json";
const seedrandom = require('seedrandom');
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anime-heardle';
  guess = '';
  songs;
  songNumber;
  songObj;
  audio;
  currentGuess = 0;
  timeTable = {
    0: 3,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 30
  }
  loser = false;
  finished = false;
  // day = (DateTime.Today - new DateTime(2000,1,1)).TotalDays;
  
  ngOnInit() {
    let generator = seedrandom((new Date()).toUTCString);
    console.log(generator());
    console.log((new Date()).toUTCString);
    // let 
    this.songs = data.default;
    console.log(this.songs)
    this.songNumber = Math.floor(generator() * (this.songs.length));
    this.songObj = this.songs[this.songNumber]
    console.log(this.songObj)
    
    // $("#audio")[0].src = this.singObj.src;
    setTimeout(() => {
      // let audioObj = document.createElement("AUDIO");
      // audioObj.src = this.songObj.src;
      // audioObj.id = "audio";
      $("#audio")[0].src = this.songObj.src;
      // console.log("jsdlkfjlsdkfjkldsf", audioObj);
      // $("#audioContainer")[0].appendChild(audioObj);
    }, 500)
  }

  getAudio() {

  }

  checkTime(event) {
    console.log("checkingTime", $("#audio")[0].currentTime);
    if($("#audio")[0].currentTime > this.timeTable[this.currentGuess]) {
      $("#audio")[0].currentTime = 0;
      $("#audio")[0].pause();
    }
  }

  doGuess() {
    console.log("guessing", this.guess)
    if(this.guess == "") {
      return;
    }
    this.currentGuess++;
    let qs = "#guess" + this.currentGuess;
    $(qs)[0].innerHTML = this.guess;
    if(this.guess == this.songObj.title || this.guess == this.songObj.anime[0]) {
      $(qs)[0].style
      this.finished = true;
    } else {
      if(this.currentGuess >= 6) {
        this.finished = true;
        this.loser = true;
      }
      $(qs)[0].style.background = "red"
    }
    this.resetGuess();
  }

  resetGuess() {
    this.guess = "";
  }

}
