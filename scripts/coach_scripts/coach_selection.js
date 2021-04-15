// Stores trainer selection
let newCoach;

// When user clicks trainer button stores their choice until sent to
// firebase db.
function selectCoach() {
    // Selects patches the dog
    document.getElementById("dog-button").addEventListener('click', function () {
        newCoach = 'patches';
        console.log(newCoach);
    })
    // Selects mother character
    document.getElementById("mother-button").addEventListener('click', function () {
        newCoach= 'mother';
        console.log(newCoach);
    })
    // Selects soldier character
    document.getElementById("soldier-button").addEventListener('click', function () {
        newCoach = 'soldier';
        console.log(newCoach);
    })
    // Selects teacher character
    document.getElementById("teacher-button").addEventListener('click', function () {
        newCoach = 'teacher';
        console.log(newCoach);
    })

}
// Saves selection to fireStore under user data
function confirmCoach() {
    document.getElementById("button-confirm").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {
            // If user is logged in updates to selected trainer
            if (user) {
                db.collection("users").doc(user.uid)
                .update({
                    selectedCoach: newCoach
                }).then(function () {
                    // Redirects user after saving new coach
                    window.location.assign("./settings.html");
                });                
                
            } else {
                // Nobody signed in
            }
        })
    })
}

selectCoach();
confirmCoach();