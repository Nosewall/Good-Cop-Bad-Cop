
function displayJournal() {
    
    const parsedUrl = new URL(window.location.href);
    
    var id = parsedUrl.searchParams.get("id");

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
        .collection("journal entries")
        .doc(id)
        .get()
        .then(function (doc) {
            // pulls data from firestore database
            var title = doc.data().title;
            var date = doc.data().dateString;
            var mood = doc.data().mood;
            var journalText = doc.data().journalText;
            // creates content with data
            $("#journal-goes-here").append("<h1>" + title + "</h1>")
            $("#journal-goes-here").append("<h1>" + date + "</h1>")
            $("#journal-goes-here").append("<h2>" + mood + "</h2>")
            $("#journal-goes-here").append("<p>" + journalText + "</p>")
        })
    })
}

displayJournal();
