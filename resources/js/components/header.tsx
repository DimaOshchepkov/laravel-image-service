// components/Header.tsx
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from '@inertiajs/react';
import ThemeSwitcher from '@/components/theme-switcher';

export default function Header() {
  return (
    <NavigationMenu.Root className="flex justify-between items-center px-6 py-4 border-b border-border">
      <NavigationMenu.List className="flex items-center gap-4">
        <NavigationMenu.Item
          className="px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground">
          <Link
            href={route('login')}
          >
            Log in
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item
          className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">
          <Link
            href={route('register')}
          >
            Register
          </Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item><ThemeSwitcher /></NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
