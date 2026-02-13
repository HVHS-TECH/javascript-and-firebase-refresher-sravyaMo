//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by <Your Name Here>, Term 2 202?
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');

let userDetails = {
    displayName:'n/a',
    email:'n/a',
    photoURL:'n/a',
    uid:'n/a' };

let fb_dataArray = [];

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged,
        signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set, get, update, query, orderByChild, limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { 
    fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout,
    fb_writeRecords, fb_readRecords };
let FB_GAMEDB;

/******************************************************/
// fb_initialise()
// Called by html initialise firebase button
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ', 
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    
    const FB_GAMECONFIG = {
        apiKey: "AIzaSyC8yjUE2rdGPAQDpgPhCghDh5SPJfxnrMA",
        authDomain: "sravya-moparthi-13comp-refresh.firebaseapp.com",
        databaseURL: "https://sravya-moparthi-13comp-refresh-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "sravya-moparthi-13comp-refresh",
        storageBucket: "sravya-moparthi-13comp-refresh.firebasestorage.app",
        messagingSenderId: "107354372361",
        appId: "1:107354372361:web:6545073d56c6d31132bbd8"
    };
                
    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
    FB_GAMEDB  = getDatabase(FB_GAMEAPP);
    console.info(FB_GAMEDB);         	//DIAG
}

/*****************************************************/
// fb_authenticate()
// Called by html authenticate button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_authenticate() {
    console.log('%c fb_authenticate(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    signInWithPopup(AUTH, PROVIDER).then((result) => {
        //Code for a successful authentication goes here
        userDetails.displayName = result.user.displayName;
        userDetails.email = result.user.email;
        userDetails.photoURL = result.user.photoURL;
        userDetails.uid = result.user.uid;
        
        console.log(userDetails);
    })
    .catch((error) => {
        //Code for an authentication error goes here
        console.log(error);
    });
}

/*****************************************************/
// fb_detectLoginChange()
// Called by html detect login change button
// Detects login changes
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_detectLoginChange() {
    console.log('%c fb_detectLoginChange(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    let fb_loginStatus = 'n/a';
    
    const AUTH = getAuth();
    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            // Code for user logged in goes here
            fb_loginStatus = 'logged in';
        } else {
            // Code for user logged out goes here
            fb_loginStatus = 'logged out';
        }
        console.log('%c fb_detectLoginChange(): ' + fb_loginStatus,
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    }, (error) => {
        // Code for an onAuthStateChanged error goes here
        console.log(error);
    });
}

/*****************************************************/
// fb_logout()
// Called by html logout button
// Logs out of Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_logout() {
    console.log('%c fb_logout(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const AUTH = getAuth();
    signOut(AUTH).then(() => {
        // Code for a successful logout goes here
    console.log('%c fb_logout(): SUCCESSFUL ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    })
    .catch((error) => {
        // Code for a logout error goes here
        console.log(error); //alter to console.error
    });
}

/*****************************************************/
// fb_writeRecords()
// Called by html write record button
// Writes a record to firebase
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_writeRecords() {
    console.log('%c fb_writeRecords(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const dbReference= ref(FB_GAMEDB, 'userDetails/' +userDetails.uid);
    set(dbReference, userDetails).then(() => {
        // Code for a successful write goes here
        console.log('%c fb_writeRecords(): SUCCESSFUL',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    }).catch((error) => {
        console.log(error);
        // Code for a write error goes here
    });
}

/*****************************************************/
// fb_readRecords()
// Called by html read record button
// Reads a specific firebase record
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_readRecords() {
    console.log('%c fb_readRecords(): ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const dbReference= ref(FB_GAMEDB, 'userDetails/' +userDetails.uid);
    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            // Code for a successful read goes here
            console.log(fb_data);
            console.log('%c fb_readRecords(): SUCCESSFUL READ',
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        } else {
            // Code for no record found goes here
            console.log('No records found');
        }
    }).catch((error) => {
        // Code for a read error goes here
        console.log(error);
    });
}

/*****************************************************/
// fb_readAll()
// Called by html read all button
// Reads all records in a path
// Input:  n/a
// Return: n/a
// need help for firebase part
/******************************************************/