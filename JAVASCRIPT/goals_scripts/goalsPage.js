
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
          var goalButton = "<button>" + t + "</button>";
          goalsDiv.appendChild(goalButton);

        })
      })
  })
}

function addStep() {
  var stepDiv = document.getElementById("stepsDiv");
  var textBox = document.createElement("input");
  textBox.type = "text";
  textBox.class = "stepBox";
  stepDiv.appendChild(textBox);

}

function newGoal() {
  window.location.replace("new_goal.html");
}

function submitGoal() {
  window.location.replace("goals.html");
}