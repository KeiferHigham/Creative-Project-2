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
    results += "<p> Which of these players are you looking for? </br> Please type in first and last name </p>";
    results += "<ul>";
    console.log(json);
    for(let i = 0; i < json.data.length; ++i) {
      results += "<li>" + json.data[i].first_name + " " + json.data[i].last_name + "</li>";

    }
    results += "</ul>";
    document.getElementById("playerlist").innerHTML = results;

  });
  return;

  }

  if(lastName !== "" && firstName === "") {
    let results = "";

  console.log(firstName);
  const url = "https://www.balldontlie.io/api/v1/players/?search=" + lastName;
  console.log(url);
  fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
  results += "<p> Which of these players are you looking for? </br> Please type in first and last name </p>";
  results += "<ul>";
  console.log(json);
  for(let i = 0; i < json.data.length; ++i) {
    results += "<li>" + json.data[i].first_name + " " + json.data[i].last_name + "</li>";

  }
  results += "</ul>";
  document.getElementById("playerlist").innerHTML = results;

});
return;

}

const url = "https://www.balldontlie.io/api/v1/players/?search=" + firstName + "+" + lastName;
console.log(url);



let playerName = (firstName.charAt(0).toUpperCase() + firstName.slice(1)) + " " + (lastName.charAt(0).toUpperCase() + lastName.slice(1));

console.log(playerName);
  let playerId = 0;
  let results = "";
  fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
console.log(json);
        let j = 0;
        for(let i = 0; i < json.data.length; ++i){
          let first = json.data[i].first_name;
          let last = json.data[i].last_name;
          let fullName = first + " " + last;

          if (playerName === fullName) {
            j = i;
            break;
          }

        }

        playerId = json.data[j].id;
        let teamId = json.data[j].team.id;




     results += "<h2>" + playerName + "</h2>" + "<p>Team: " + json.data[j].team.full_name + "</br> Position: " + json.data[j].position + "</br> Height: " + json.data[j].height_feet + " feet " + json.data[j].height_inches + " inches" + "</p>";






         document.getElementById("playerPosition").innerHTML = results;

         const url2 = "https://www.balldontlie.io/api/v1/stats/?seasons[]=2019&player_ids[]=" + playerId + "&postseason=true";

         console.log(url2);
         fetch(url2)
             .then(function(response) {
               return response.json();
             }).then(function(json) {

               let results2 = "";
               results2 += "<h2>2019 Stats: </h2>"
               console.log(json);
               let avgPts = 0;
               let avgrebounds = 0;
               let avgStl = 0;
               let avgFtPct = 0;

               for (let i = 0; i < json.data.length; ++i) {
                 avgPts += json.data[i].pts;
                 avgrebounds += json.data[i].reb;
                 avgStl += json.data[i].stl;
                 avgFtPct += json.data[i].ft_pct;
               }
               avgPts = avgPts/json.data.length;
               avgrebounds = avgrebounds/json.data.length;
               avgStl = avgStl/json.data.length;
               avgFtPct = avgFtPct/json.data.length;

               results2 += "<p>Average Points per game: " + avgPts + "</br>Average Rebounds per game: " + avgrebounds + "</br>Average Steals per game: " + avgStl + "</br>Average FGP per game: " + avgFtPct + "</p>";

               document.getElementById("playerStats").innerHTML = results2;

         });

         const url3 = "https://www.balldontlie.io/api/v1/games/?seasons[]=2019&team_ids[]=" + teamId;
         console.log(url3);
         fetch(url3)
             .then(function(response) {
               return response.json();
             }).then(function(json) {
               console.log(json);

               let results3 = "<h2>2019 Team Results </h2> <p>";

               for (let i = 0; i < json.data.length; ++i) {
                 results3 += json.data[i].home_team.full_name + ": " + json.data[i].home_team_score + " &nbsp; &nbsp;" + json.data[i].visitor_team.full_name + ": " + json.data[i].visitor_team_score + "</br>";
               }

               results3 += "</p>";
               console.log(results3);

               document.getElementById("teamGames").innerHTML = results3;

             });



    });
    console.log(playerId);




});
