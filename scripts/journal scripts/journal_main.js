
// populates page with journal entries
function getJournals(){
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
        .collection("journal entries") // grabs journal entries
        .limit(7) // max 7 per page
        .orderBy("date", "desc") // orders by date
        .get()
        .then(function(snap){
            let count = 0;
            snap.forEach(function(doc){
                // grabs journal title
                var t = doc.data().title;
                // grabs text
                var j = doc.data().journalText;
                
                if (t == ""){
                    t = new Date(doc.data().date);                    
                }
                // used to create id's for generated cards
                ++count;
                // Maximum number of characters displayed in preview
                var maxCharDisplayed = 100;
                // If over max trims preview
                if (j.length >= maxCharDisplayed){
                    j = j.substring(0,maxCharDisplayed) + "...";
                }
                // creates journal card
                var journalCard = "<a id='journal-" + count + "' "
                + "class='list-group-item list-group-item-action'>"
                + "<div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>"
                + t + "</h5></div><p class='mb-1'>"
                + j + "</p></a>";
                // places each new card before archive card
                $("#go-to-archive").before(journalCard);

            })
        })
    })
}

getJournals();