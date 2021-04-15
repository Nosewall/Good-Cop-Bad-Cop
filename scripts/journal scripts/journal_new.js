
// Writes journal entry to firestore DB
function writeJournal() {
    // Adds listener to save button
    document.getElementById("save")
    .addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {

            // Grabs form data and stores as local variable
            var entry = document.getElementById("journal-entry").value;
            var entryTitle = document.getElementById("journal-title").value;
            var entryMood = document.getElementById("journal-mood").value;
            // Gets time stamp in milliseconds
            var entryDate = new Date().getTime();
            var dateAsString = new Date().toDateString();
            // Writes data to DB
            if (user) {
                var journalEntry = db.collection("users")
                .doc(user.uid).collection("journal entries");

                journalEntry.add({
                    dateValue: entryDate,
                    dateString: dateAsString,
                    title: entryTitle,
                    journalText: entry,
                    mood: entryMood,
                }).then(function () {
                    window.location.assign("./journal_success.html");
                });
                
            } else {
                // no user
            }
        })
    });
}

writeJournal();