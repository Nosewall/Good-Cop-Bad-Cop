
function getGoals() {
  var goalsDiv = document.getElementById("goalsDiv"); // Get the goals div to append goals onto.
  firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users").doc(user.uid)
      .collection("goals") // grabs goals from database
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          // grabs Goal title
          var t = doc.data().Name;
          // grabs the id of the goal
          var id = doc.id;
          var goalButton = document.createElement("button");
          goalButton.innerHTML = t;

          // goalButton.onclick = "toNewGoalPage()";
          goalButton.addEventListener("click", function () {
            window.location.replace("goal_view.html?id=" + id);
          });
          goalsDiv.appendChild(goalButton);


        })
      })
  })
}

function toNewGoalPage(id) {
  window.location.replace("goal_view.html");
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

      }).then(function (newGoal) {
        console.log("Goal added to firebase by name");
        var stepsDiv = document.getElementById("stepsDiv");
        var stepCount = document.getElementById("stepsDiv").childElementCount;
        var allSteps = stepsDiv.childNodes;
        var index = 0;
        console.log("Stepcount - " + stepCount);
        console.log(index < stepCount);
        while (index < stepCount) {
          console.log("In the while loop");
          var stepToAdd = allSteps[index].value;
          index++;
          console.log("Trying to add " + stepToAdd);
          console.log(typeof (stepToAdd));
          if (user) {
            var newSteps = newGoal.collection("steps");

            newSteps.add({
              step: stepToAdd,

            }).then(function () {
              console.log("Step added to firebase");

            });

          } else {
            // no user
          }
        }
      }
      ).then(function () {
        window.location.assign("./goals.html");
      });
    }
  })
}

function redirectToGoals() {
  window.location.replace("./goals.html");
}

function submitSteps(documentId) {
  //Add steps to firebase
  firebase.auth().onAuthStateChanged(function (user) {

    var stepsDiv = document.getElementById("stepsDiv");
    var stepCount = document.getElementById("stepsDiv").childElementCount;
    var allSteps = stepsDiv.childNodes;
    var index = 0;
    console.log("Stepcount - " + stepCount);
    console.log(index < stepCount);
    while (index < stepCount) {
      console.log("In the while loop");
      console.log(allSteps[index]);
      console.log(allSteps[index].value);
      console.log(typeof (allSteps[index]));
      console.log(typeof (allSteps[index].value));
      var stepToAdd = allSteps[index].value;
      index++;
      if (user) {
        var newSteps = db.collection("users")
          .doc(user.uid).collection("goals")
          .doc("steps");

        newSteps.add({
          step: stepToAdd,

        }).then(function () {
          console.log("Step added to firebase");
        });

      } else {
        // no user
      }
    }
  })
}

function getGoalInfo() {
  // Assign variables for the document.
  var header = document.getElementById("goalViewHeader");

  const parsedUrl = new URL(window.location.href);
  var id = parsedUrl.searchParams.get("id");
  //Get the collection of steps and the goal name.
  var user = firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users")
      .doc(user.uid)
      .collection("goals")
      .doc(id)
      .collection("steps")
      .get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          var step = doc.data().step;

          var stepDiv = document.getElementById("eachStepDiv");
          var stepBox = document.createElement("button");
          stepBox.innerHTML = step;
          stepBox.addEventListener("click", function () {
            phrase = getPhrase("Carol", "checkIn1")
          });
          stepDiv.appendChild(stepBox);
        });
      });
  });
}

function cancelGoal() {
  window.location.replace("goals.html");
}