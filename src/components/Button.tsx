import { tw } from "twind";

export const Button = (props: {text: string, action: () => void}) => {
  return (
    <button
          class={tw`w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg 
                       focus:(outline-none ring-2 ring-purple-500)
                       font-medium transition-colors`}
          on:click={props.action}>
        {props.text}
    </button>
  );
};
