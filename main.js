let str = "";
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
  search(cleanStr);
}


function search(str) {
  // Receives search phrase string, returns json data.
  let api = 'https://api.soundcloud.com/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + str;

  console.log("Submitting: " + api);
  fetch(api)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Problem.  Code: ' + response.status);
          return;
        }

        response.json().then(function(data) {
          console.log(data);
          return data;
        })
      }
    )
}
