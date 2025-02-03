var states = ["day", "sunset", "night"];
var stateCount = [1, 1, 1];
var imageDirectory = "default/", fileType = "jpg";
var day_hour = 7, day_minute = 0, sunset_hour = 18, sunset_minute = 30, night_hour = 20, night_minute = 0;
var day_time = 700, sunset_time = 1830, night_time = 2000;
var time = 0, lastTime = 0, lastState = 0;
var switchTime = 0;
var switchInterval = 1;
var currentSubstate = 1;
function load() { //Runs on load
    changeTime();
	substateTime();
    setInterval(update,1000/30);
}
function LinkCheck(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}
function update(){ //Check what time it is and change image accordingly 
    changeTime();
    if (lastTime != time) {
        lastTime = time;
        if (time >= day_time && time < sunset_time) change(0);
        else if (time >= sunset_time && time < night_time) change(1);
        else if (time >= night_time) change(2);
        else if (time < day_time) change(2);
    }
}
function changeTime() { //Change the current time
	var curTime = new Date();
	time = (curTime.getHours() * 100) + curTime.getMinutes();
	
	day_time = (day_hour*100) + day_minute;
	sunset_time = (sunset_hour * 100) + sunset_minute;
	night_time = (night_hour * 100) + night_minute;
}
function substateTime() {
	switchTime = time + switchInterval;
	if ((switchTime % 100) >= 60) {
		switchTime = ((Math.floor(switchTime/100)+1)*100) + ((switchTime%100)-60);
	}
}
function change(index) { //Change the image according to the index provided
	if (index != lastState) {
		currentSubstate = 1;
		substateTime();
		lastState = index;
	}
    updateSubstate(index);
    var subState = "";
    if (currentSubstate != 1) subState = currentSubstate;
    var image = document.getElementById('background');
    image.src = imageDirectory + states[index] + subState + "." + fileType;
    image.alt = "Could not load '" + imageDirectory + states[index] + subState + "." + fileType + "'" + time + " " + switchTime;
}
function updateSubstate(index) {
	if (time == 0) {
		switchTime = switchTime % 100;
	}
    if (time >= switchTime) {
		substateTime();
        if (currentSubstate + 1 > stateCount[index]) currentSubstate = 1;
        else currentSubstate++;
    }
}
window.wallpaperPropertyListener = { //Wallpaper engine properties
    applyUserProperties: function(properties) {

        if (properties.customimage) { //Setting the directory location if specified
            if (properties.customimage.value) {
                imageDirectory = 'file:///' + properties.customimage.value + '/';
			} else {
			imageDirectory = 'default/';
			}
        }
        if (properties.file_type) {
            if (properties.file_type.value !== "") {
                fileType = properties.file_type.value;
            }
        }
        if (properties.day_hour) {
            if (properties.day_hour.value !== "") {
                day_hour = properties.day_hour.value;
			}
        }
		if (properties.day_minute) {
			if (properties.day_minute.value !== "") {
				day_minute = properties.day_minute.value;
			}
		}
		if (properties.sunset_hour) {
			if (properties.sunset_hour.value !== "") {
                sunset_hour = properties.sunset_hour.value;
			}
        }
		if (properties.sunset_minute) {
			if (properties.sunset_minute.value !== "") {
				sunset_minute = properties.sunset_minute.value;
			}
		}
		if (properties.night_hour) {
			if (properties.night_hour.value !== "") {
                night_hour = properties.night_hour.value;
			}
        }
		if (properties.night_minute) {
			if (properties.night_minute.value !== "") {
				night_minute = properties.night_minute.value;
			}
        }
        if (properties.day_substate_count) {
            if (properties.day_substate_count.value !== "") {
                stateCount[0] = properties.day_substate_count.value;
            }
        }
        if (properties.sunset_substate_count) {
            if (properties.sunset_substate_count.value !== "") {
                stateCount[1] = properties.sunset_substate_count.value;
            }
        }
        if (properties.night_substate_count) {
            if (properties.night_substate_count.value !== "") {
                stateCount[2] = properties.night_substate_count.value;
            }
        }
        if (properties.substate_time_interval) {
            if (properties.substate_time_interval.value !== "") {
                switchInterval = properties.substate_time_interval.value;
            }
        }
    }
};
