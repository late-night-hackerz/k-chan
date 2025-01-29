import type { Component } from 'solid-js';

import { tw } from 'twind';
import { Login } from './Login';

const App: Component = () => {
  return (
    <div class={tw`text-center`}>
      <Login />
    </div>
  );
};

export default App;
