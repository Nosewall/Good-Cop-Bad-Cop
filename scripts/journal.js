function defaultDate(){
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#journal-date").value = today;
}

function writeJournal(){
    document.getElementById("save").addEventListener('click', function () {
        var entry = document.getElementById("journal-entry").value;
        var jDate = document.getElementById("journal-date").value;
        console.log(entry);
        console.log(jDate);
        var journalEntry = db.collection("test");

        journalEntry.add({
            date: jDate,
            jText: entry,
        });
    });
}
defaultDate();
writeJournal();