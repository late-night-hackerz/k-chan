import { tw } from "twind"
import { InputBar } from "../components/InputBar"
import { createSignal } from "solid-js"
import { Button } from "../components/Button"

export const Signup = () => {
  const [username, setUsername] = createSignal("")
  const [displayName, setDisplayName] = createSignal("")
  return (
    <div class={tw`flex flex-col items-center p-6 rounded-2xl shadow-lg max-w-md mx-auto`}>
      <h1 class={tw`text-2xl font-bold text-white mb-4`}>Enter Basic Details:</h1>
      <h2 class={tw`text-lg font-semibold text-gray-700 mb-2`}>Enter a Username:</h2>
      <InputBar value={username} setValue={setUsername} placeholder="username" class={tw`w-full mb-4 p-2 border rounded-md`}/>
      <h2 class={tw`text-lg font-semibold text-gray-700 mb-2`}>Enter a Display name:</h2>
      <InputBar value={displayName} setValue={setDisplayName} placeholder="Display Name" class="w-full mb-4 p-2 border rounded-md"/>
      <Button action={() => {
        console.log("Hello")
      }} class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Next</Button>
    </div>
  )
}