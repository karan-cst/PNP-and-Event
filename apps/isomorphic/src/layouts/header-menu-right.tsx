'use client';

import { Badge, ActionIcon, Tooltip } from 'rizzui';
import MessagesDropdown from '@/layouts/messages-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/layouts/settings-button';
import RingBellSolidIcon from '@core/components/icons/ring-bell-solid';
import ChatSolidIcon from '@core/components/icons/chat-solid';
import NotificationDropdown from './notification-dropdown';
import { useFullscreen } from './use-fullscreen';
import { PiArrowsOutBold, PiXBold } from 'react-icons/pi';

export default function HeaderMenuRight() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  return (
    <div className="ms-auto grid shrink-0 grid-cols-3 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <Tooltip size="sm" content="Toggle Screen" placement="top" color="invert">
        <ActionIcon size="sm" variant="text" onClick={toggleFullscreen}>
          {isFullscreen ? (
            <PiXBold className="h-5 w-5" />
          ) : (
            <PiArrowsOutBold className="h-5 w-5" />
          )}
        </ActionIcon>
      </Tooltip>
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      {/* <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <ChatSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </MessagesDropdown>

      <SettingsButton /> */}
      <ProfileMenu />
    </div>
  );
}
