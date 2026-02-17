'use client';

import { ReactNode, useEffect } from 'react';

type FullScreenWrapperProps = {
  children: ReactNode;
  onClose?: () => void;
};

export default function FullScreenWrapper({
  children,
  onClose,
}: FullScreenWrapperProps) {
  useEffect(() => {
    const enterFullscreen = async () => {
      if (!document.fullscreenElement) {
        // await ref.current.requestFullscreen();
        document.documentElement.requestFullscreen();
      }
    };

    enterFullscreen();

    const handleExit = () => {
      if (!document.fullscreenElement && onClose) {
        onClose();
      }
    };

    document.addEventListener('fullscreenchange', handleExit);

    return () => {
      document.removeEventListener('fullscreenchange', handleExit);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [onClose]);

  return (
    // <div className="flex h-full w-full flex-col bg-background">
    //   <div className="flex-1 overflow-auto px-6 py-4">{children}</div>
    // </div>
    <div className="pointer-events-auto h-full w-full px-6 py-4">
      <div className="h-full overflow-auto">{children}</div>
    </div>
  );
}

// 'use client';

// import { ReactNode } from 'react';

// type FullScreenWrapperProps = {
//   children: ReactNode;
// };

// export default function FullScreenWrapper({
//   children,
// }: FullScreenWrapperProps) {
//   return (
//     // <div className="flex h-screen w-screen flex-col bg-background">
//     <div className="fixed inset-0 z-[9999] flex h-[2000px] w-dvw flex-col bg-background">
//       <div className="flex-1 overflow-auto px-6 py-4">{children}</div>
//     </div>
//   );
// }
