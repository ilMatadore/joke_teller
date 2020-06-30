const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
tellMe = (joke) => {
  VoiceRSS.speech({
    key: "d0051989171545fb8d1fced5cfdea483",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Jokes from JokeAPI
async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error here
    console.log("Cannot fetch", error);
  }
}

// Event Listeners
button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
