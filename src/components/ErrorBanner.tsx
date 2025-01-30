import { tw } from "twind";
import { onMount, onCleanup } from "solid-js";

export const ErrorPopup = (props: { message: string; onClose: () => void }) => {
  let timeoutId: number;

  // Set up auto-dismiss timer when component mounts
  onMount(() => {
    timeoutId = setTimeout(props.onClose, 2000);
  });

  // Clean up timer when component unmounts
  onCleanup(() => {
    clearTimeout(timeoutId);
  });

  return (
    <div
      role="alert"
      class={tw`fixed bottom-4 right-4 flex items-center justify-between p-4 
                bg-red-500 text-white rounded-lg shadow-lg
                transition-opacity duration-300`}
    >
      <span class={tw`pr-4 font-medium`}>{props.message}</span>
      <button
        class={tw`p-1 hover:bg-red-600 rounded-full transition-colors
                   focus:(outline-none ring-2 ring-red-300)`}
        on:click={() => {
          // Clear timeout when manually closed
          clearTimeout(timeoutId);
          props.onClose();
        }}
      >
        <svg
          class={tw`w-6 h-6`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};