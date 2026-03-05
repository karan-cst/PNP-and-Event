'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Avatar, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { UserDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import DeletePopover from '@core/components/delete-popover';
import EyeIcon from '@core/components/icons/eye';
import {
  CreatePasswordChangeModalView,
  CreateUserModalView,
} from '../create-user/user-page-header';
import { useModal } from '../../modal-views/use-modal';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { TbPasswordUser } from 'react-icons/tb';

const columnHelper = createColumnHelper<UserDataType>();

export const UserListColumns = [
  columnHelper.display({
    id: 'userId',
    size: 100,
    header: 'user Id',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('firstName', {
    id: 'firstName',
    size: 250,
    header: 'Name',
    cell: ({ row }) => {
      const { firstName, lastName, userType } = row.original;

      return (
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar
            name={`${firstName} ${lastName}`}
            size="sm"
            color="primary"
            className="bg-[#F1F1F1] !text-black"
          />

          {/* Name + Role */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-900">
              {firstName} {lastName}
            </span>
            <span className="text-xs text-gray-500">{userType}</span>
          </div>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'email',
    size: 150,
    header: 'Email',
    cell: ({ row }) => <Text className="text-sm">{row.original.email}</Text>,
  }),
  columnHelper.accessor('mobile', {
    id: 'mobile',
    size: 200,
    header: 'Mobile',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{`${row.original.mobile}`}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) =>
      getStatusBadge(row.original.isActive ? 'Active' : 'Deactive'),
  }),
  columnHelper.display({
    id: 'action',
    size: 150,
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="start" gap="3" className="pe-4">
        <UserEdit user={row.original} />
        <Tooltip size="sm" content={'View User'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Product'}
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <UserPasswordChange user={row.original} />
        {/* <DeletePopover
          title={`Delete the user`}
          description={`Are you sure you want to delete this #${row.original.firstName} ${row.original.lastName} ?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        /> */}
      </Flex>
    ),
  }),
  // columnHelper.display({
  //   id: 'isActive',
  //   size: 120,
  //   header: 'Is Active',
  //   cell: ({ row }) => (
  //     <Switch
  //       // label="Free Shipping"
  //       className="col-span-full"
  //       value={row.original.isActive ? 'true' : 'false'}
  //       checked={row.original.isActive}
  //       onChange={(e) =>
  //         e.target.value == 'true'
  //           ? (row.original.isActive = true)
  //           : (row.original.isActive = false)
  //       }
  //     />
  //   ),
  // }),
];

const UserEdit = ({ user }: { user: UserDataType }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Product'}
        onClick={() =>
          openModal({
            view: <CreateUserModalView user={user} type="PNP" />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
const UserPasswordChange = ({ user }: { user: UserDataType }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Product'}
        onClick={() =>
          openModal({
            view: <CreatePasswordChangeModalView user={user} />,
            customSize: 540,
          })
        }
      >
        <TbPasswordUser className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
