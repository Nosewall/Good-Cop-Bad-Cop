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