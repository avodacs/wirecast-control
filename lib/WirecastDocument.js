const debug = require('debug')('wirecast-control:WirecastDocument');
const runApplescript = require('run-applescript');
const wcCommands = require('./commands');

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
   * Execute an Array of Applescript commands
   *
   * @static
   * @param {*} commands
   * @returns
   * @memberof WirecastDocument
   */
  static executeRaw(commands) {
    return new Promise(async (resolve, reject) => {
      let commandString = commands.join('\n');

      let debugString = commands.join('\n\t');
      debug(`Executing Applescript Commands:\n\t${debugString}`);

      try {
        let result = await runApplescript(commandString);

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Given am Array of Documents, execute their queues.
   *
   * @static
   * @param {*} documents
   * @returns
   * @memberof WirecastDocument
   */
  static executeDocumentsQueues(documents) {
    return new Promise((resolve, reject) => {
      try {
        let queuedCommands = [
          wcCommands.tellWirecast()
        ];

        documents.forEach(document => {
          queuedCommands.push(...document.getDocumentCommands(true));
        });

        queuedCommands.push(wcCommands.endTell());

        let result = WirecastDocument.executeRaw(queuedCommands);

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Execute a set of Applescript commands specific to this Wirecast Document
   *
   * @param {string[]} commands - Commands to run
   * @memberof WirecastDocument
   */
  execute(commands) {
    return new Promise(async (resolve, reject) => {
      try {
        let allCommands = [
          wcCommands.tellWirecast(),
          wcCommands.setDocument(this.name),
          wcCommands.setAutoLive(this.autoLive),
          ...commands,
          wcCommands.endTell()
        ];

        let result = await WirecastDocument.executeRaw(allCommands);

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Returns a list of Document commands, with the wrapper to set the document
   * which Wirecast needs to control.
   *
   * @param {boolean} clear - Should the queue for this Document be cleared?
   * @returns
   * @memberof WirecastDocument
   */
  getDocumentCommands(clear) {
    let documentCommands = [
      wcCommands.setDocument(this.name),
      wcCommands.setAutoLive(this.autoLive),
      ...this.queue
    ];

    if (clear) {
      this.queue = [];
    }

    return documentCommands;
  }

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

        let response = await this.execute(commands);

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
