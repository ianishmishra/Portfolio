// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDlGSCXrJxSm-Vv6s5-GiA32Y4veSl00NA",
    authDomain: "portfolio-f9f06.firebaseapp.com",
    projectId: "portfolio-f9f06",
    storageBucket: "portfolio-f9f06.firebasestorage.app",
    messagingSenderId: "1016004686540",
    appId: "1:1016004686540:web:d2f1d07317d80a5cbec869"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    saveMessage(name, email, message);

    // Show alert
    alert('Message Sent Successfully');
    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message) {
    db.collection("contacts").add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}
