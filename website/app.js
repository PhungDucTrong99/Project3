document.addEventListener("DOMContentLoaded", () => {
  const getDate = () => {
    const d = new Date();
    return `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
  };

  let button = document.getElementById("generate");
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    const baseURL = "https://api.openweathermap.org/data/2.5/forecast?zip=";
    const apiKey = "153b4d66f3a0171a79c72c9fac2034cf";
    let zip = document.getElementById("zip").value;

    const urlAPI = `${baseURL}${zip}&appid=${apiKey}`;

    let feelings = document.getElementById("feelings").value;

    getWeather(urlAPI).then(function (data) {
      console.log("data", data);
      const newDate = getDate();
      postData("/add", {
        date: newDate,
        temp: data.list[0].main.temp,
        content: feelings,
      });
      updateUI();
    });
  });

  const updateUI = async () => {
    try {
      const request = await fetch("/all");
      const data = await request.json();
      document.getElementById("date").innerHTML = `Date : ${data[0].date}`;
      document.getElementById("temp").innerHTML = `Temp : ${data[0].temp}`;
      document.getElementById(
        "content"
      ).innerHTML = `I feel: ${data[0].content}`;
    } catch (error) {
      console.log("Error updating UI:", err);
    }
  };

  const getWeather = async (urlAPI) => {
    const res = await fetch(urlAPI);
    try {
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Error get weather", err);
    }
  };

  const postData = async (url = "", data = {}) => {
    console.log("data", data);
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      // body data
      body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
      console.log("data", data);
      return newData;
    } catch (err) {
      console.log("Error post data", err);
    }
  };
});
