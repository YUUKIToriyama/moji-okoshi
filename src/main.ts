import speech from '@google-cloud/speech';
import fs from 'fs/promises';

export const flacToText = async (fileName: string) => {
	const audioFile = await fs.readFile(fileName);
	const client = new speech.v1p1beta1.SpeechClient({
		keyFile: './key.json' // 「IAMと管理」「サービスアカウント」「キー」
	});
	const [operation] = await client.longRunningRecognize({
		audio: {
			content: audioFile.toString('base64')
		},
		config: {
			languageCode: 'ja-JP',
			encoding: 'FLAC',
			audioChannelCount: 1,
			useEnhanced: true,
			model: 'phone_call',
			enableAutomaticPunctuation: true,
			metadata: {
				microphoneDistance: "MIDFIELD",
				audioTopic: "演劇についてのインタビュー"
			},
			enableWordConfidence: true,
			enableSpeakerDiarization: true,
			diarizationSpeakerCount: 2,
		}
	});
	const [response] = await operation.promise();
	return response.results.map(result => {
		const alternatives = result.alternatives.sort((a, b) => {
			return (a.confidence < b.confidence) ? 1 : -1;
		});
		return alternatives[0].transcript
	});
}