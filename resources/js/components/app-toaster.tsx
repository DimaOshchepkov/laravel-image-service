import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function AppToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position='bottom-right'
      key={theme}
      toastOptions={{
        style: {
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-foreground)',
          border: '1px solid var(--color-border)',
        },
      }}
    />
  );
}
