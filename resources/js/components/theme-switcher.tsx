import * as React from 'react';
import { Select, Flex } from '@radix-ui/themes';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


type ThemeOption = 'light' | 'dark' | 'system';

const ThemeSwitcher = () => {

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const data : Record<ThemeOption, { label: string; icon: React.JSX.Element }> = {
    light: { label: 'Light', icon: <SunIcon /> },
    dark: { label: 'Dark', icon: <MoonIcon /> },
    system: { label: 'System', icon: <DesktopIcon /> },
  };

  // fallback на 'system' если по какой-то причине theme не задана
  const current = (theme ?? 'system') as ThemeOption ;

  return (
    <Flex direction="column" maxWidth="160px">
      <Select.Root value={current} onValueChange={(val) => setTheme(val)}>
        <Select.Trigger>
          <Flex as="span" align="center" gap="2">
            {data[current].icon}
            {data[current].label}
          </Flex>
        </Select.Trigger>
        <Select.Content position="popper">
          {Object.entries(data).map(([value, { label, icon }]) => (
            <Select.Item key={value} value={value}>
              <Flex align="center" gap="2">
                {icon}
                {label}
              </Flex>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default ThemeSwitcher;
