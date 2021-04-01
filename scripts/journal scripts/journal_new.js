
// Writes journal entry to firestore DB
function writeJournal() {
    // Adds listener to save button
    document.getElementById("save").addEventListener('click', function () {
        firebase.auth().onAuthStateChanged(function (user) {

            // Grabs form data and stores as local variable
            var entry = document.getElementById("journal-entry").value;
            var entryTitle = document.getElementById("journal-title").value;
            var entryMood = document.getElementById("journal-mood").value;
            console.log(entryMood);
            // Gets Date
            var entryDate = new Date();
            // Writes data to DB
            if (user) {
                var journalEntry = db.collection("users")
                .doc(user.uid).collection("journal entries");

                journalEntry.add({
                    date: entryDate,
                    title: entryTitle,
                    journalText: entry,
                    mood: entryMood,
                });
            } else {
                // no user
            }
        })
    });
}

writeJournal();