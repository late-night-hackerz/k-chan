import { Component, createSignal } from "solid-js";
import { tw } from "twind";
import { login } from "./lib/auth";
import { useNavigate } from "@solidjs/router";
// import { goto } from "./lib/router";

export const Login: Component = () => {
  const [nsec, setNsec] = createSignal("");
  const navigate = useNavigate()

  const validNsec = ({value}: {value: string}) => {
    return value.startsWith("nsec1"); 
  };

  const pasteKey = () => {
    navigator.clipboard.readText().then((text) => {
      if (validNsec({value: text})) {
        console.log("nsec key pased: ", text);
        setNsec(text);
      }
    });
  };

  const submit = () => {
    login(nsec())
    navigate("/")
  }

  return (
    <div class={tw`min-h-screen bg-gray-900 text-gray-100 p-8`}>
    {/* Header */}
    <header class={tw`mb-12 text-center`}>
      <h1 class={tw`text-2xl font-bold`}>k-Chan</h1>
    </header>

    {/* Main Content */}
    <main class={tw`max-w-xs mx-auto`}>
      {/* Input Section */}
      <div class={tw`space-y-4 mb-8`}>
        {/* Time Input */}
        <div class={tw`relative`}>
          <input
            type="text"
            value={nsec()}
            onInput={(e) => setNsec(e.currentTarget.value)}
            placeholder="Enter Security Key"
            class={tw`w-full px-4 py-2 bg-gray-800 rounded-lg border(1 gray-700) 
                focus:(outline-none ring-2 ring-purple-500) placeholder-gray-500 
                pr-12`}
          />
          <button 
            onclick={() => pasteKey()}
            class={tw`absolute right-2 top-1/2 transform -translate-y-1/2 
                p-2 hover:bg-gray-700 rounded-lg transition-colors
                focus:(outline-none ring-0 ring-purple-500)
                active:(bg-gray-800 animate-pulse)
                `}
          >
            <svg 
              class={tw`w-5 h-5`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>
        </div>

        {/* QR Scanner Section */}
        <div class={tw`flex items-center space-x-4`}>
          <div class={tw`flex-1 h-px bg-gray-700`}></div>
          <span class={tw`text-gray-500 text-sm`}>or</span>
          <div class={tw`flex-1 h-px bg-gray-700`}></div>
        </div>

        <button class={tw`w-full py-2 flex items-center justify-center space-x-2
                         bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors
                         focus:(outline-none ring-2 ring-purple-500)
                         border(1 gray-700)`}>
          <svg 
            class={tw`w-5 h-5`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <span>Scan QR Code</span>
        </button>
      </div>

      {/* Login Button */}
      <button class={tw`w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg 
                       focus:(outline-none ring-2 ring-purple-500)
                       font-medium transition-colors`} on:click={submit}>
        Login
      </button>
    </main>
  </div>
  );
};
