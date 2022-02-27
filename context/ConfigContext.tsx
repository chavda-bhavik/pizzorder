import React, { createContext, useState } from 'react';

export interface ConfigContextType {
    config?: ConfigType;
    storeConfig: (config: ConfigType) => void;
}

export const ConfigContext = createContext<ConfigContextType | null>(null);

interface ConfigProviderProps {
    children: React.ReactNode;
}
const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
    const [config, setConfig] = useState<ConfigType>();

    const contextValue: ConfigContextType = {
        config,

        storeConfig: (config) => setConfig(config),
    };

    return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
