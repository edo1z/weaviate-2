import weaviate from 'weaviate-client';
import dotenv from 'dotenv';

dotenv.config();

const wcdUrl = process.env.WEAVIATE_URL;
const wcdApiKey = process.env.WEAVIATE_API_KEY;
const openAIKey = process.env.OPENAI_API_KEY;

const client = await weaviate.connectToWeaviateCloud(
  wcdUrl,
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey),
    headers: {
      'X-OpenAI-Api-Key': openAIKey,
    },
  }
);

const questions = client.collections.get('Question');

const result = await questions.generate.nearText(
  'biology',
  {
    groupedTask: 'Write a tweet with emojis about these facts.',
  },
  {
    limit: 2,
  }
);

console.log(result.generated);

client.close();
