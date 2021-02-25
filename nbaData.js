document.getElementById("playersubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const firstName = document.getElementById("playerFirstName").value;
  const lastName = document.getElementById("playerLastName").value;

  if (firstName === "" && lastName === "")
    return;


  if(lastName === "" && firstName !== "") {
    let results = "";

    console.log(firstName);
    const url = "https://www.balldontlie.io/api/v1/players/?search=" + firstName;
    console.log(url);
    fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
    results += "<p> Please specify last name </p>";
    results += "<ul>";
    console.log(json);
    for(let i = 0; i < json.data.length; ++i) {
      results += "<li>" + json.data[i].last_name + "</li>";

    }
    results += "</ul>";
    document.getElementById("playerlist").innerHTML = results;

  });
  return;

}

  fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {

     let results = "<H1>" + json.postion + "</H1>"
     document.getElementById("playerPosition").innerHTML = results;




    });
});
