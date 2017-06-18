let input = document.getElementById('searchInput');
input.focus();  // put the focus on the input text field.
let submit = document.getElementById('submitButton');

let resultsWrapper = document.getElementById('results');
let player = document.getElementById('stream-player');
let artists = document.getElementById('artists');
let tracks = document.getElementById('tracks');


//  Search when the enter button is pressed.
document.addEventListener("keypress", function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    qualifyAndSearch();
  }
});

// Also, when the button is clicked, search.
submit.onclick = qualifyAndSearch;



function qualifyAndSearch(event) {
  // When the button is clicked, clean the input and send string to search().

  // start by making the areas for results visible.
  resultsWrapper.style = "display: flex";
  player.style = "display: block";

  let dirtyStrArr = input.value.split('');
  let cleanStr = "";
  for (let i = 0; i < dirtyStrArr.length; i++) {
    if (dirtyStrArr[i] === " ") {
      dirtyStrArr[i] = "_";
    }
    cleanStr += dirtyStrArr[i];
  }

  // send the results to the function to add to the page.
  searchUsers(cleanStr);
  searchTracks(cleanStr);
}


function searchUsers(str) {
  // Receives search phrase string, returns json data.
  let api = 'https://api.soundcloud.com/users/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + str;

  fetch(api)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Problem.  Code: ' + response.status);
          return;
        }

        response.json().then(function(data) {
          let info = data;
          document.getElementById("artists").innerHTML = ""; // clear it
          for (let i = 0; i < info.length; i++) {
            // make the Artist info square.
            let markup = `
              <div class="artist">
                <a href="${info[i].permalink_url}" target="_blank">
                  <img class="picture" src="${info[i].avatar_url}" />
                  <p class="name"><a href="${info[i].permalink_url}" target="_blank">${info[i].username}</p>
                </a>
              </div>
            `
            document.getElementById("artists").innerHTML += markup;
          }
          return;
        })
      }
    )
}

function searchTracks(str) {
  // Receives search phrase string, returns json data.
  let api = 'https://api.soundcloud.com/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + str;

  // console.log("Submitting for tracks: q=" + str);
  fetch(api)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Problem.  Code: ' + response.status);
          return;
        }

        response.json().then(function(data) {
          let info = data;
          document.getElementById("tracks").innerHTML = ""; // clear it

          for (let i = 0; i < info.length; i++) {

            // make the track info list
            let markup = `
              <div class="track">
                <img class="picture" src="${info[i].user.avatar_url}" />
                <button id="play${i}" name="play" value="${info[i].stream_url}">play</button>
                <p class="title">${info[i].title}</p>
              </div>
            `
            document.getElementById("tracks").innerHTML += markup;

          }

          document.getElementById("tracks").addEventListener("click", function(e) {
	           if(e.target && e.target.nodeName == "BUTTON") {
               let url = e.target.value;
               url += "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
               player.removeAttribute('src');
               player.setAttribute('src', url);
               player.setAttribute('autoplay', true);
	            }
            });
          return;
        })
      }
    )
}








//  EXTRA options for when everything else is working.
//  This isn't for MVP.

function getUsersTracks(str) {
  // Receives search phrase string, returns json data.
  let api = 'https://api.soundcloud.com//users/' + str + '/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f';

  console.log("Submitting for user ID: q=" + api);
  fetch(api)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Problem.  Code: ' + response.status);
          return;
        }

        response.json().then(function(data) {
          let info = data;
          for (let i = 0; i < info.length; i++) {
            console.log("----------------");
            console.log("Song: " + info[i].title);
            console.log("  URL: " + info[i].permalink_url);
            console.log("  WF URL: " + info[i].waveform_url);
            console.log("  Stream URL: " + info[i].stream_url);
            console.log("----------------");
          }
          return;
        })
      }
    )
}
