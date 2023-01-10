import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Starting with the key words "analyse" or "evaluate", give an example of a 6 mark GCSE Economics question, based on the following topic.
Topic: 
`;

const generateAction = async (req, res) => {
	console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${basePromptPrefix}${req.body.userInput}\n`,
		temperature: 0.95,
		max_tokens: 300,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();
	
	const secondPrompt = `
	Print the following question: ${basePromptOutput.text}. Then on a new line, generate an example exam response to the following GCSE Economics question, using the keywords "because", "leads to" and "therefore". The answer must be written with key economics vocabulary and with high detail, but must not be too long.
 	Question -> ${basePromptOutput.text}
	Answer -> 
 	`;

	const secondPromptCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${secondPrompt}`,
		temperature: 0.8,
		max_tokens: 1000,
	});

	const secondPromptOutput = secondPromptCompletion.data.choices.pop();
	res.status(200).json({ output: `${basePromptOutput}\n${secondPromptOutput}` });
};

export default generateAction;
