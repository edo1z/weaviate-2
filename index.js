import weaviate, { vectorizer, generative } from 'weaviate-client';
import dotenv from 'dotenv';

dotenv.config();

const wcdUrl = process.env.WEAVIATE_URL;
const wcdApiKey = process.env.WEAVIATE_API_KEY;

const client = await weaviate.connectToWeaviateCloud(
  wcdUrl,
  {
    authCredentials: new weaviate.ApiKey(wcdApiKey),
  }
);

await client.collections.create({
  name: 'Question',
  vectorizers: vectorizer.text2VecOpenAI(),
  generative: generative.openAI(),
});

client.close();
