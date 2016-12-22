$(function(){



var t;
var workTime = 25;
var breakTime = 5;
var alarm = document.createElement('audio');
alarm.src = 'sounds/alarm.mp3';

var radio = document.createElement('audio');
radio.src = 'https://www.dropbox.com/s/z15jlz9i11lpqd4/ambient.mp3?raw=1';
radio.volume = 0.2;

function timer(minutes) {

    var sec = minutes * 60;
    var min, seconds, time;

    var start = new Date().getTime();
    start = start + sec * 1000;
    timedCount();

    function timedCount() {
        var newTime = start - new Date().getTime();
        // decrement seconds
        sec = Math.floor(newTime/1000);
        //console.log('sec'+sec);
        // break time in seconds
        var breakSec = breakTime * 60;

        // if timer counts break time, output break time,
        // stop radio from playing and sound alarm, disable radio btns
        if(sec == breakSec){
            $('#main-output').removeClass('blue');
            $('#main-output').addClass('green');
            $('#work-output').html('BREAK TIME');
            stopRadio();
            playAlarm();
            enableRadioBtn(false);
            console.log('<<beep>> Break time start!');
        }

        // if time one minute till break, turn music volume down,
        // play alarm and after 3 seconds turn music up
        if ((sec - breakSec) == 60) {
            radio.volume = 0.1;
            alarm.volume = 0.4;
            playAlarm();
            console.log('<<beep>> one minute till end. of work time');
        }else if((sec - breakSec) == 57){
            radio.volume = $('#volume').val() / 100;
            //console.log('volume after: '+audio.volume);
        }
        // for displaying work time to 0, and break time to 0
        (sec < breakSec)? time = sec : time = sec - breakSec ;

        // get minutes, and if minutes less than 9 get zero in front
        min = Math.floor(time / 60);
        min = (min <= 9) ? '0' + min : min;
        // get seconds, and if less than 9 get zero in front
        seconds = time % 60;
        seconds = (seconds <= 9) ? '0' + seconds : seconds;

        // run if c not zero
        if (sec !== -1) {
            // set timeout to 1 sec
            t = setTimeout(function() {
                timedCount();
            }, 1000);
            //console.log('timer: ' + min + ':' + seconds);
            return $('#output').html(min + ':' + seconds);
        }
        // else stop counting
        stopCount();
        playAlarm();
    //    console.log('timer: 00:00');
        $('#main-output').removeClass('green');
        $('#main-output').addClass('red');
        $('#work-output').html('Session ended.');
        return $('#output').html('00:00');
    }

}



// start btn, show resume btn, show work time in html, enable stop btn,
// stop count time, start play music, start timer function count work + break time
$('#start').on('click' , function(){
    var wholeTime = breakTime + workTime;
    $('#main-output').removeClass('red');
    $('#main-output').addClass('blue');
    $('#work-output').html('WORK TIME');
    $('#stop').attr('disabled', false);
    stopCount();
    playRadio();
    alarm.volume = 0.0;
    playAlarm();
    enableRadioBtn(true);
    timer(wholeTime);
});

// stop btn, stop counting time, stop audio, enable resume btn
$('#stop').on('click' , function(){
    stopCount();
    stopRadio();
    $('#output').html('00:00');
    $('#main-output').removeClass('green');
    $('#main-output').removeClass('red');
    $('#main-output').removeClass('blue');
});




$('#radio-list').on('change', function(){
    var num = this.value;
    var list = ['https://www.dropbox.com/s/z15jlz9i11lpqd4/ambient.mp3?raw=1','https://www.dropbox.com/s/z15jlz9i11lpqd4/drummnbass.mp3?raw=1'];
    radio.src = list[num];
    loadRadio();
    console.log('radio src: ' + radio.src);
});


function enableRadioBtn(x){
    if(x){
        return  $('#radio-list').attr('disabled', false);
    }
    return  $('#radio-list').attr('disabled', true);
}


// play radio
function playRadio(){
    radio.play();
    console.log('play radio!');
}

// pause radio
function stopRadio(){
    radio.pause();
    console.log('pause radio!');
}

// load radio
function loadRadio(){
    radio.load();
    radio.play();
    console.log('load radio!');
}
// play alarm
function playAlarm(){
    alarm.play();
    console.log('play alarm!');
}

// stop counting
function stopCount() {
    console.log('stop countdown!');
    return clearTimeout(t);
}

// change volume of audio
$('#volume').on('change', function(){
    radio.volume = this.value / 100;
    console.log('radio volume: '+radio.volume);
});


// event listeners on break and work time buttons
$('#timer-increase').on('click',function(){
    timerInput(true);
});

$('#timer-decrease').on('click',function(){
    timerInput(false);
});

$('#break-increase').on('click',function(){
    breakInput(true);
});

$('#break-decrease').on('click',function(){
    breakInput(false);
});


// function increment or decrement breakTime
function breakInput(increment){

    // breakTime must be between 15 and 5 and output in html
    if(breakTime < 15 && breakTime > 5){
        // if increment true increment breakTime, else decrement
        (increment)? breakTime++ : breakTime--;

    }else if(breakTime == 5 && increment == true){
        breakTime++;
    }else if(breakTime == 15 && increment == false){
        breakTime--;
    }

    console.log('break time: '+breakTime);
       return $('#break-input').html(`${breakTime < 10 ? '0':''}${breakTime}`);
}

// function increment or decrement workTime
function timerInput(increment){

    // workTime must be between 10 and 55 and output in html
    if(workTime < 55 && workTime > 10){
        // if increment true increment workTime, else decrement
        (increment)? workTime++ : workTime--;

    }else if(workTime == 10 && increment == true){
        workTime++;
    }else if(workTime == 55 && increment == false){
        workTime--;
    }

    console.log('work time: '+workTime);
       return $('#timer-input').html(workTime);
}


});
