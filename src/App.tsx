import { RouteSectionProps } from '@solidjs/router';
import { Header } from './components/Header';
import { tw } from 'twind';

const App = (props: RouteSectionProps) => {

  return (
    <div class={tw`h-screen bg-gray-900`}>
      <Header title="Nostra-Chan!" url='/' />
      {props.children}
    </div>
  );
};

export default App;
