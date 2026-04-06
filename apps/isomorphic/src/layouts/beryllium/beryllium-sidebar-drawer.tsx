'use client';

import {
  berylliumSidebarMenuItems,
  SidebarItem,
} from '@/layouts/beryllium/beryllium-sidebar-menu-items';
import StatusBadge from '@core/components/get-status-badge';
import Logo from '@core/components/logo';
import cn from '@core/utils/class-names';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { Collapse, Title } from 'rizzui';

function filterByRole(items: SidebarItem[], role: string): SidebarItem[] {
  return items
    .filter((item) => !item.roles || item.roles.includes(role))
    .map((item) => ({
      ...item,
      dropdownItems: item.dropdownItems
        ? filterByRole(item.dropdownItems, role)
        : undefined,
    }))
    .filter((item) => {
      // keep if link OR has children
      return item.href || item.dropdownItems?.length;
    });
}

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log('session', session);
  if (!session?.user?.role) return null;

  const role = session.user.role;

  // const filteredMenu = berylliumSidebarMenuItems
  //   .filter((item) => {
  //     // if no roles defined → allow
  //     if (!item.roles) return true;

  //     return item.roles.includes(role);
  //   })
  //   .map((item) => ({
  //     ...item,
  //     dropdownItems: item.dropdownItems?.filter((sub) => {
  //       // if no roles defined → allow
  //       if (!sub.roles) return true;
  //       return sub.roles.includes(role);
  //     }),
  //   }));
  const filteredMenu = filterByRole(
    berylliumSidebarMenuItems as SidebarItem[],
    role
  );
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <div className="custom-scrollbar h-[calc(100%-80px)] overflow-y-auto scroll-smooth">
        <div className="mt-4 pb-3 3xl:mt-6">
          {filteredMenu.map((item, index) => {
            const isActive = pathname === (item?.href as string);
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              (dropdownItem) => dropdownItem.href === pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <Fragment key={item.name + '-' + index}>
                {item?.href ? (
                  <>
                    {item?.dropdownItems ? (
                      <Collapse
                        defaultOpen={isDropdownOpen}
                        header={({ open, toggle }) => (
                          <div
                            onClick={toggle}
                            className={cn(
                              'group relative mx-3 flex cursor-pointer items-center justify-between rounded-full px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                              isDropdownOpen
                                ? 'before:top-2/5 before:rounded-full-md text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-full before:bg-primary 2xl:before:-start-5'
                                : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                            )}
                          >
                            <span className="flex items-center">
                              {item?.icon && (
                                <span
                                  className={cn(
                                    'me-2 inline-flex h-5 w-5 items-center justify-center rounded-full [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                    isDropdownOpen
                                      ? 'text-primary'
                                      : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                  )}
                                >
                                  {item?.icon}
                                </span>
                              )}
                              {item.name}
                            </span>

                            <PiCaretDownBold
                              strokeWidth={3}
                              className={cn(
                                'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                                open && 'rotate-0 rtl:rotate-0'
                              )}
                            />
                          </div>
                        )}
                      >
                        <SidebarDropdown
                          items={item.dropdownItems}
                          pathname={pathname}
                          level={1}
                        />
                      </Collapse>
                    ) : (
                      <Link
                        href={item?.href}
                        className={cn(
                          'group relative mx-3 my-0.5 flex items-center justify-between rounded-full px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                          isActive
                            ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-full before:rounded-se-full before:bg-primary 2xl:before:-start-5'
                            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                        )}
                      >
                        <div className="flex items-center truncate">
                          {item?.icon && (
                            <span
                              className={cn(
                                'me-2 inline-flex h-5 w-5 items-center justify-center rounded-full [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                isActive
                                  ? 'text-primary'
                                  : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                              )}
                            >
                              {item?.icon}
                            </span>
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item?.badge?.length ? (
                          <StatusBadge status={item?.badge} />
                        ) : null}
                      </Link>
                    )}
                  </>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      'mb-2 truncate px-6 text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8',
                      index !== 0 && 'mt-6 3xl:mt-7'
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function SidebarDropdown({ items, pathname, level = 0 }: any) {
  console.log('SidebarDropdown', items, pathname);
  return items?.map((item: any, index: number) => {
    const isActive = pathname === item?.href;

    const hasChildren = item?.dropdownItems?.length;
    console.log('hasChildren', hasChildren, item?.dropdownItems);

    const childActive = item?.dropdownItems?.some(
      (child: any) =>
        child.href === pathname ||
        child?.dropdownItems?.some((c: any) => c.href === pathname)
    );

    if (hasChildren) {
      return (
        <Collapse
          key={item.name + index}
          defaultOpen={childActive}
          header={({ open, toggle }) => (
            <div
              onClick={toggle}
              className={cn(
                'flex cursor-pointer items-center justify-between rounded-full px-3 py-2',
                level === 0 ? 'mx-3.5' : 'mx-6',
                'text-gray-600 hover:bg-gray-100'
              )}
            >
              <span className="flex items-center gap-2">
                {level > 0 && (
                  <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                )}
                {item.name}
              </span>

              <PiCaretDownBold
                className={cn(
                  'h-3 w-3 -rotate-90 transition-transform',
                  open && 'rotate-0'
                )}
              />
            </div>
          )}
        >
          <SidebarDropdown
            items={item.dropdownItems}
            pathname={pathname}
            level={level + 1}
          />
        </Collapse>
      );
    }

    return (
      <Link
        key={item.name + index}
        href={item.href}
        className={cn(
          'flex items-center rounded-full px-3 py-2 text-sm',
          level === 0 ? 'mx-3.5' : 'mx-8',
          isActive ? 'text-primary' : 'text-gray-500 hover:bg-gray-100'
        )}
      >
        {item.name}
      </Link>
    );
  });
}

{
  /* {item?.dropdownItems?.map((dropdownItem, index) => {
                          console.log('dropdownItem', dropdownItem);
                          const isChildActive = pathname === dropdownItem?.href;
                          console.log('isChildActive', isChildActive);
                          const childPathExist =
                            dropdownItem?.dropdownItems?.some(
                              (child) => child.href === pathname
                            );
                          console.log('childPathExist', childPathExist);

                          const isChildDropdownOpen = Boolean(childPathExist);
                          console.log(
                            'isChildDropdownOpen',
                            isChildDropdownOpen
                          );
                          // if child has dropdown
                          if (dropdownItem?.dropdownItems) {
                            return (
                              <Collapse
                                key={dropdownItem?.name + index}
                                defaultOpen={isChildDropdownOpen}
                                header={({ open, toggle }) => (
                                  <div
                                    onClick={toggle}
                                    className="mx-3.5 flex cursor-pointer items-center justify-between rounded-full px-3.5 py-2 text-gray-500 hover:bg-gray-100"
                                  >
                                    <span className="flex items-center">
                                      <span className="me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current opacity-40" />
                                      {dropdownItem.name}
                                    </span>

                                    <PiCaretDownBold
                                      className={cn(
                                        'h-3 w-3 -rotate-90 transition-transform',
                                        open && 'rotate-0'
                                      )}
                                    />
                                  </div>
                                )}
                              >
                                {dropdownItem.dropdownItems.map((child, i) => {
                                  const isNestedActive =
                                    pathname === child.href;

                                  return (
                                    <Link
                                      key={child.name + i}
                                      href={child.href}
                                      className={cn(
                                        'mx-6 mb-0.5 flex items-center rounded-full px-3.5 py-2 text-sm',
                                        isNestedActive
                                          ? 'text-primary'
                                          : 'text-gray-500 hover:bg-gray-100'
                                      )}
                                    >
                                      {child.name}
                                    </Link>
                                  );
                                })}
                              </Collapse>
                            );
                          }

                          // normal link
                          return (
                            <Link
                              href={dropdownItem?.href}
                              key={dropdownItem?.name + index}
                              className={cn(
                                'mx-3.5 mb-0.5 flex items-center rounded-full px-3.5 py-2',
                                isChildActive
                                  ? 'text-primary'
                                  : 'text-gray-500 hover:bg-gray-100'
                              )}
                            >
                              {dropdownItem?.name}
                            </Link>
                          );
                        })} */
}
{
  /* {item?.dropdownItems?.map((dropdownItem, index) => {
                          const isChildActive =
                            pathname === (dropdownItem?.href as string);

                          return (
                            <Link
                              href={dropdownItem?.href}
                              key={dropdownItem?.name + index}
                              className={cn(
                                'mx-3.5 mb-0.5 flex items-center justify-between rounded-full px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                                isChildActive
                                  ? 'text-primary'
                                  : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
                              )}
                            >
                              <div className="flex items-center truncate">
                                <span
                                  className={cn(
                                    'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                    isChildActive
                                      ? 'bg-primary ring-[1px] ring-primary'
                                      : 'opacity-40'
                                  )}
                                />{' '}
                                <span className="truncate">
                                  {dropdownItem?.name}
                                </span>
                              </div>
                              {dropdownItem?.badge?.length ? (
                                <StatusBadge status={dropdownItem?.badge} />
                              ) : null}
                            </Link>
                          );
                        })} */
}
