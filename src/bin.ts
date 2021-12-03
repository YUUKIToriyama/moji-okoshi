import { flacToText } from './main';
import fs from 'fs/promises';

const i = process.argv[2];
flacToText(`./data/${i}.flac`).then(result => {
	fs.writeFile(`./data/${i}.txt`, result.join("\n").trim());
});