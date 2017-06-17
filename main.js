let str = "";
let input = document.getElementById('')


function search(str) {
  // receives search phrase string, returns json data.
  let api = 'https://api.soundcloud.com/users/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&' + str;
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
