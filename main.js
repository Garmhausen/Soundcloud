let input = document.getElementById('searchInput');
input.focus();  // put the focus on the input text field.
let submit = document.getElementById('submitButton');

// When the button is clicked, send the search input data and get the results.
submit.onclick = qualifyAndSearch;

function qualifyAndSearch(event) {
  // When the button is clicked, clean the input and send string to search().
  console.log("Initiate search...");
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

  console.log("Submitting for users: q=" + str);
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
            console.log("++++++++++++++++");
            console.log("Artist: " + info[i].username);
            console.log("  URL: " + info[i].permalink_url);
            console.log("++++++++++++++++");

            // make the Artist info square.
            let markup = `
              <div class="artist">
                <img class="picture" src="${info[i].avatar_url}" />
                <p class="name">${info[i].username}</p>
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

  console.log("Submitting for tracks: q=" + str);
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
