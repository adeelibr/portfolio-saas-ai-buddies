"use client";

// import { messageRef } from "@/lib/converters/Message";
// import { addDoc, serverTimestamp } from "firebase/firestore";
// import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
}

function ChatInput({ input, handleInputChange, onSubmit, isLoading }: ChatInputProps) {
  // const { data: session } = useSession();

  // const onAddChatMessage = async (event: any) => {
  //   event.preventDefault();
  //   const doc = await addDoc(messageRef(session?.user.id!, companionId), {
  //     content: "this is test",
  //     createdAt: serverTimestamp(),
  //     role: "user",
  //     updatedAt: serverTimestamp(),
  //   });
  // };

  return (
    <form className="" onSubmit={onSubmit}>
      <label htmlFor="chat-input" className="sr-only">
        Search chats
      </label>
      <div className="relative flex flex-col flex-1 mx-3">
        <input
          id="search-chats"
          type="text"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200"
          placeholder="Search chats"
          required
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute bottom-2 right-1 rounded-lg p-2 text-sm text-slate-500 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base"
          disabled={isLoading }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            aria-hidden="true"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 9h8"></path>
            <path d="M8 13h5"></path>
            <path d="M11.008 19.195l-3.008 1.805v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M20.2 20.2l1.8 1.8"></path>
          </svg>
          <span className="sr-only">Search chats</span>
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
