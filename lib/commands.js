const endTell = () => {
  return 'end tell';
};

const go = () => {
  return 'go doc';
};

const setActiveShot = (layer, shot) => {
  return `set active shot of the layer named "${layer}" of doc to the shot named "${shot}" of the layer named "${layer}" of doc`;
};

const setAutoLive = (enabled) => {
  return `set auto live of doc to ${enabled}`;
};

const setDocument = (name) => {
  return `set doc to the document named "${name}"`;
};

const startBroadcasting = () => {
  return 'start broadcasting doc';
};

const stopBroadcasting = () => {
  return 'stop broadcasting doc';
};

const startRecording = () => {
  return 'start recording doc';
};

const stopRecording = () => {
  return 'stop recording doc';
};

const tellWirecast = () => {
  return 'tell application "Wirecast"';
};

module.exports = {
  endTell,
  go,
  setActiveShot,
  setAutoLive,
  setDocument,
  startBroadcasting,
  stopBroadcasting,
  startRecording,
  stopRecording,
  tellWirecast
};
