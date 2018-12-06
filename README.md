# wirecast-control

Promise based Wirecast control for Node.js.

## Features

* Start and Stop Broadcasting
* Start and Stop Recording
* Set the live shot for any Wirecast Document

## Example

This example sets the active shot to one named "Placeholder Slide" in the first layer.

```js
const WirecastDocument = require('wirecast-control');

let doc = new WirecastDocument('MyDocument', {
  autoLive: true
});

doc.setActiveShot('Master Layer 1', 'Placeholder Slide');
```

### Queueing

If multiple commands are going to be executed together, it's more efficient to queue them and them submit them in a batch.  Otherwise, each individual command, if executed independently, but multiple times, will incur additional overhead.

```js
const WirecastDocument = require('wirecast-control');

let doc = new WirecastDocument('MyDocument', {
  autoLive: true
});

doc.queueActiveShot('Master Layer 1', 'Placeholder Slide');
doc.queueActiveShot('Master Layer 2', 'Background Video');
doc.executeQueue();
```

### Multi Document Queue Execution

When working with multiple documents, it can be more efficient to build up the queue for each Document, and then execute them all at the same time.  There is a static method `executeDocumentsQueues` which can help with this.

```js
const WirecastDocument = require('wirecast-control');

// First Document
let docA = new WirecastDocument('Document A', {
  autoLive: true
});

docA.queueActiveShot('Master Layer 2', 'Clear Layer');
docA.queueActiveShot('Master Layer 3', 'Clear Layer');

// Second Document
let docB = new WirecastDocument('Document B', {
  autoLive: true
});

docB.queueActiveShot('Master Layer 2', 'Clear Layer');
docB.queueActiveShot('Master Layer 3', 'Clear Layer');

WirecastDocument.executeDocumentsQueues([docA, docB]);
```

More examples can be found in [examples](examples/).  These examples don't all show async/await or the use of Promises, but Promises can be used.

## Debugging

wirecast-control uses the [debug](https://www.npmjs.com/package/debug) module for debugging.  To see logging messages, include `DEBUG=wirecast-control*` in your Environment.

## Credits

Examples of Applescript commands for Wirecast were found at the following links:

* https://github.com/Jakobo/wirecast-utilities
* https://github.com/iamjohnbarker/wirecast-applescript

## License

MIT
