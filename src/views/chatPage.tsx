import { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import { Message } from "../models/message";
import OpenAI from "openai";
import {
  createAssistant,
  deleteAssistant,
  learnAssistant,
} from "../services/assistant";
import { CgSpinnerAlt } from "react-icons/cg";
import { createThread, sendMessageInThread } from "../services/thread";
import { createFile } from "../services/file";
import { fetchMessages } from "../services/message";
import { LoadingDots } from "../components/loadingDots";
import { PdfReader } from "../components/PdfReader";
import { useAssistant } from "../context/assistantProvider";

export const ChatPage = () => {
  const { id, setAssistantId, removeAssistant } = useAssistant();
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [pdfLoaded, setPdfLoaded] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [assistant, setAssistant] =
    useState<OpenAI.Beta.Assistants.Assistant | null>(null);
  const [thread, setThread] = useState<OpenAI.Beta.Threads.Thread>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (assistant) {
        await deleteAssistant(assistant.id);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [assistant]);

  useEffect(() => {
    if (!id) {
      setAssistant(setAssistantId(null) as null);
      delAssist();
    }
  }, [id]);

  const delAssist = async () => {
    if (assistant && id) {
      removeAssistant(id);
    }
    setPdfLoaded(false);
    setIsLoading(true);
    setMessages([]);
  };

  const storeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
    assistantInit();
  };

  const assistantInit = async () => {
    if (assistant) {
      removeAssistant(assistant.id);
      setAssistant(null);
    }
    const data = await createAssistant();
    setAssistant(data);
    console.log(data);
  };

  const startChat = () => {
    if (fileUrl) {
      setPdfLoaded(true);
      learn();
    } else {
      alert("Please select a PDF file first.");
    }
  };

  const learn = async () => {
    if (assistant && file && fileUrl) {
      setIsLoading(true);
      const pdfFile = await createFile(file);
      if (pdfFile) {
        const updatedAssistant = await learnAssistant(assistant, pdfFile);
        const newThread = await createThread();
        setAssistant(updatedAssistant as OpenAI.Beta.Assistants.Assistant);
        setThread(newThread);
        setIsLoading(false);
        setAssistantId(assistant.id);
        console.log("assistant init");
      }
    }
  };

  const sendMessage = async () => {
    const newMessage: Message = { role: "user", content: input };
    const updatedMessages = [...(messages as Message[]), newMessage];
    setMessages(updatedMessages);
    setInput("");
    if (!thread || !assistant) return;
    setIsWriting(true);
    const result = await sendMessageInThread(
      thread.id,
      assistant.id,
      newMessage
    );
    getMessages(result?.id as string);
  };

  const cleanReferences = (text: string) => {
    return text.replace(/【\d+:\d+†source】/g, "");
  };

  const getMessages = async (runId: string) => {
    if (!runId || !thread) return;
    try {
      let data = await fetchMessages(thread.id);
      data = data.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const transformedMessages: Message[] = data.map((msg: any) => ({
        role: msg.role,
        content: cleanReferences(msg.content[0].text.value),
      }));

      setMessages(transformedMessages);
    } catch (error) {
      console.error("failed trying to get message", error);
    } finally {
      setIsWriting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-10 flex flex-row justify-between items-center bg-gray-50 dark:bg-zinc-800">
      <div className="border border-black rounded-lg w-4/12 h-full bg-white mr-1 flex flex-col items-center justify-center ">
        {pdfLoaded ? (
          <PdfReader file={fileUrl} />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full border border-black rounded-lg dark:bg-zinc-700 dark:text-zinc-300">
            <h1 className="text-3xl mb-auto mt-10">
              Select a file to chat with.
            </h1>
            <input
              className="w-10/12 mb-5 p-5 text-lg text-gray-900 border border-gray-300 rounded-lg
             cursor-pointer focus:outline-none hover:bg-gray-100 hover:shadow-md hover:shadow-gray-400 
             hover:border-gray-400 transition-all duration-150 
             dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:border-zinc-800 dark:hover:shadow-zinc-800"
              type="file"
              accept="application/pdf"
              onChange={storeFile}
            />
            <button
              className="pt-2 pb-2 pl-5 pr-5 mb-auto text-lg rounded-md
              bg-gradient-to-r from-violet-700 to-red-600 text-white font-semibold cursor-pointer
              hover:shadow-md hover:shadow-gray-400 hover:text-black transition-all duration-200
              dark:border dark:border-zinc-700 dark:hover:shadow-zinc-800 
              disabled:text-black disabled:hover:shadow-none disabled:bg-gradient-to-r disabled:from-zinc-700
               disabled:to-neutral-400 disabled:cursor-default"
              onClick={startChat}
              disabled={assistant ? false : true}
            >
              Start chatting
            </button>
          </div>
        )}
      </div>
      <div className="border border-black w-8/12 h-full ml-1 rounded-lg bg-white dark:bg-zinc-700">
        <div className="h-full flex flex-col">
          <div className="h-full overflow-auto p-4">
            {isLoading && pdfLoaded ? (
              <div className="h-full flex justify-center items-center">
                <CgSpinnerAlt className="animate-spin text-6xl dark:text-zinc-300" />
              </div>
            ) : (
              messages &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 p-2 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block p-2 px-4 rounded-md ${
                      message.role === "user"
                        ? "bg-blue-200 leading-relaxed max-w-4xl whitespace-pre-line dark:bg-lime-900 dark:text-white"
                        : "bg-gray-200 leading-relaxed max-w-4xl whitespace-pre-line dark:bg-zinc-800 dark:text-white"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              ))
            )}
            {isWriting && <LoadingDots />}
          </div>
          <div className="h-14 flex flex-row items-center">
            <input
              type="text"
              disabled={isLoading || isWriting}
              placeholder="Enter a question about the provided pdf file"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full py-1 px-2 mx-2 border border-gray-600 rounded text-l
              focus:outline-none focus:border-black disabled:bg-gray-400 
              dark:bg-zinc-800 dark:text-zinc-300 dark:border-black dark:focus:border-zinc-600 transition-colors duration-150"
            />
            {!isLoading && (
              <button
                className="px-2 pr-5 py-1 dark:hover:text-zinc-300 transition-all duration-150"
                onClick={sendMessage}
                disabled={isLoading}
              >
                <BiSend className="text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
