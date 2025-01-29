import type { Component } from 'solid-js';

import { tw } from 'twind';

const App: Component = () => {
  return (
    <div class={tw`text-center`}>
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
