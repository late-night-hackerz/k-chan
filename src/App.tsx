import type { Component } from 'solid-js';

import { Login } from './pages/Login';
// import { goto, Route } from './lib/router';
import { init } from './lib/auth';
import { RouteSectionProps } from '@solidjs/router';

const App = (props: RouteSectionProps) => {

  return (
    <>
      <h1>Nostr Chan</h1>
      {props.children}
    </>
  );
};

export default App;
