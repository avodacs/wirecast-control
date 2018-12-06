const go = () => {
  return 'go doc';
};

const setActiveShot = (layer, shot) => {
  return `set active shot of the layer named "${layer}" of doc to the shot named "${shot}" of the layer named "${layer}" of doc`;
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

module.exports = {
  go,
  setActiveShot,
  startBroadcasting,
  stopBroadcasting,
  startRecording,
  stopRecording
};
