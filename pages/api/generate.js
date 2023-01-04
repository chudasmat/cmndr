import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Generate an answer for the following in a succint manner.

`


const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.75,
    max_tokens: 700
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;