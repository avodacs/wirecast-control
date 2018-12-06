const applescript = require('applescript');
const debug = require('debug')('wirecast-control:WirecastDocument');

/**
 * Wirecast Document used for controlling Wirecast
 *
 * @class WirecastDocument
 */
class WirecastDocument {
  constructor(name, config) {
    this.name = name;
    this.autoLive = false;

    if (config !== undefined) {
      if (config.autoLive) {
        this.autoLive = true;
      }
    }

    debug(`Created Document "${name}"`);
    debug(`  Auto Live is ${this.autoLive}`);
  }

  /**
   * Execute a set of Applescript commands specific to this Wirecast Document
   *
   * @param {string[]} commands - Commands to run
   * @memberof WirecastDocument
   */
  execute(commands) {
    let preCommands = [
      'tell application "Wirecast"',
      `set doc to the document named "${this.name}"`,
      `set auto live of doc to ${this.autoLive}`
    ];

    let postCommands = [
      'end tell'
    ];

    let allCommands = [
      ...preCommands,
      ...commands,
      ...postCommands
    ];

    let commandString = allCommands.join('\n');

    let debugString = allCommands.join('\n\t');
    debug(`Executing Applescript Commands:\n\t${debugString}`);

    applescript.execString(commandString);
  };

  /**
   * Sets the live shot in the Wirecast Document
   *
   * @param {string} layer - Layer Name
   * @param {string} shot - Shot Name
   * @memberof WirecastDocument
   */
  setActiveShot(layer, shot) {
    let commands = [
      `set active shot of the layer named "${layer}" of doc to the shot named "${shot}" of the layer named "${layer}" of doc`
    ];

    debug(`Setting Active Shot to Shot "${shot}" on Layer "${layer}"`);

    this.execute(commands);
  }

  /**
   * Executes the "Go" command to transition the Preview to Live
   *
   * @memberof WirecastDocument
   */
  go() {
    let commands = [
      'go doc'
    ];

    debug('Executing Go Command');

    this.execute(commands);
  }

  /**
   * Start Broadcasting
   *
   * @memberof WirecastDocument
   */
  startBroadcasting() {
    let commands = [
      'start broadcasting doc'
    ];

    debug('Starting Broadcast');

    this.execute(commands);
  }

  /**
   * Stop Broadcasting
   *
   * @memberof WirecastDocument
   */
  stopBroadcasting() {
    let commands = [
      'stop broadcasting doc'
    ];

    debug('Stopping Broadcast');

    this.execute(commands);
  }

  /**
   * Start Recording
   *
   * @memberof WirecastDocument
   */
  startRecording() {
    let commands = [
      'start recording doc'
    ];

    debug('Starting Recording');

    this.execute(commands);
  }

  /**
   * Stop Recording
   *
   * @memberof WirecastDocument
   */
  stopRecording() {
    let commands = [
      'stop recording doc'
    ];

    debug('Stopping Recording');

    this.execute(commands);
  }
}

module.exports = WirecastDocument;