let str = "";
let input = document.getElementById('searchInput');
input.focus();  // put the focus on the input text field.
let submit = document.getElementById('submitButton');
// When the button is clicked, send the search input data and get the results.
submit.onclick = qualifyAndSearch;


function search(str) {
  // Receives search phrase string, returns json data.
  let api = 'https://api.soundcloud.com/users/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=' + str;

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
