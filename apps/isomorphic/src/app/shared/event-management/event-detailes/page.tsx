'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { EventApproveListColumns } from '../event-approval/columns';
import Filters from '../event-approval/filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { useEffect, useState } from 'react';

import { EventApproveData } from '@/data/eventApprovalData';
import { useSession } from 'next-auth/react';
import ClientApprovePageHeader from '../event-approval/eventApprove-page-header';
import PageHeader from '../../page-header';
import EventHeader from '../event-view/event-header';
import { dummyJobViewData } from '@/data/jobpnp-data';
import { dummyEventViewData } from '@/data/event-management.data';

export type EventApproveDataType = (typeof EventApproveData)[number];

export default function EventDetailesPage({
  pageSize = 5,
  hideFilters = true,

  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: '[&_td]:py-2 border border-muted rounded-md ',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hideHeader?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const event = dummyEventViewData;
  const { data: session } = useSession();
  const role = session?.user.role;
  const [type, setType] = useState<string>('all');
  const pageHeader = {
    title: 'Events',
    breadcrumb: [
      {
        href: '#',
        name: 'Event Management',
      },
      {
        name: 'Event Approval',
      },
    ],
  };

  const { table, setData } = useTanStackTable<EventApproveDataType>({
    tableData:
      type == 'all'
        ? EventApproveData
        : EventApproveData.filter((e) => e.isPharma == type),
    columnConfig: EventApproveListColumns(role),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          // setData((prev) => prev.filter((r) => r.id !== row.id));
          setData((prev) => prev);
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });
  useEffect(() => {
    const data =
      type == 'all'
        ? EventApproveData
        : EventApproveData.filter((e) => e.isPharma == type);
    setData(data);
  }, [type, setData]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="space-y-6 py-2">
        {/* Header */}
        <EventHeader event={event} />
      </div>
    </>
  );
}
