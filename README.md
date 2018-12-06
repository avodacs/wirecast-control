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

More examples can be found in [examples](examples/).

## Debugging

wirecast-control uses the [debug](https://www.npmjs.com/package/debug) module for debugging.  To see logging messages, include `DEBUG=wirecast-control*` in your Environment.

## Credits

Examples of Applescript commands for Wirecast were found at the following links:

* https://github.com/Jakobo/wirecast-utilities
* https://github.com/iamjohnbarker/wirecast-applescript

## License

MIT
