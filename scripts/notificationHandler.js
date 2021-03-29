// Variable used to store active coach.
let activeCoach;
// Pulls the active coach for user from db and stores in activeCoach.
function getCoach(){
    firebase.auth().onAuthStateChanged(function (user){
        if(user){
            db.collection("users")
            .doc(user.uid)
            .get()
            .then(function(doc){
                console.log(doc.data().selectedCoach);
                activeCoach = doc.data().selectedCoach;
            })
        } else {
            // no user signed in
        }
    })

}

function getPhrase(trainerName, motivation) {
    var phrase;

    db.collection("Coaches")
        .doc(trainerName)
        .get()
        .then(snapshot => {
            console.log(snapshot.data()[motivation]);

        })


}


function testSnapShot() {
    getPhrase("Decard", "checkIn1");
}
testSnapShot();
getCoach();