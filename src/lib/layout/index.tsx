import type { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/components/theme-provider';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container flex min-h-screen flex-col">
        <Header />
        <main className=" bg-blue-100">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
