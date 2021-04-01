function defaultDate() {
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#journal-date").value = today;
}

function writeJournal() {
    document.getElementById("save").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {

            var entry = document.getElementById("journal-entry").value;
            var jDate = document.getElementById("journal-date").value;
            console.log(entry);
            console.log(jDate);
            if (user) {
                var journalEntry = db.collection("users")
                .doc(user.uid).collection("journal entries");

                journalEntry.add({
                    date: jDate,
                    jText: entry,
                });
            }
        })
    });
}
defaultDate();
writeJournal();