function getJournals(){
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
        .collection("journal entries")
        .limit(7)
        .orderBy("date", "desc")
        .get()
        .then(function(snap){
            let count = 0;
            snap.forEach(function(doc){
                var d = doc.data().date;
                var j = doc.data().jText;
                ++count;
                var maxCharDisplayed = 100;

                if (j.length >= maxCharDisplayed){
                    j = j.substring(0,maxCharDisplayed) + "...";
                }

                var journalCard = "<a id='journal-" + count + "' "
                + "class='list-group-item list-group-item-action'>"
                + "<div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>"
                + d + "</h5></div><p class='mb-1'>"
                + j + "</p></a>";

                $("#go-to-archive").before(journalCard);

            })
        })
    })
}

getJournals();