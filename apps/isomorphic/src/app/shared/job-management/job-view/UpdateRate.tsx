'use client';
import { Text, Title } from 'rizzui/typography';
import { useModal } from '../../modal-views/use-modal';
import { ActionIcon } from 'rizzui/action-icon';
import { PiXBold } from 'react-icons/pi';
import { Input } from 'rizzui/input';
import { formatPrice } from '@/config/format-pricing';
import { Button } from 'rizzui/button';
import { useState } from 'react';

export function UpdateRateModalView({
  row,
}: {
  row: {
    id: number | string;
    vendorName: string;
    name: string;
    total: number;
    emlFileUrl?: string;
    excelFileUrl?: string;
    qty: number;
    price: number;
  };
}) {
  const [updatedRate, setUpdatedRate] = useState('');

  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Update Rate - {row.vendorName}
        </Title>

        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <div className="space-y-4">
        <Input
          type="number"
          label="Updated Rate"
          placeholder="Enter updated price per piece"
          value={updatedRate}
          onChange={(e) => setUpdatedRate(e.target.value)}
          min={1}
        />

        <Text className="text-sm">Quantity - {row.qty}</Text>

        <Text className="text-sm">
          Previous Amount - {formatPrice(row.price)} x {row.qty} Qty =
          {formatPrice(row.total)}
        </Text>

        <Text className="text-sm font-semibold">
          New Total Amount - {formatPrice(updatedRate)} x {row.qty} Qty ={' '}
          {formatPrice((Number(updatedRate) || 0) * row.qty)}
        </Text>

        <div className="flex justify-end gap-3 pt-3">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>

          <Button onClick={() => {}}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
