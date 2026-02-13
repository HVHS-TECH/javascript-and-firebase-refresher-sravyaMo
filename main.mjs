/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by <Your Name Here>, Term 2 202?
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs', 
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout,
         fb_writeRecords, fb_readRecords }
    from './fb_io.mjs';

/**************************************************************/
// initialise
/**************************************************************/
fb_initialise();

/**************************************************************/
// functions
/**************************************************************/
    window.fb_initialise   = fb_initialise;
    window.fb_authenticate   = fb_authenticate;
    window.fb_detectLoginChange   = fb_detectLoginChange;
    window.fb_logout   = fb_logout;
    window.fb_writeRecords   = fb_writeRecords;
    window.fb_readRecords   = fb_readRecords;

/**************************************************************/
// index.html main code
/**************************************************************/


/**************************************************************/
//   END OF CODE
/**************************************************************/