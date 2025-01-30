import { tw } from "twind"
import { Tab, Tabs } from "../components/Tabs"

export const Signup = () => {
  return (
    <div class={tw`text-center`}>
      <h1 class={tw`text-white`}>Signup</h1>
      <Tabs defaultTab="Tab 1">
        <Tab label="Tab 1"><h1>Hiii 1</h1></Tab>
        <Tab label="Tab 2"><h1>Hiii 2</h1></Tab>
        <Tab label="Tab 3"><h1>Hiii 3</h1></Tab>
      </Tabs>
    </div>
  )
}