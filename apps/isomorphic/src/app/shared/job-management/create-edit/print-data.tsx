'use client';

import { useFormContext } from 'react-hook-form';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import JobProductDesc from './job-productdesc';
import JobInstruction from './job-instruction';
import JobProduct from './job-product';

export default function PrintData({ className }: { className?: string }) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormGroup
        title="Print Details"
        description="Add print detailes here with their size paper, and budget"
        className={cn(className, 'mb-2')}
      >
        <JobProduct />
      </FormGroup>
      <FormGroup
        title="Print Description"
        description="Add print description here with required fields and types"
        className={cn(className, 'mb-2')}
      >
        <JobProductDesc />
      </FormGroup>
      <FormGroup
        title="Print Instruction"
        description="Add print instruction here with required fields and types"
        className={cn(className, 'mb-2')}
      >
        <JobInstruction />
      </FormGroup>
    </>
  );
}
