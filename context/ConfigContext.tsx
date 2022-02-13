import React, { createContext } from 'react';

export interface ConfigContextType {
    config: ConfigType;
}

export const ConfigContext = createContext<ConfigContextType | null>(null);

interface ConfigProviderProps {
    children: React.ReactNode;
    configData: ConfigType;
}
const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, configData }) => {
    const contextValue: ConfigContextType = {
        config: configData,
    };

    return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
