import { JSX } from "solid-js";
import { tw } from "twind";

export const Button = (props: {action: () => void, class: string, children: JSX.Element}) => {
  return (
    <button
          class={tw`w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg 
                       focus:(outline-none ring-2 ring-purple-500)
                       font-medium transition-colors ${props.class}`}
          on:click={props.action}>
        {props.children}
    </button>
  );
};
