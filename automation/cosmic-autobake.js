/*
  Cosmic is a multi-purpose, outer space-themed bot on multiplayerpiano, created by Hri7566.
  This file automates using the baking comman efficiently and without the need for the user to interact.
  
  It is generally recommended that you keep the tab focused in some way so that it does not periodically disconnect, while this is not usually an issue, there can be cases where the script misses a chat message from the bot due to being disconnected, which breaks the baking loop and requires manually restarting. If you suspect you may disconnect at times, it is recommended to set the BAKE_ON_RECONNECT boolean to true.
*/

// constants
const BAKE_ON_RECONNECT = true; // whether or not to send the bake command after being disconnected and reconnected.
const BAKE_ON_EXECUTE = true; // Whether or not to immediately send the bake command in chat when the script is ran.
const BOT_IDS = [ "5fd68beb48a7cca92bc536c0" ]; // _IDs of the cosmic bot, leave as-is if you are unsure. If empty, all _IDs are accepted as being the bot. This will also change the behaviour of reconnects.
const BOT_PREFIX = '*'; // The prefix for the bot, this is the character or string that comes before commands (e.g. *help)
const MESSAGE_PREFIX = '\u034f'; // Anything that comes before the actual message in chat, leave as-is if you are unsure.
const BAKING_MESSAGE = "[Wawa's baking script]"; // Text that comes after the baking command, this input is not required and is ignored by the bot.
const DEBUG = false; // Set to true if you want to see the script's thought process in your console.

// functions
function handleMessage(event) {
  // get useful details from the event object
  let user = event.p;
  let message = event.a;
  let timestamp = new Date(event.t);
  
  if(BOT_IDS.length === 0 || BOT_IDS.includes(user._id)) {
    // This user is the cosmic bot, proceed with checking message.
    if(message.startsWith(MESSAGE_PREFIX + MPP.client.getOwnParticipant().name + " finished baking")) {
      debug("ChatHandler", "Baking finished, sending next bake command.");
      MPP.chat.send(BOT_PREFIX + 'bake ' + BAKING_MESSAGE);
    } else {
      debug("ChatHandler", "Message mismatch!");
    };
  } else {
    debug("ChatHandler", "_ID mismatch!");
  }; 
};

function debug(service, text) {
  if(DEBUG) console.log("[COSMIC-AUTOBAKE.JS] [DEBUG:" + service + "]" + text);
};

// listeners
MPP.client.on('a', handleMessage);
MPP.client.on('ch', event => {
  if(BAKE_ON_RECONNECT) {
    if(Object.values(client.ppl).map(x => BOT_IDS.includes(x._id)).indexOf(true) !== -1) {
      debug("BakeOnReconnect", "Sending chat message to bake.");
      MPP.chat.send(BOT_PREFIX + 'bake ' + BAKING_MESSAGE);
    } else {
      debug("BakeOnReconnect", "Cosmic is not in this channel!");
    };
  } else {
    debug("BakeOnReconnect", "Not sending chat message to bake since bake on reconnect is disabled.");
  };
});

if(BAKE_ON_EXECUTE) MPP.chat.send(BOT_PREFIX + 'bake ' + BAKING_MESSAGE);
