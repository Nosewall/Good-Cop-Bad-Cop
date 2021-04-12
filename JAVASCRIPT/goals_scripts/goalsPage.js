
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
  textBox.className = "stepBox";
  stepDiv.appendChild(textBox);

}

function newGoal() {
  window.location.replace("new_goal.html");
}

function submitGoal() {
  var goalName = document.getElementById("goalName").nodeValue;
  var all = document.getElementsByTagName("*");
  for (var i = 0, max = all.length; i < max; i++) { //Get all elements on the page and loop through them
    if (all[i].className == "stepBox") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
          .collection("goals").doc(goalName)
          .set({
            step: all[i],
          });
      })
    }
  }
}

function cancelGoal() {
  window.location.replace("goals.html");
}