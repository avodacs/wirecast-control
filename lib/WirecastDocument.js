const applescript = require('applescript');
const wcCommands = require('./commands');
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
    this.queue = [];

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
    return new Promise((resolve, reject) => {
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

      applescript.execString(commandString, (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  };

  /**
   * Execute the set of Applescript commands specific to this Wirecast Document
   * which have been queued for sending.
   *
   * @memberof WirecastDocument
   */
  executeQueue() {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = this.queue;

        debug(`Executing queue with ${commands.length} command(s)`);

        let response = this.execute(commands);

        this.queue = [];

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Sets the live shot in the Wirecast Document
   *
   * @param {string} layer - Layer Name
   * @param {string} shot - Shot Name
   * @memberof WirecastDocument
   */
  setActiveShot(layer, shot) {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = [wcCommands.setActiveShot(layer, shot)];

        debug(`Setting Active Shot to Shot "${shot}" on Layer "${layer}"`);

        let response = this.execute(commands);

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Queues the live shot in the Wirecast Document
   *
   * @param {string} layer - Layer Name
   * @param {string} shot - Shot Name
   * @memberof WirecastDocument
   */
  queueActiveShot(layer, shot) {
    let commands = [wcCommands.setActiveShot(layer, shot)];

    this.queue.push(...commands);

    debug(`Queueing Active Shot to Shot "${shot}" on Layer "${layer}"`);
  }

  /**
   * Executes the "Go" command to transition the Preview to Live
   *
   * @memberof WirecastDocument
   */
  go() {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = [wcCommands.go()];

        debug('Executing Go Command');

        let response = this.execute(commands);

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Queues the "Go" command to transition the Preview to Live
   *
   * @memberof WirecastDocument
   */
  queueGo() {
    let commands = [wcCommands.go()];

    this.queue.push(...commands);

    debug('Queueing Go Command');
  }

  /**
   * Start Broadcasting
   *
   * @memberof WirecastDocument
   */
  startBroadcasting() {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = [wcCommands.startBroadcasting];

        debug('Starting Broadcast');

        let response = this.execute(commands);

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Queue Start Broadcasting
   *
   * @memberof WirecastDocument
   */
  queueStartBroadcasting() {
    let commands = [wcCommands.startBroadcasting()];

    this.queue.push(...commands);

    debug('Queueing Starting Broadcast');
  }

  /**
   * Stop Broadcasting
   *
   * @memberof WirecastDocument
   */
  stopBroadcasting() {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = [wcCommands.stopBroadcasting()];

        debug('Stopping Broadcast');

        let response = this.execute(commands);

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Queue Stop Broadcasting
   *
   * @memberof WirecastDocument
   */
  queueStopBroadcasting() {
    let commands = [wcCommands.stopBroadcasting()];

    this.queue.push(...commands);

    debug('Queueing Stop Broadcast');
  }

  /**
   * Start Recording
   *
   * @memberof WirecastDocument
   */
  startRecording() {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = [wcCommands.startRecording()];

        debug('Starting Recording');

        let response = this.execute(commands);

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Queue Start Recording
   *
   * @memberof WirecastDocument
   */
  queueStartRecording() {
    let commands = [wcCommands.startRecording()];

    this.queue.push(...commands);

    debug('Queueing Start Recording');
  }

  /**
   * Stop Recording
   *
   * @memberof WirecastDocument
   */
  stopRecording() {
    return new Promise(async (resolve, reject) => {
      try {
        let commands = [wcCommands.stopRecording()];

        debug('Stopping Recording');

        let response = this.execute(commands);

        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Queue Stop Recording
   *
   * @memberof WirecastDocument
   */
  queueStopRecording() {
    let commands = [wcCommands.stopRecording()];

    this.queue.push(...commands);

    debug('Queueing Stop Recording');
  }
}

module.exports = WirecastDocument;
