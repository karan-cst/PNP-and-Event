'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Text, Title, Tooltip } from 'rizzui';
import { ProjectCategoriesTableDataType } from './table';
import { formatPrice } from '@/config/format-pricing';
import { useModal } from '../../modal-views/use-modal';
import PencilIcon from '@core/components/icons/pencil';
import UpdateCategory from './update-category/updateCategory';
import { CategoryDataType } from '../../ecommerce/category/category-list/table';
import { PiXBold } from 'react-icons/pi';
import { ProjectCategoryData } from '@/data/projectcategories-data';

const columnHelper = createColumnHelper<ProjectCategoriesTableDataType>();

export function UpdateRangeModalView({
  ProjectCategory,
}: {
  ProjectCategory: ProjectCategoriesTableDataType;
}) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Update Project Range
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <UpdateCategory
        isModalView={false}
        ProjectCategory={ProjectCategory}
        id={ProjectCategory._id}
      />
    </div>
  );
}

export const ProjectCategoriesListColumns = [
  columnHelper.display({
    id: 'Sr',
    size: 50,
    header: 'Sr.',
    cell: ({ row }) => <Text className="text-sm">{row.index + 1}</Text>,
  }),
  columnHelper.display({
    id: 'category',
    size: 100,
    header: 'Category',
    cell: ({ row }) => (
      <Title as="h6" className="!text-sm font-medium">
        {row.original.category}
      </Title>
    ),
  }),
  columnHelper.display({
    id: 'min_range',
    size: 150,
    header: 'Min Range',
    cell: ({ row }) => (
      <Text className="text-sm">{formatPrice(row.original.min_range)}</Text>
    ),
  }),
  columnHelper.display({
    id: 'max_range',
    size: 150,
    header: 'Max Range',
    cell: ({ row }) => (
      <Text className="text-sm"> {formatPrice(row.original.max_range)}</Text>
    ),
  }),
  columnHelper.display({
    id: 'vendorSelectionBy',
    size: 250,
    header: 'Vendor Selection By',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.vendorSelectionBy.user}</Text>
        <Text className="text-sm">
          {`(${row.original.vendorSelectionBy.description})`}
        </Text>
      </>
    ),
  }),
  columnHelper.display({
    id: 'vendorApprovalBy',
    size: 250,
    header: 'Vendor Approval By',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.vendorApprovalBy.user}</Text>
        <Text className="text-sm">
          {`(${row.original.vendorApprovalBy.description})`}
        </Text>
      </>
    ),
  }),
  columnHelper.display({
    id: 'update',
    size: 50,
    header: 'Action',
    cell: ({ row }) => (
      <>
        <CategoryEdit ProjectCategory={row.original} />
      </>
    ),
  }),
];

const CategoryEdit = ({
  ProjectCategory,
}: {
  ProjectCategory: ProjectCategoriesTableDataType;
}) => {
  const { openModal } = useModal();
  return (
    <Tooltip
      size="sm"
      content={'Edit Category Range'}
      placement="top"
      color="invert"
    >
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Vendor'}
        onClick={() =>
          openModal({
            view: <UpdateRangeModalView ProjectCategory={ProjectCategory} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
