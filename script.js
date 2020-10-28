const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disbale/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing jokes to tts api
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'dfe49a9ff39243119efbf9a34aea9967',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get jokes from api
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch(err) {
    console.log("Error, no joke", err);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);