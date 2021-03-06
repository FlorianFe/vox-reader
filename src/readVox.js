
const read4ByteString = require('./shared/read4ByteString/read4ByteString');
const read4ByteInteger = require('./shared/read4ByteInteger/read4ByteInteger');
const groupArray = require('./shared/groupArray/groupArray');

const readRiffFile = require('./readRiffFile/readRiffFile');
const parseVoxChunk = require('./parseVoxChunk/parseVoxChunk');
const removeRiffStructure = require('./removeRiffStructure/removeRiffStructure');


const readVox = (buffer) =>
{
  const BLOCK_SIZE = 4;
  const OFFSET = 8; // VOX <space> 150 0 0 0

  const data = [...buffer]; // convert buffer to array
  const tokens = groupArray(data, BLOCK_SIZE);

  const id = read4ByteString(tokens[0]);
  const version = read4ByteInteger(tokens[1]);

  if(id != 'VOX ') throw Error(`Id of .vox-file should be "VOX ", found "${id}".`);
  if(version != 150) throw Error(`Version of .vox-file structure should be 150, found "${version}".`);

  const riffData = readRiffFile(data, OFFSET, parseVoxChunk);
  const result = removeRiffStructure(riffData);

  return result;
}

module.exports = readVox;
