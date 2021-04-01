function showUploadedPicture(){
      // pointer #1
    const image = document.getElementById("images");   // pointer #2
    fileInput.addEventListener('change', function(e){        //event listener
        var blob = URL.createObjectURL(e.target.files[0]);
        image.src = "images/dog.png";    //change DOM image
    })
}
showUploadedPicture();

function uploadUserProfile() {
    firebase.auth().onAuthStateChanged(function(user) {
        var fileInput = document.getElementById("images");
        const image = document.getElemtnById("dog");
        });
        
            var storageRef = firebase.storage().ref("images/" + user.uid + ".png"); // Get reference
            storageRef.put(pickedfile); // Upload picked file to cloud storage
        
            storageRef.getDownloadURL()
                .then(function (url) { // Get URL of the uploaded file
                    console.log(url); // Save the URL into users collection
                    db.collection("coaches_image").doc(user.uid).update({
                        "characters": url
                    })
                    .then(function() {
                        console.log("Added profile pic URL to Firestore.");
                    })
            })
}
uploadUserProfile();