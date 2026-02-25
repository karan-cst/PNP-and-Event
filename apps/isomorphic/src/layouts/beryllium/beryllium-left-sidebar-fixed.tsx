'use client';

import {
  berylliumMenuItemAtom,
  berylliumMenuItems,
  MenuItemsType,
} from '@/layouts/beryllium/beryllium-fixed-menu-items';
import {
  getActiveMainMenuIndex,
  useBerylliumSidebars,
} from '@/layouts/beryllium/beryllium-utils';
import { useWindowSize } from '@core/hooks/use-window-size';
import cn from '@core/utils/class-names';
import { useAtom, useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PiTextIndent } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';

function MenuItem({ menu }: { menu: MenuItemsType }) {
  const router = useRouter();
  const { expandedLeft, setExpandedLeft } = useBerylliumSidebars();
  const [menuItems, setMenuItems] = useAtom(berylliumMenuItemAtom);

  const Icon = menu.icon;
  const isActive = menuItems?.id === menu.id;

  function handleClick() {
    const items = menu.menuItems || [];

    // ✅ Case 1: No children at all
    if (!items.length) {
      return;
    }

    // ✅ Case 2: Only one child AND it has direct href (no submenus)
    if (
      items.length === 1 &&
      items[0].href &&
      (!items[0].subMenuItems || items[0].subMenuItems.length === 0)
    ) {
      router.push(items[0].href);
      setExpandedLeft(false); // optional: auto close drawer
      return;
    }

    // ✅ Case 3: Has multiple children OR nested submenus
    setMenuItems(menu);

    if (!expandedLeft) {
      setExpandedLeft(true);
    }
    if (expandedLeft) {
      setExpandedLeft(false);
    }
  }

  return (
    <li
      onClick={handleClick}
      onMouseEnter={() => {
        // ✅ Case 1: No children at all
        if (!menu.isExpnad) {
          setExpandedLeft(false);
          return;
        } else {
          setExpandedLeft(true);
          setMenuItems(menu || []);
        }
      }}
      className="group flex cursor-pointer flex-col items-center gap-1.5 pb-1.5"
    >
      <span
        className={cn(
          'rounded-3xl bg-gray-0/0 px-4 py-2 text-white transition-colors duration-200 group-hover:bg-gray-0 group-hover:text-gray-900 dark:group-hover:bg-gray-100',
          isActive && 'bg-gray-0 text-gray-900 dark:bg-gray-100'
        )}
      >
        <Icon className="h-auto w-6" />
      </span>
      <span className="text-white">{menu.name}</span>
    </li>
  );
}

function MenuItems() {
  const { data: session } = useSession();
  if (!session?.user?.role) return null;
  const role = session.user.role;

  const filteredMenu = berylliumMenuItems
    // 1️⃣ Filter top-level sections
    .filter((section) => {
      if (!section.roles) return true;
      return section.roles.includes(role);
    })
    .map((section) => ({
      ...section,

      // 2️⃣ Filter second level
      menuItems: section.menuItems
        ?.filter((item) => {
          if (!item.roles) return true;
          return item.roles.includes(role);
        })
        .map((item) => ({
          ...item,

          // 3️⃣ Filter third level (subMenuItems)
          subMenuItems: item.subMenuItems?.filter((sub) => {
            if (!sub.roles) return true;
            return sub.roles.includes(role);
          }),
        })),
    }));

  return (
    <menu className="flex w-full justify-center">
      <div className="custom-scrollbar h-[calc(100vh_-_105px)] w-full overflow-y-auto scroll-smooth pb-5">
        <ul className="flex flex-col gap-6">
          {filteredMenu.map((menu) => (
            <MenuItem key={menu.id} menu={menu} />
          ))}
        </ul>
      </div>
    </menu>
  );
}

export default function BerylliumLeftSidebarFixed() {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const setMenuItems = useSetAtom(berylliumMenuItemAtom);
  const { expandedLeft, setExpandedLeft } = useBerylliumSidebars();

  useEffect(() => {
    const activeMenuIndex = getActiveMainMenuIndex(
      pathname,
      berylliumMenuItems
    );
    setMenuItems(berylliumMenuItems[activeMenuIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // useEffect(() => {
  //   if (width < 1536) {
  //     setExpandedLeft(false);
  //   } else {
  //     setExpandedLeft(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [width, pathname]);
  useEffect(() => {
    setExpandedLeft(false);
  }, [pathname]);

  return (
    <aside className="fixed start-0 top-0 z-50 hidden h-screen w-[88px] flex-col items-center gap-10 bg-gray-900 py-3.5 dark:bg-gray-0 xl:flex">
      <ActionIcon
        aria-label="open sidebar"
        variant="text"
        className="rounded-full bg-transparent text-white transition-colors hover:bg-gray-300 hover:enabled:text-gray-900"
        size="xl"
        onClick={() => setExpandedLeft(!expandedLeft)}
      >
        <PiTextIndent className="h-auto w-9" />
      </ActionIcon>
      <MenuItems />
    </aside>
  );
}

// function MenuItem({ menu }: { menu: MenuItemsType }) {
//   const { expandedLeft, setExpandedLeft } = useBerylliumSidebars();
//   const [menuItems, setMenuItems] = useAtom(berylliumMenuItemAtom);
//   const Icon = menu.icon;

//   const isActive = menuItems === menu;

//   function handleClick() {
//     setMenuItems(menu);
//     if (!expandedLeft) {
//       setExpandedLeft(true);
//     }
//   }

//   return (
//     <li
//       onClick={handleClick}
//       className="group flex cursor-pointer flex-col items-center gap-1.5 pb-1.5"
//     >
//       <span
//         className={cn(
//           'rounded-3xl bg-gray-0/0 px-4 py-2 text-white transition-colors duration-200 group-hover:bg-gray-0 group-hover:text-gray-900 dark:group-hover:bg-gray-100',
//           isActive && 'bg-gray-0 text-gray-900 dark:bg-gray-100'
//         )}
//       >
//         <Icon className="h-auto w-6" />
//       </span>
//       <span className="text-white">{menu.name}</span>
//     </li>
//   );
// }
