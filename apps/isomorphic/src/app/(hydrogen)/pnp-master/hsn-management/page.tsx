import HSNTable from '@/app/shared/pnp-master/hsn-management/hsn-list/table';

export default function HSNManagement() {
  return (
    <>
      <HSNTable pageSize={10} type={'PNP'} />
    </>
  );
}
