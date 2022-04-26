const apiKey = "9cb8a50c2e82def666f80145bc251b97";
const dateDayname = document.querySelector('.date-dayname');
const dateDay = document.querySelector('.date-day');
const userLocation = document.querySelector('.graph h1');
const todayTemp = document.querySelector('.today-temp');
const todayweekday = document.querySelector('.today-weekday p');
const todayTemp2=document.querySelector(".temp p");
const todayTempNight = document.querySelector('.todayweekday p');
const humidity=document.querySelector(".humidity p");
const wind=document.querySelector(".wind p");
const weatherImg=document.querySelector(".weather-icon img")
const otherDayList = document.querySelectorAll('.day');
const otherDayWeek=document.querySelectorAll(".weekday");
const otherDayImg=document.querySelectorAll(".otherDayImg")
const otherDayTemp=document.querySelectorAll(".weekdaytem")
const arrayOfWeekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

// Get latitude and longitude data
function getLocation() {
    if (navigator.geolocation) {
        return new Promise((res) => {
            return navigator.geolocation.getCurrentPosition((coord) => {
                res(showPosition(coord));
            });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    const weatherUrl = fetch( `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=7&appid=${apiKey}`);
    return weatherUrl;
}

getLocation()
    .then((position) => {
        return position.json();
    })
    .then((reslCords) => {
        console.log(reslCords);
        console.log(reslCords.list[0].main.temp)
        const temp = Math.round((parseFloat(reslCords.list[0].main.temp)-273.15));
        todayTemp.innerText = temp + '°';
        todayweekday.innerText=arrayOfWeekdays[getUserDate()];
        todayTemp2.innerText=temp + '°';
        const city = reslCords.city.name.replace(" City","");
        const country = reslCords.city.country;
        userLocation.innerText = city+", "+country;
        humidity.innerText=reslCords.list[0].main.humidity+"%"
        wind.innerText=reslCords.list[0].wind.speed;
        let iconurl = "http://openweathermap.org/img/w/" + reslCords.list[0].weather[0].icon + ".png";
        weatherImg.setAttribute("src",iconurl);
        reslCords.list.splice(0,1)
        changeInnerOtherElements(reslCords.list)
    })


function changeInnerOtherElements(others){
    console.log(others)
    let weekNumber=getUserDate();

    otherDayList.forEach((temp,index)=>{
        weekNumber++;
        if(weekNumber>=arrayOfWeekdays.length){
            weekNumber=0;
        }
        let iconurl = "http://openweathermap.org/img/w/" + others[index].weather[0].icon + ".png";
        otherDayWeek[index].innerText=arrayOfWeekdays[weekNumber];
        otherDayImg[index].setAttribute("src",iconurl)
        otherDayTemp[index].innerText= Math.round((parseFloat(others[index].main.temp)-273.15))+"°C";
    })
}

function getUserDate() {
    const dateObj = new Date()
    dateObj.setHours(dateObj.getHours()+20);
    console.log(dateObj)
    return dateObj.getDay();
}
