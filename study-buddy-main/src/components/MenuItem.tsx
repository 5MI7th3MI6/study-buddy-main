import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
    icon: LucideIcon;
    label: string;
    isExpanded: boolean;
    href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, isExpanded, href }) => (
    <Link href={href} className='hover:bg-muted' >
        <div className='relative flex items-center box-border p-2 hover:text-primary'>
            <Icon size={32} />
            <span className={`ml-1 text-lg absolute left-12 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                {label}
            </span>
        </div>
    </Link>
);

export default MenuItem;
