/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
const apiKey = "&appid=0d57082ba71940b49fb5be2e791b8614&units=imperial";
document.getElementById("generate").addEventListener("click", performAction); //generate Function
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
function performAction() {
  const CityName = document.getElementById("name").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL + CityName + apiKey)
    .then((data) => {
      console.log(data);
      postData("/addEntry", {
        temp: data.list[0].main.temp,
        feli: feelings,
        date: newDate,
      });
    })
    .then(() => {
      getDataAndUpdateUI("/getEntry");
    });
}
const getWeather = async (url) => {
  //getting data from weather.com
  const res = await fetch(url);
  try {
    const data = await res.json();
    //console.log(data);
    return data;
  } catch (e) {
    console.log("error in weather fetch", e);
  }
};
const postData = async (url = "", data = {}) => {
  const resp = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await resp.json();
    //console.log(newData);
    return newData;
  } catch (e) {
    console.log("error in post", e);
  }
};

const getDataAndUpdateUI = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    document.getElementById("date").innerHTML = "date is " + data.date;
    //console.log(newDate);
    document.getElementById("temp").innerHTML = "temp is " + data.temp;
    //console.log(data[data.length - 1].temp);
    document.getElementById("content").innerHTML = "I feel " + data.feli;
    //console.log(data[data.length - 1].desc);
  } catch (e) {
    console.log("in Get", e);
  }
};
