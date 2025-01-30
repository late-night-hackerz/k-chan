// Tabs.tsx
import { Component, createSignal, For, JSX, children as childrenHelper } from 'solid-js';
import { createStore } from 'solid-js/store';
import { tw } from 'twind';

type TabProps = {
  label: string;
  children: JSX.Element;
};

type TabsProps = {
  defaultTab?: string;
  children: JSX.Element;
};

export const Tab: Component<TabProps> = (props) => {
  return <>{props.children}</>;
};

export const Tabs: Component<TabsProps> = (props) => {
  const children = childrenHelper(() => props.children);
  const tabs = children.toArray() as Array<{ props: TabProps }>;
  
  const [state, setState] = createStore({
    activeTab: props.defaultTab || tabs[0]?.props.label
  });

  const setActiveTab = (tab: string) => {
    setState({ activeTab: tab });
  };

  return (
    <div class={tw`w-full`}>
      {/* Floating top bar */}
      <div class={tw`fixed top-0 left-0 right-0 bg-white shadow-md z-50`}>
        <div class={tw`max-w-7xl mx-auto px-4`}>
          <div class={tw`flex space-x-4 border-b`}>
            <For each={tabs}>
              {(tab) => (
                <button
                  class={tw`py-4 px-6 font-medium text-sm transition-colors duration-200 
                    ${state.activeTab === tab.props.label 
                      ? tw`text-blue-600 border-b-2 border-blue-600` 
                      : tw`text-gray-500 hover:text-gray-700`}`}
                  onClick={() => setActiveTab(tab.props.label)}
                >
                  {tab.props.label}
                </button>
              )}
            </For>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div class={tw`mt-16 p-4`}>
        <For each={tabs}>
          {(tab) => (
            <div 
              class={tw`transition-opacity duration-200 
                ${state.activeTab === tab.props.label 
                  ? tw`opacity-100` 
                  : tw`opacity-0 hidden`}`}
            >
              {tab.props.children}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};