'use client';

import Link from 'next/link';
import HamburgerButton from '@/layouts/hamburger-button';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Logo from '@core/components/logo';
import HeaderMenuRight from '@/layouts/header-menu-right';
import StickyHeader from '@/layouts/sticky-header';
import SearchWidget from '@/app/shared/search/search';
import { Switch } from 'rizzui/switch';
import { useLayout } from '../use-layout';

export default function Header() {
  const { layout, setLayout } = useLayout();
  return (
    <StickyHeader className="z-[990] border-b-2 2xl:py-5 3xl:px-8 4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 xs:hidden lg:me-5"
        >
          <Logo iconOnly={true} />
        </Link>
        <div>
          <h6>Super Admin</h6>
          <p className="font-normal">PNP & Event Management</p>
        </div>
        <Switch
          checked={layout === 'beryllium'}
          // label={layout === 'beryllium' ? 'Expand' : 'Collapse'}
          onChange={(e) => {
            const checked = e.target.checked;
            console.log('checked', checked);
            setLayout(checked ? 'beryllium' : 'hydrogen');
          }}
          className="ml-4"
        />

        {/* <SearchWidget /> */}
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
