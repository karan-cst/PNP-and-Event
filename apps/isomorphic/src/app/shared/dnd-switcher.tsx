'use client';

import { useDndEnabled } from '@/store/dnd-enable-store';
import { Box, Flex, Switch, Text } from 'rizzui';

export default function DndSwitcher() {
  const { enabled, setEnabled } = useDndEnabled();
  return (
    <Flex
      align="center"
      justify="between"
      className="fixed bottom-4 left-1/2 z-30 w-full max-w-[280px] -translate-x-1/2 rounded-md border border-muted bg-gray-50 px-4 py-1 shadow-lg lg:translate-x-0 2xl:translate-x-2.5"
    >
      <Box>
        <Text className="text-base font-semibold">Enable Drag & Drop</Text>
      </Box>
      <Switch
        size="lg"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
        switchKnobClassName="!bg-gray-50 [&_svg]:text-gray-900"
        switchClassName="!bg-gray-900 !border-gray-50 !ring-0 !ring-offset-0"
      />
    </Flex>
  );
}
