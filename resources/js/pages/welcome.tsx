import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
//import ThemeSwitcher from '@/pages/theme-switcher';
import Header from '@/components/header';
import { motion } from 'framer-motion';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[360px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Header />
                        )}
                    </nav>
                </header>
                <div className="flex h-full w-full items-center justify-center lg:grow">
                    <main className="bg-background text-foreground flex h-full w-full items-center justify-center">
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="max-w-md space-y-4 px-4 text-center"
                        >
                            <header>
                                <h1 className="text-4xl font-bold">Welcome</h1>
                            </header>
                            <p className="text-muted-foreground text-lg">This app helps you store and share images.</p>
                            <p className="text-muted-foreground text-lg">
                                Please{' '}
                                <Link href={route('register')} className="text-primary font-medium underline hover:opacity-80">
                                    register
                                </Link>{' '}
                                or{' '}
                                <Link href={route('login')} className="text-primary font-medium underline hover:opacity-80">
                                    log in
                                </Link>{' '}
                                to continue.
                            </p>
                        </motion.section>
                    </main>
                </div>
            </div>
        </>
    );
}
