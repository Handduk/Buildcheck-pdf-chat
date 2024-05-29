import OpenAI from "openai";
import { Message } from "../models/message";

const apiKey = import.meta.env.VITE_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const createThread = async () => {
    const thread = await openai.beta.threads.create();
  
    return thread;
  };
  
  export const sendMessageInThread = async (
    threadId: string,
    assistantId: string,
    message: Message
  ) => {
    try {
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message.content,
      });
      const run = await openai.beta.threads.runs.createAndPoll(threadId, {
        assistant_id: assistantId,
      });
      return run;
    } catch (error) {
      console.error("failed trying to post message", error);
    }
  };