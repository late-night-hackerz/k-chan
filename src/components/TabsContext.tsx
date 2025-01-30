import { createContext, useContext } from 'solid-js';

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextType>();