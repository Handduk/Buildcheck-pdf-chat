import OpenAI from "openai";

const apiKey = import.meta.env.VITE_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});


export const fetchMessages = async (threadId: string) => {
  const messageList = await openai.beta.threads.messages.list(threadId);

  return messageList.data;
};
