
// populates page with journal entries
function getJournals(){
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
        .collection("journal entries") // grabs journal entries
        .limit(7) // max 7 per page
        .orderBy("dateValue", "desc") // orders by date
        .get()
        .then(function(snap){
            snap.forEach(function(doc){
                // grabs journal title
                var t = doc.data().title;
                // grabs text
                var j = doc.data().journalText;
                // stores id of journal
                var id = doc.id;
                                
                if (t == ""){
                    t = doc.data().dateString;              
                }
                // Maximum number of characters displayed in preview
                var maxCharDisplayed = 100;
                // If over max trims preview
                if (j.length >= maxCharDisplayed){
                    j = j.substring(0,maxCharDisplayed) + "...";
                }
                // creates journal card
                var journalCard = "<a id='" + doc.id + "' "
                + "class='list-group-item list-group-item-action'>"
                + "<div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>"
                + t + "</h5></div><p class='mb-1'>"
                + j + "</p></a>";
                // places each new card before archive card
                $("#go-to-archive").before(journalCard);
                journalListener(id);

            })
        })
    })
}

function journalListener(id){
    document.getElementById(id)
    .addEventListener("click", function() {
        window.location.href="journal_view.html";
        window.location.href="journal_view.html?id=" + id;
    })
}

getJournals();
