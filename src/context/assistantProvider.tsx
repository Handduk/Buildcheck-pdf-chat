import { createContext, useContext, useState } from "react";
import { deleteAssistant } from "../services/assistant";

interface AssistantContextType {
  id: string | null;
  setAssistantId: (id: string | null) => string | null;
  removeAssistant: (id: string) => void;
}

interface AssistantProviderProps {
  children: React.ReactNode;
}

const AssistantContext = createContext({} as AssistantContextType);

export const useAssistant = (): AssistantContextType =>
  useContext(AssistantContext);

export const AssistantProvider: React.FC<AssistantProviderProps> = ({
  children,
}) => {
  const [id, setId] = useState<string | null>(null);

  const setAssistantId = (id: string | null) => {
    setId(id);
    return id;
  };

  const removeAssistant = async (id: string) => {
    if (id) {
      await deleteAssistant(id);
      setAssistantId(null);
    }
    return id;
  };
  return (
    <AssistantContext.Provider value={{ id, setAssistantId, removeAssistant }}>
      {children}
    </AssistantContext.Provider>
  );
};
