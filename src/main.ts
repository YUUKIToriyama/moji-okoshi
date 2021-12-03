import speech from '@google-cloud/speech';
import fs from 'fs/promises';

const flacToText = async (fileName: string) => {
	const audioFile = await fs.readFile(fileName);
	const client = new speech.SpeechClient({
		keyFile: './key.json' // 「IAMと管理」「サービスアカウント」「キー」
	});
	const [response] = await client.recognize({
		audio: {
			content: audioFile.toString('base64')
		},
		config: {
			languageCode: 'ja-JP',
			encoding: 'FLAC',
			audioChannelCount: 2,
			useEnhanced: true,
			model: 'phone_call',
			enableAutomaticPunctuation: true
		}
	});
	return response.results.map(result => result.alternatives[0].transcript);
}

flacToText("./data/sample.flac").then(result => {
	console.log(result);
});