import { useEffect, useRef, useState } from "react";

export function AiThing() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isEnabled = !!apiKey;

  const [isOpen, setIsOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiResponses, setAiResponses] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 5000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isEnabled) return;
    setInterval(() => {
      setIsOpen(() => true);
    }, 5000);
  }, [isEnabled]);

  useEffect(() => {
    if (isAiOpen) {
      setIsOpen(false);
    }

    if (!isAiOpen) {
      setAiResponses([]);
    }
  }, [isAiOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiResponses]);

  const handleAiReponse = async (question: string) => {
    if (!apiKey) {
      setError("AI service is not configured");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text: "You are answering questions about drones. if they ask about smt that isnt drones, answer with an insult. U are jeremy clarkson",
                },
              ],
            },
            contents: [
              ...aiResponses.map((r) => {
                return {
                  role: r.sender === "user" ? "user" : "model",
                  parts: [{ text: r.text }],
                };
              }),
              {
                role: "user",
                parts: [{ text: question }],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error.message || "Failed to get response");
        return;
      }

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setError("Received invalid response from AI");
        return;
      }

      setAiResponses((prev) => [
        ...prev,
        { text: data.candidates[0].content.parts[0].text, sender: "ai" },
      ]);
    } catch (err) {
      setError("Failed to connect to AI service. Please try again.");
      console.error("AI Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-10 left-10 z-50">
      {isOpen && (
        <div className="absolute bottom-28 left-0 mb-2 px-4 py-2 bg-white rounded-lg shadow-lg border-2 border-gray-200 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm font-medium text-gray-800">
            Hey! Have a question about drones?
          </p>
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-200 transform rotate-45"></div>
        </div>
      )}
      {isAiOpen && (
        <div className="absolute bottom-28 left-0 w-80 bg-white rounded-lg shadow-xl border-2 border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col max-h-96">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              Drone Assistant
            </h3>
            <button
              onClick={() => setIsAiOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[12.5rem] max-h-[15.625rem]">
            {aiResponses.length === 0 && !isLoading ? (
              <div className="text-sm text-gray-500 text-center py-8">
                <p>Hey! I'm here to help you with your drone questions!</p>
              </div>
            ) : (
              <>
                {aiResponses.map((response, index) => (
                  <div
                    key={index}
                    className={`flex animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                      response.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                        response.sender === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {response.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="max-w-[80%] px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-800 rounded-bl-none">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center animate-in fade-in duration-300">
                    <div className="px-3 py-2 rounded-lg text-xs bg-red-50 text-red-600 border border-red-200">
                      {error}
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem(
                "message"
              ) as HTMLInputElement;
              if (input.value.trim() && !isLoading) {
                const message = input.value;
                setAiResponses((prev) => [
                  ...prev,
                  { text: message, sender: "user" },
                ]);
                handleAiReponse(message);
                input.value = "";
                setError(null);
              }
            }}
            className="p-3 border-t border-gray-200"
          >
            <div className="flex gap-2">
              <input
                type="text"
                name="message"
                autoComplete="off"
                placeholder={
                  isLoading ? "Waiting for response..." : "Ask a question..."
                }
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-200 transform rotate-45"></div>
        </div>
      )}
      <img
        src="https://pbs.twimg.com/profile_images/1903539737/image_200x200.jpg"
        alt=""
        className="w-24 h-24 cursor-pointer hover:opacity-75 border-2 rounded-full transition-opacity"
        onClick={() => setIsAiOpen((prev) => !prev)}
      />
    </div>
  );
}
