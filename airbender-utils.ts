import { setupAirbender, wrapOpenAI } from '@airbend3r/client';
import OpenAI from 'openai';


const model = wrapOpenAI(new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) as any, {
  productKey: process.env.AIRBENDER_PRODUCT_KEY || '',
  logInputs: true,
  logOutputs: true,
  shouldValidateBeforeLogging: true,
});

export const airbender = setupAirbender({
  sdks: {
    default: {
      llm: model,
      name: 'openAi',
      version: 'gpt-4o',
    },
  },
  modelAvailability: {
    providers: {
      openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
      google: [],
      anthropic: [],
    }
  },
});
export const { llm: airbenderOpenAI } = airbender.sdk('default');
