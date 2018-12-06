// This example starts and stops Broadcasting.

const WirecastDocument = require('wirecast-control');

let doc = new WirecastDocument('MyDocument', {
  autoLive: true
});

doc.startBroadcasting();

setTimeout(() => {
  doc.stopBroadcasting();
}, 10000);
