import '@radix-ui/themes/styles.css';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { Theme } from '@radix-ui/themes';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { AppToaster } from './components/app-toaster';




const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
          <React.StrictMode>
            <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                <Theme
                    appearance="inherit"
                    accentColor="blue" // или другой цвет
                    grayColor="slate" // стилизация серого
                    radius="large" // скругления
                    scaling="100%" // масштаб интерфейса
                >
                    <App {...props} />

                </Theme>
                <AppToaster/>
            </NextThemesProvider>
          </React.StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
//initializeTheme();
