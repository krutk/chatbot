import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration ({
    apiKey: process.env.CHATBOT_SK
});

const openai = new OpenAIApi(configuration);

export default openai;