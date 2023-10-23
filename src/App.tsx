import './App.css';
import { ConfigProvider } from 'antd';
import { theme } from 'antd';
import customTheme from './antd.theme.json';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './features/auth/providers/auth-context';
import Router from './routes';
import locale from 'antd/locale/pt_BR';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 5 * 1000, // cache de 5 minutos para queries
        },
    },
});

function App() {
    const [darkMode, setDarkMode] = useState(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQueryList.onchange = (e: MediaQueryListEvent) => {
            setDarkMode(e.matches);
        };
        return () => {
            mediaQueryList.onchange = () => {
                /* */
            };
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                theme={{
                    algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    ...customTheme,
                }}
                locale={locale}
            >
                <AuthContextProvider>
                    <Router />
                </AuthContextProvider>
            </ConfigProvider>
        </QueryClientProvider>
    );
}

export default App;
