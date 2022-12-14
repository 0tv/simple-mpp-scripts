/*
  Cosmic is a multi-purpose, outer space-themed bot on multiplayerpiano, created by Hri7566.
  This file automates using the baking comman efficiently and without the need for the user to interact.
  
  It is generally recommended that you keep the tab focused in some way so that it does not periodically disconnect, while this is not usually an issue, there can be cases where the script misses a chat message from the bot due to being disconnected, which breaks the baking loop and requires manually restarting. If you suspect you may disconnect at times, it is recommended to set the BAKE_ON_RECONNECT boolean to true.
*/

// constants
const MESSAGES = ['wa','wawa'];
const DEBUG = false; // Set to true if you want to see the script's thought process in your console.
const VERSION = "1.0.0"; // Recommended not to mess with this, there's no reason to anyway.

// for integration with other scripts
if(!window.simpleMPPscripts) window.simpleMPPscripts = { modules: [] };
window.simpleMPPscripts.modules.push({ name: 'Wawa', script: '/automation/wawa.js', version: VERSION, authors: ['0tv (wawa)'] });

// functions
function handleMessage(event) {
  // get useful details from the event object
  let user = event.p;
  let message = event.a;
  let timestamp = new Date(event.t);
  
  if(user._id === MPP.client.getOwnParticipant()._id) return debug("ChatHandler", "Ignoring own message.");
  if(!MESSAGES.includes(message)) return debug("ChatHandler", "Message does not match!");
  
  MPP.chat.send(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
};

function debug(service, text) {
  if(DEBUG) console.log("[WAWA.JS] [DEBUG:" + service + "]" + text);
};

// listeners
MPP.client.on('a', handleMessage);
