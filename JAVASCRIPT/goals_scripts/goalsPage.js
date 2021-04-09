
function getGoals() {
  var goalsDiv = document.getElementById("goalsDiv"); // Get the goals div to append goals onto.
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid)
      .collection("goals") // grabs goals from database
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          // grabs Goal title
          var t = doc.data().title;
          // grabs the id of the goal
          var id = doc.id;
          var goalButton = "<button></button>";
          goalButton.innerHTML = t; //Set the button title to the goal title
          goalsDiv.appendChild(goalButton);

        })
      })
  })
}

function newGoal() {

}