import { Accessor, Component, Setter } from "solid-js";
import { tw } from "twind";

export const InputBar = (props: {
  value: Accessor<string>;
  setValue: Setter<string>;
  placeholder: string;
  class?: string
}) => {
  const pasteKey = () => {
    navigator.clipboard.readText().then((text) => {
        console.log("Pasting", text);
        props.setValue(text);   
    });
  };

  return (
    <div class={tw`relative ${props.class || ""}`}>
      <input
        type="text"
        value={props.value()}
        onInput={(e) => props.setValue(e.currentTarget.value)}
        placeholder={props.placeholder}
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
  );
};
