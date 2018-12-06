// This example sets the active shot to one named "Placeholder Slide" in the
// first layer.

const WirecastDocument = require('wirecast-control');

let doc = new WirecastDocument('MyDocument', {
  autoLive: true
});

doc.setActiveShot('Master Layer 1', 'Placeholder Slide');
