import OpenAI from "openai"

const apiKey = import.meta.env.VITE_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export const createAssistant = async () => {
    const assistant = await openai.beta.assistants.create({
      name: "Pdf chat bot",
      instructions:
        "You analyze the pdf document that is uploaded and are able to answer all the questions about the document.",
      model: "gpt-4-turbo",
      tools: [{ type: "file_search" }],
    });
    console.log("Assistant created: ", assistant.name, "id: ", assistant.id)
    return assistant;
  };

  export const deleteAssistant = async(assistantId: string) => {
    try {
        const response = await openai.beta.assistants.del(assistantId);
    console.log("Assistant deleted: ", response)
    } catch(error) {
        console.error("Failed trying to delete assistant", error)
    }
}

export const learnAssistant = async (
    assistant: OpenAI.Beta.Assistants.Assistant,
    file: OpenAI.Files.FileObject
  ) => {
    try{
        let vector = await openai.beta.vectorStores.create({
            name: "user file",
          });
        
          await openai.beta.vectorStores.files.create(vector.id, {
              file_id: file.id
          })
          const updatedAssistant = await openai.beta.assistants.update(assistant.id, {
            tool_resources: { file_search: { vector_store_ids: [vector.id] } },
          });
          return updatedAssistant;
    } catch(error) {
        console.error(`Error updating assistant: ${assistant.id}`, error)
    }
  };