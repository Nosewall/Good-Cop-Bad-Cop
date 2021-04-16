// Variable used to store active coach.
let activeCoach;
// Pulls the active coach for user from db and stores in activeCoach.
function getCoach() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users")
                .doc(user.uid)
                .get()
                .then(function (doc) {
                    activeCoach = doc.data().selectedCoach;
                })
        } else {
            // no user signed in
        }
    })

}

// Get a phrase from the database using the coaches name and the key of the motivation you want to use
function getPhrase(trainerName, motivation) {
    db.collection("Coaches")
        .doc(trainerName)
        .get()
        .then(snapshot => {
            console.log(snapshot);
            var phrase = snapshot.data()[motivation];
            alert(phrase);

        })


}

function testSnapShot() {
    getPhrase("Decard", "checkIn1");
}
getCoach();