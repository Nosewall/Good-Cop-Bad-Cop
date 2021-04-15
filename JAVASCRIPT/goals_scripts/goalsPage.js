
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

  //Add goal name to firebase
  firebase.auth().onAuthStateChanged(function (user) {
    //Get the goal name
    var goalName = document.getElementById("goalName").value;
    // Writes data to DB
    if (user) {
      var newGoal = db.collection("users")
        .doc(user.uid).collection("goals");

      newGoal.add({
        Name: goalName,

      }).then(function () {
        console.log("Goal added to firebase by name");
      });

    } else {
      // no user
    }
  })

  //Add steps to firebase
  firebase.auth().onAuthStateChanged(function (user) {

    var stepsDiv = document.getElementById("stepsDiv");
    var stepCount = document.getElementById("stepsDiv").childElementCount;
    var allSteps = stepsDiv.childNodes;
    var index = 0;
    console.log("Stepcount - " + stepCount);
    while (index < stepCount.length) {
      if (user) {
        var newGoal = db.collection("users")
          .doc(user.uid).collection("goals");

        newGoal.add({
          step: allSteps[index].Value,

        }).then(function () {
          console.log("Steps added to firebase");
          window.location.replace("goals.html");
        });

      } else {
        // no user
      }
    }
  })
}


function cancelGoal() {
  window.location.replace("goals.html");
}