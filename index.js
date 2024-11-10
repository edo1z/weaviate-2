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

const result = await questions.query.nearText('biology', {
  limit: 2,
});

result.objects.forEach((item) => {
  console.log(JSON.stringify(item.properties, null, 2));
});

client.close();
