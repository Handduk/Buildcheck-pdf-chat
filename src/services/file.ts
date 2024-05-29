import OpenAI from "openai";

const apiKey = import.meta.env.VITE_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const createFile = async (userFile: File) => {
    const newFile = await openai.files.create({
      file: userFile,
      purpose: "assistants",
    });
    return newFile;
  };