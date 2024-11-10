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

// データ取得関数
async function getJsonData() {
  const file = await fetch(
    'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json'
  );
  return file.json();
}

// データインポート関数
async function importQuestions() {
  const questions = client.collections.get('Question');
  const data = await getJsonData();
  const result = await questions.data.insertMany(data);
  console.log('Insertion response: ', result);
}

await importQuestions();

client.close();
