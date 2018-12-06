// This example starts and stops Recording.

const WirecastDocument = require('wirecast-control');

let doc = new WirecastDocument('MyDocument', {
  autoLive: true
});

doc.startRecording();

setTimeout(() => {
  doc.stopRecording();
}, 10000);
