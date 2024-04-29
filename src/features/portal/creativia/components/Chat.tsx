import { GameState } from "features/game/types/game";
import { SceneId } from "features/world/mmoMachine";
import React, { useState, useEffect, useRef } from "react";

export type Message = {
  id: number;
  username: string;
  faction?: string;
  sessionId: string;
  text: string;
  sceneId: SceneId;
  sentAt: number;
};

interface Props {
  id: number;
  gameState: GameState;
  scene: SceneId;
  messages: Message[];
  onMessage: (text: string) => void;
}

export const Chat: React.FC<Props> = ({
  gameState,
  scene,
  messages,
  onMessage,
}) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    inputVisibleRef.current = inputVisible;
  }, [inputVisible]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: WindowEventMap["keydown"]) => {
      if (!inputVisibleRef.current && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setInputVisible(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }

      if (e.key.toLowerCase() === "escape") {
        setInputVisible(false);
        setInputText("");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() !== "") {
      onMessage(inputText.trim());
      setInputText("");
    }
    setInputVisible(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    } else if (e.key === "Escape") {
      setInputVisible(false);
      setInputText("");
    }
  };

  return (
    <div
      className="text-white p-2 max-h-96 overflow-y-auto justify-end flex flex-col absolute bottom-14 left-0"
      style={{ width: "40%", height: "35%" }}
    >
      <div ref={messagesEndRef} />
      {messages
        .filter((message) => message.sceneId === scene)
        .sort((a, b) => a.sentAt - b.sentAt)
        .map((msg, index) => (
          <div key={index} className="mb-1">
            <span className="text-xs font-bold mr-2">
              {msg.faction
                ? `[${msg.faction}] ${msg.username ?? msg.id}`
                : msg.username ?? msg.id}
            </span>
            <span className="text-xxs">{msg.text}</span>
          </div>
        ))}
      {inputVisible && (
        <div className="flex mt-2">
          <input
            ref={inputRef}
            // bottom only border
            className="flex-1 p-2 bg-transparent text-xs placeholder:text-xxs focus:outline-none border-b border-white"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message and press Enter"
          />
        </div>
      )}
    </div>
  );
};
