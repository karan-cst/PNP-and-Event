'use client';

import { useState } from 'react';
import { Badge, Text, Avatar, Button, Input, Textarea } from 'rizzui';
import type {
  JobFormDataType,
  ApprovalStatus,
} from '../../../../data/jobpnp-data.ts'; // adjust path
import { useSession } from 'next-auth/react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface StepFormState {
  comment: string;
  // Business Head extras
  designerName: string;
  designCost: string;
  // Print Manager extras
  vendorName: string;
}

type ActionPanelMode = 'idle' | 'approving' | 'rejecting';

// ─────────────────────────────────────────────────────────────────────────────
// Dummy data
// ─────────────────────────────────────────────────────────────────────────────

const dummyJob: Partial<JobFormDataType> = {
  businessHeadName: {
    userName: 'Rahul Verma',
    status: 'Approved',
    designCost: 4500,
    date: '22/04/2026',
  },
  printExecutive: {
    status: 'Pending',
  },
  operationHead: {
    status: 'Pending',
  },

  printManager: {
    managerName: 'Suresh Patil',
    vendorSelectionStatus: 'Pending',
  },
  finalizedVendorName: '',
  designerName: 'Neha Joshi',
};

// ─────────────────────────────────────────────────────────────────────────────
// StatusBadge
// ─────────────────────────────────────────────────────────────────────────────

function StatusBadge({
  status,
  isLocked,
}: {
  status: ApprovalStatus | undefined;
  isLocked: boolean;
}) {
  const s = isLocked ? 'Pending' : (status ?? 'Pending');
  if (s === 'Approved')
    return (
      <Badge
        variant="flat"
        color="success"
        className="shrink-0 text-xs font-semibold"
      >
        Approved
      </Badge>
    );
  if (s === 'Rejected')
    return (
      <Badge
        variant="flat"
        color="danger"
        className="shrink-0 text-xs font-semibold"
      >
        Rejected
      </Badge>
    );
  return (
    <Badge
      variant="flat"
      color="warning"
      className="shrink-0 text-xs font-semibold"
    >
      Pending
    </Badge>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Connector
// ─────────────────────────────────────────────────────────────────────────────

function Connector({ done, locked }: { done: boolean; locked: boolean }) {
  return (
    <div className="flex justify-start py-0.5 pl-5">
      <div
        className={[
          'h-6 w-0.5 rounded-full transition-colors duration-500',
          locked ? 'bg-gray-200' : done ? 'bg-green-400' : 'bg-[#7c1d1d]/40',
        ].join(' ')}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Action Panel — inline approve / reject form
// ─────────────────────────────────────────────────────────────────────────────

interface ActionPanelProps {
  mode: ActionPanelMode;
  form: StepFormState;
  errors: Partial<StepFormState>;
  showDesignerFields?: boolean; // Business Head only
  showVendorField?: boolean; // Print Manager only
  onFormChange: (field: keyof StepFormState, value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

function ActionPanel({
  mode,
  form,
  errors,
  showDesignerFields,
  showVendorField,
  onFormChange,
  onConfirm,
  onCancel,
}: ActionPanelProps) {
  if (mode === 'idle') return null;

  const isApproving = mode === 'approving';

  return (
    <div
      className={[
        'mt-3 space-y-3 rounded-lg border p-3 transition-all',
        isApproving
          ? 'border-green-200 bg-green-50/40'
          : 'border-red-200 bg-red-50/40',
      ].join(' ')}
    >
      <Text className="!text-xs !font-semibold text-gray-700">
        {isApproving ? '✅ Confirm Approval' : '❌ Confirm Rejection'}
      </Text>

      {/* Business Head extras — only shown when approving */}
      {showDesignerFields && isApproving && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              size="sm"
              label="Designer Name *"
              placeholder="e.g. Neha Joshi"
              value={form.designerName}
              onChange={(e) => onFormChange('designerName', e.target.value)}
              error={errors.designerName}
              className="text-xs"
            />
          </div>
          <div>
            <Input
              size="sm"
              label="Design Cost (₹) *"
              type="number"
              placeholder="e.g. 4500"
              value={form.designCost}
              onChange={(e) => onFormChange('designCost', e.target.value)}
              error={errors.designCost}
              className="text-xs"
            />
          </div>
        </div>
      )}

      {/* Print Manager extras — vendor name when approving */}
      {showVendorField && isApproving && (
        <Input
          size="sm"
          label="Finalized Vendor Name *"
          placeholder="e.g. Ravi Print Works"
          value={form.vendorName}
          onChange={(e) => onFormChange('vendorName', e.target.value)}
          error={errors.vendorName}
          className="text-xs"
        />
      )}

      {/* Comment — always */}
      <Textarea
        size="sm"
        label={isApproving ? 'Remarks (optional)' : 'Reason for Rejection *'}
        placeholder={
          isApproving ? 'Add any remarks...' : 'State reason for rejection...'
        }
        value={form.comment}
        onChange={(e) => onFormChange('comment', e.target.value)}
        error={errors.comment}
        rows={2}
        className="text-xs"
      />

      {/* Buttons */}
      <div className="flex items-center gap-2 pt-0.5">
        <Button
          size="sm"
          color={isApproving ? 'primary' : 'danger'}
          variant="solid"
          onClick={onConfirm}
          className="text-xs font-semibold"
        >
          {isApproving ? 'Approve' : 'Reject'}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
          className="text-xs font-semibold"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StepCard
// ─────────────────────────────────────────────────────────────────────────────

interface StepCardProps {
  step: number;
  title: string;
  subtitle: string;
  status: ApprovalStatus | undefined;
  isLocked: boolean;
  userName?: string;
  date?: string;
  // Saved extra info to display after submission
  savedDesignerName?: string;
  savedDesignCost?: number;
  savedVendorName?: string;
  savedComment?: string;
  // Action panel config
  showDesignerFields?: boolean;
  showVendorField?: boolean;
  onApprove: (form: StepFormState) => void;
  onReject: (form: StepFormState) => void;
}

function StepCard({
  step,
  title,
  subtitle,
  status,
  isLocked,
  userName,
  date,
  savedDesignerName,
  savedDesignCost,
  savedVendorName,
  savedComment,
  showDesignerFields,
  showVendorField,
  onApprove,
  onReject,
}: StepCardProps) {
  const s = isLocked ? 'Pending' : (status ?? 'Pending');
  const isDone = s === 'Approved' || s === 'Rejected';

  const [mode, setMode] = useState<ActionPanelMode>('idle');
  const [form, setForm] = useState<StepFormState>({
    comment: '',
    designerName: '',
    designCost: '',
    vendorName: '',
  });
  const [errors, setErrors] = useState<Partial<StepFormState>>({});

  const handleFormChange = (field: keyof StepFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<StepFormState> = {};

    if (mode === 'rejecting' && !form.comment.trim()) {
      newErrors.comment = 'Reason is required for rejection';
    }
    if (mode === 'approving' && showDesignerFields) {
      if (!form.designerName.trim())
        newErrors.designerName = 'Designer name is required';
      if (!form.designCost.trim())
        newErrors.designCost = 'Design cost is required';
      else if (isNaN(Number(form.designCost)) || Number(form.designCost) <= 0)
        newErrors.designCost = 'Enter a valid amount';
    }
    if (mode === 'approving' && showVendorField) {
      if (!form.vendorName.trim())
        newErrors.vendorName = 'Vendor name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    if (mode === 'approving') onApprove(form);
    else onReject(form);
    setMode('idle');
    setForm({ comment: '', designerName: '', designCost: '', vendorName: '' });
  };

  // ── card styling ────────────────────────────────────────────────────────────
  const cardCls = [
    'relative rounded-xl border-2 p-4 transition-all duration-300',
    isLocked
      ? 'border-dashed border-gray-200 bg-gray-50/60 opacity-60 pointer-events-none select-none'
      : s === 'Approved'
        ? 'border-green-200 bg-white'
        : s === 'Rejected'
          ? 'border-red-200 bg-white'
          : 'border-[#7c1d1d]/40 bg-white shadow-sm shadow-[#7c1d1d]/5',
  ].join(' ');

  const pillCls = [
    'absolute -top-2.5 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full leading-4',
    isLocked
      ? 'bg-gray-200 text-gray-500'
      : s === 'Approved'
        ? 'bg-green-100 text-green-700'
        : s === 'Rejected'
          ? 'bg-red-100 text-red-600'
          : 'bg-[#7c1d1d] text-white',
  ].join(' ');

  const avatarCls = [
    'shrink-0 !w-10 !h-10 !text-xs !font-bold',
    isLocked
      ? '!bg-gray-100 !text-gray-400 ring-2 ring-dashed ring-gray-300'
      : s === 'Approved'
        ? '!bg-green-50 !text-green-700 ring-2 ring-green-400'
        : s === 'Rejected'
          ? '!bg-red-50 !text-red-600 ring-2 ring-red-400'
          : '!bg-[#fdf2f2] !text-[#7c1d1d] ring-2 ring-[#7c1d1d]',
  ].join(' ');

  return (
    <div className={cardCls}>
      <span className={pillCls}>Step {step}</span>

      <div className="flex items-start gap-3 pt-1">
        <Avatar
          name={isLocked ? 'Lock' : (userName ?? '?')}
          className={avatarCls}
        />

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Text className="!text-sm !font-semibold leading-tight text-gray-800">
                {title}
              </Text>
              <Text className="mt-0.5 !text-xs text-gray-500">{subtitle}</Text>
            </div>
            <StatusBadge status={status} isLocked={isLocked} />
          </div>

          {/* User chip + date */}
          {!isLocked && userName && (
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {userName}
              </span>
              {date && <span className="text-xs text-gray-400">{date}</span>}
            </div>
          )}

          {/* Saved info chips — visible after approval */}
          {!isLocked && isDone && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {savedDesignerName && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  Designer: {savedDesignerName}
                </span>
              )}
              {savedDesignCost != null && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Design cost: ₹{savedDesignCost.toLocaleString('en-IN')}
                </span>
              )}
              {savedVendorName && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Vendor: {savedVendorName}
                </span>
              )}
              {savedComment && (
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  {savedComment}
                </span>
              )}
            </div>
          )}

          {/* Approve / Reject trigger buttons — only when pending & not locked */}
          {!isLocked && !isDone && mode === 'idle' && (
            <div className="mt-3 flex items-center gap-2">
              <Button
                size="sm"
                color="primary"
                variant="outline"
                onClick={() => setMode('approving')}
                className="text-xs font-semibold"
              >
                Approve
              </Button>
              <Button
                size="sm"
                color="danger"
                variant="outline"
                onClick={() => setMode('rejecting')}
                className="text-xs font-semibold"
              >
                Reject
              </Button>
            </div>
          )}

          {/* Inline action form */}
          {!isLocked && !isDone && (
            <ActionPanel
              mode={mode}
              form={form}
              errors={errors}
              showDesignerFields={showDesignerFields}
              showVendorField={showVendorField}
              onFormChange={handleFormChange}
              onConfirm={handleConfirm}
              onCancel={() => {
                setMode('idle');
                setErrors({});
                setForm({
                  comment: '',
                  designerName: '',
                  designCost: '',
                  vendorName: '',
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

export default function ApprovalDetails({
  job: initialJob = dummyJob,
  onJobUpdate,
}: {
  job?: Partial<JobFormDataType>;
  /**
   * Called whenever any approval step is actioned.
   * Receive the full updated job object — persist it on your end.
   */
  onJobUpdate?: (updatedJob: Partial<JobFormDataType>) => void;
}) {
  const [job, setJob] = useState<Partial<JobFormDataType>>(initialJob);

  // Extra info saved per step (comment, designer, vendor)
  const [step1Meta, setStep1Meta] = useState<{
    comment?: string;
    designerName?: string;
    designCost?: number;
  }>({
    designerName: job?.designerName || '',
    designCost: job.businessHeadName?.designCost,
  });
  const [step2Meta, setStep2Meta] = useState<{ comment?: string }>({});
  const [step3Meta, setStep3Meta] = useState<{ comment?: string }>({});
  const [step4Meta, setStep4Meta] = useState<{
    comment?: string;
    vendorName?: string;
  }>({});
  const session = useSession();
  const role = session.data?.user?.role;

  const today = new Date().toLocaleDateString('en-GB'); // dd/mm/yyyy

  const update = (patch: Partial<JobFormDataType>) => {
    const next = { ...job, ...patch };
    setJob(next);
    onJobUpdate?.(next);
  };

  // ── Step handlers ──────────────────────────────────────────────────────────
  const handleBHApprove = (form: StepFormState) => {
    const cost = Number(form.designCost);
    setStep1Meta({
      comment: form.comment,
      designerName: form.designerName,
      designCost: cost,
    });
    update({
      businessHeadName: {
        ...job.businessHeadName!,
        status: 'Approved',
        date: today,
        designCost: cost,
      },
      designCost: cost,
    });
  };
  const handleBHReject = (form: StepFormState) => {
    setStep3Meta({ comment: form.comment });
    update({
      businessHeadName: {
        ...job.businessHeadName!,
        status: 'Rejected',
        date: today,
      },
    });
  };

  const handleOHApprove = (form: StepFormState) => {
    setStep2Meta({ comment: form.comment });
    update({
      operationHead: { ...job.operationHead!, status: 'Approved', date: today },
    });
  };
  const handleOHReject = (form: StepFormState) => {
    setStep2Meta({ comment: form.comment });
    update({
      operationHead: { ...job.operationHead!, status: 'Rejected', date: today },
    });
  };

  const handlePEApprove = (form: StepFormState) => {
    setStep3Meta({ comment: form.comment });
    update({
      printExecutive: {
        ...job.printExecutive!,
        status: 'Approved',
        date: today,
      },
    });
  };
  const handlePEReject = (form: StepFormState) => {
    setStep3Meta({ comment: form.comment });
    update({
      printExecutive: {
        ...job.printExecutive!,
        status: 'Rejected',
        date: today,
      },
    });
  };

  const handlePMApprove = (form: StepFormState) => {
    setStep4Meta({ comment: form.comment, vendorName: form.vendorName });
    update({
      printManager: {
        ...job.printManager!,
        vendorSelectionStatus: 'Approved',
        date: today,
      },
      finalizedVendorName: form.vendorName,
    });
  };
  const handlePMReject = (form: StepFormState) => {
    setStep4Meta({ comment: form.comment });
    update({
      printManager: {
        ...job.printManager!,
        vendorSelectionStatus: 'Rejected',
        date: today,
      },
    });
  };

  // ── Derived state ──────────────────────────────────────────────────────────

  const pe = job.printExecutive;
  const oh = job.operationHead;
  const bh = job.businessHeadName;
  const pm = job.printManager;
  // const step1Done = bh?.status === 'Approved' || oh?.status === 'Approved';
  const step1Done = role
    ? role == 'businessHead' || role == 'operationHeadPrint'
      ? false
      : bh?.status === 'Approved' || oh?.status === 'Approved'
    : bh?.status === 'Approved' || oh?.status === 'Approved';
  // const step2Done =
  // const step3Done = pe?.status === 'Approved';
  const step3Done = role
    ? role == 'printExecutive'
      ? false
      : role == 'printMng'
        ? true
        : pe?.status === 'Approved'
    : pe?.status === 'Approved';
  const step4Done = role
    ? role == 'printMng'
      ? true
      : pm?.vendorSelectionStatus === 'Approved'
    : pm?.vendorSelectionStatus === 'Approved';

  const stepsApproved = [step1Done, step3Done, step4Done && step3Done].filter(
    Boolean
  ).length;
  const progressPct = Math.round((stepsApproved / 3) * 100);

  return (
    <div className="m-auto max-w-2xl">
      {/* Progress header */}
      <div className="mb-5 flex items-center justify-between">
        <Text className="!text-sm !font-semibold text-gray-700">
          Approval pipeline
        </Text>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7c1d1d] to-green-500 transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <Text className="!text-xs text-gray-500">{stepsApproved}/3</Text>
        </div>
      </div>

      {/* ── Step 1: Print Executive ─────────────────────────────────────────── */}
      <StepCard
        step={1}
        title="Business Head / Operation Head"
        subtitle="Final business sign-off with design cost"
        status={step1Done ? bh?.status || oh?.status : 'Pending'}
        isLocked={false}
        userName={step1Done ? bh?.userName || oh?.userName : ''}
        date={bh?.date || oh?.date}
        showDesignerFields
        savedDesignerName={step1Meta.designerName}
        savedDesignCost={step1Meta.designCost}
        savedComment={step1Meta.comment}
        onApprove={handleBHApprove}
        onReject={handleBHReject}
      />
      <Connector done={step1Done} locked={false} />

      {/* ── Step 2: Operation Head ──────────────────────────────────────────── */}
      {/* <StepCard
        step={2}
        title="Operation Head"
        subtitle="Operations & resource validation"
        status={oh?.status}
        isLocked={!step1Done}
        userName={oh?.userName}
        date={oh?.date}
        savedComment={step2Meta.comment}
        onApprove={handleOHApprove}
        onReject={handleOHReject}
      /> */}
      {/* 
      <Connector done={step1Done} locked={!step1Done} /> */}

      {/* ── Step 3: Business Head ───────────────────────────────────────────── */}

      <StepCard
        step={2}
        title="Print Executive"
        subtitle="Initial print job review & approval"
        // status={step3Done ? pe?.status : 'Pending'}
        status={step3Done ? 'Approved' : 'Pending'}
        isLocked={!step1Done}
        // userName={step3Done ? pe?.userName : ''}
        userName={step3Done ? 'Karan Jain' : ''}
        date={step3Done ? '23/04/2026' : pe?.date}
        savedComment={step3Meta.comment}
        onApprove={handlePEApprove}
        onReject={handlePEReject}
      />

      <Connector done={step3Done} locked={!step1Done} />
      {/* ── Step 4: Print Manager ───────────────────────────────────────────── */}
      <StepCard
        step={3}
        title="Print Manager"
        subtitle="All Vendor Quote received and send for Vendore Selection"
        status={step4Done ? pm?.vendorSelectionStatus : 'Pending'}
        isLocked={step4Done ? !step3Done : true}
        userName={pm?.managerName}
        date={pm?.date}
        showVendorField
        savedVendorName={step4Meta.vendorName}
        savedComment={step4Meta.comment}
        onApprove={handlePMApprove}
        onReject={handlePMReject}
      />
    </div>
  );
}
