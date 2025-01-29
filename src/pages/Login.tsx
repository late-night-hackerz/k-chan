import { Component, createSignal } from "solid-js";
import { tw } from "twind";
import { login } from "../lib/auth";
import { useNavigate } from "@solidjs/router";
import { Header } from "../components/Header";
import { InputBar } from "../components/InputBar";
import { Button } from "../components/Button";
// import { goto } from "./lib/router";

export const Login: Component = () => {
  const [nsec, setNsec] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  const validNsec = ({ value }: { value: string }) => {
    return value.startsWith("nsec1");
  };

  const submit = () => {
    login(nsec(), password());
    navigate("/");
  };

  return (
    <div class={tw`min-h-screen text-gray-100 p-8`}>
      

      {/* Main Content */}
      <main class={tw`max-w-xs mx-auto`}>
        {/* Input Section */}
        <div class={tw`space-y-4 mb-8`}>
          {/* Time Input */}
          <InputBar value={password} setValue={setPassword} placeholder="Password" />
          <InputBar value={nsec} setValue={setNsec} placeholder="NSEC Key" />
          

          {/* QR Scanner Section */}
          <div class={tw`flex items-center space-x-4`}>
            <div class={tw`flex-1 h-px bg-gray-700`}></div>
            <span class={tw`text-gray-500 text-sm`}>or</span>
            <div class={tw`flex-1 h-px bg-gray-700`}></div>
          </div>

          <button
            class={tw`w-full py-2 flex items-center justify-center space-x-2
                         bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors
                         focus:(outline-none ring-2 ring-purple-500)
                         border(1 gray-700)`}
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
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            <span>Scan QR Code</span>
          </button>
        </div>

        <Button text="Login" action={submit} />
      </main>
    </div>
  );
};
