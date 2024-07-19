'use client'
import React from 'react';
import { SWRConfig } from 'swr';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SWRConfig
            value={{
                fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
                onError: (err) => {
                    console.error('SWR Error:', err);
                },
            }}
        >
            {children}
        </SWRConfig>
    );
};

export default Layout;
