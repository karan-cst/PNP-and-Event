'use client';

import { DatePicker } from '@core/ui/datepicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Input, Text, Button, Textarea } from 'rizzui';
import * as zod from 'zod';

// ---------------------------------------------------------------------------
// Types & Schema
// ---------------------------------------------------------------------------

const checklistSchema = zod.object({
  // Header
  delDate: zod.string().optional(),
  checkDate: zod.date(),

  // Row fields — each has ok / notOk checkbox
  jobName: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  jobNo: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  quantity: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  delMatoda: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  hg: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  size: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  paper1: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  paper2: zod.object({ ok: zod.boolean(), notOk: zod.boolean() }).optional(),
  printingQuality: zod
    .object({ ok: zod.boolean(), notOk: zod.boolean() })
    .optional(),

  // Right side
  percentageChecked: zod.string().optional(),
  noOfBoxes: zod.string().optional(),
  gapCodePrint: zod.boolean().optional(),
  png1: zod.boolean().optional(),
  pkg: zod.boolean().optional(),
  masterCarken3pv: zod.boolean().optional(),
  masterCarken7pv: zod.boolean().optional(),
  bubbleWrap: zod.boolean().optional(),
  packingBisbo: zod.boolean().optional(),
  looscePack: zod.boolean().optional(),
  photosAttached: zod.string().optional().optional(),

  // Fabrication OK / NOT OK rows
  fabricationOk: zod.boolean().optional(),
  fabricationNotOk: zod.boolean().optional(),

  dCut: zod.boolean().optional(),
  pasting: zod.boolean().optional(),
  greasing: zod.boolean().optional(),
  indexing: zod.boolean().optional(),

  centerPin: zod.boolean().optional(),
  binding: zod.boolean().optional(),
  inserting: zod.boolean().optional(),
  perforation: zod.boolean().optional(),

  bToB: zod.boolean().optional(),
  uv: zod.boolean().optional(),
  spiral: zod.boolean().optional(),
  windDWire: zod.boolean().optional(),

  lamMatt: zod.boolean().optional(),
  gloss: zod.boolean().optional(),
  frontLam: zod.boolean().optional(),
  backLam: zod.boolean().optional(),

  foil: zod.boolean().optional(),
  varnish: zod.boolean().optional(),
  frontFoil: zod.boolean().optional(),
  backFoil: zod.boolean().optional(),

  hbTitle: zod.boolean().optional(),
  sunPack: zod.boolean().optional(),
  pvgSheet: zod.boolean().optional(),
  stripGum: zod.boolean().optional(),

  note: zod.string().optional(),
});

type ChecklistFormValues = zod.infer<typeof checklistSchema>;

// ---------------------------------------------------------------------------
// Helper: OK / NOT OK checkbox pair
// ---------------------------------------------------------------------------
function OkNotOk({
  name,
  control,
}: {
  name:
    | 'jobName'
    | 'jobNo'
    | 'quantity'
    | 'delMatoda'
    | 'hg'
    | 'size'
    | 'paper1'
    | 'paper2'
    | 'printingQuality';
  control: any;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <Controller
        name={`${name}.ok`}
        control={control}
        render={({ field, fieldState }) => (
          <Checkbox
            label="OK"
            checked={!!field.value}
            onChange={field.onChange}
            className="text-xs"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name={`${name}.notOk`}
        control={control}
        render={({ field, fieldState }) => (
          <Checkbox
            label="NOT OK"
            checked={!!field.value}
            onChange={field.onChange}
            className="text-xs"
            error={fieldState.error?.message}
          />
        )}
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Helper: single fab checkbox cell
// ---------------------------------------------------------------------------
function FabCell({
  name,
  label,
  control,
}: {
  name: any;
  label: string;
  control: any;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          label={label}
          checked={!!field.value}
          onChange={field.onChange}
          className="text-xs"
          error={fieldState?.error?.message}
        />
      )}
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Checklist() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      jobName: { ok: false, notOk: false },
      jobNo: { ok: false, notOk: false },
      quantity: { ok: false, notOk: false },
      delMatoda: { ok: false, notOk: false },
      hg: { ok: false, notOk: false },
      size: { ok: false, notOk: false },
      paper1: { ok: false, notOk: false },
      paper2: { ok: false, notOk: false },
      printingQuality: { ok: false, notOk: false },
    },
  });
  console.log('errors', errors);
  const onSubmit = (data: ChecklistFormValues) => {
    console.log('Checklist submitted:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-800 shadow-sm"
    >
      {/* ── HEADER ROW ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
            DEL. DATE:
          </label>
          <Input
            {...register('delDate')}
            size="sm"
            className="w-36"
            value={'30/04/2026'}
            error={errors.delDate?.message}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
            CHECK DATE:
          </label>
          {/* <Input
            {...register('checkDate')}
            size="sm"
            className="w-36"
            error={errors.checkDate?.message}
          /> */}
          <Controller
            name="checkDate"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <DatePicker
                placeholderText="Check Date"
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* ── LEFT COLUMN: OK / NOT OK rows ── */}
        <div className="space-y-3">
          {/* JOB NAME */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              JOB NAME:
            </span>
            <OkNotOk name="jobName" control={control} />
          </div>

          {/* JOB No. */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              JOB No.:
            </span>
            <OkNotOk name="jobNo" control={control} />
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              QUANTITY:
            </span>
            <OkNotOk name="quantity" control={control} />
          </div>

          {/* DEL. MATODA */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              DEL. MATODA:
            </span>
            <OkNotOk name="delMatoda" control={control} />
          </div>

          {/* H.G. */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              H.G.:
            </span>
            <OkNotOk name="hg" control={control} />
          </div>

          {/* SIZE */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              SIZE:
            </span>
            <OkNotOk name="size" control={control} />
          </div>

          {/* PAPER (1) */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              PAPER:
            </span>
            <OkNotOk name="paper1" control={control} />
          </div>

          {/* PAPER (2) */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              PAPER:
            </span>
            <OkNotOk name="paper2" control={control} />
          </div>

          {/* PRINTING QUALITY */}
          <div className="flex items-center gap-3">
            <span className="w-32 text-xs font-semibold uppercase text-gray-600">
              PRINTING QUALITY:
            </span>
            <OkNotOk name="printingQuality" control={control} />
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-3">
          {/* Percentage of checked material */}
          <div className="flex items-center gap-2">
            <label className="w-48 text-xs text-gray-600">
              Percentage of checked material:
            </label>
            <Input
              {...register('percentageChecked')}
              size="sm"
              className="w-20"
            />
          </div>

          {/* No. of Boxes */}
          <div className="flex items-center gap-2">
            <label className="w-48 text-xs text-gray-600">No. of Boxes:</label>
            <Input {...register('noOfBoxes')} size="sm" className="w-20" />
          </div>

          {/* GAP CODE PRINT */}
          <div className="flex items-center gap-2">
            <Controller
              name="gapCodePrint"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="GAP CODE PRINT"
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="text-xs"
                />
              )}
            />
          </div>

          {/* PNG */}
          <div className="flex items-center gap-2">
            <Controller
              name="png1"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="PNG."
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="text-xs"
                />
              )}
            />
          </div>

          {/* PKG */}
          <div className="flex items-center gap-2">
            <Controller
              name="pkg"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="PKG."
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="text-xs"
                />
              )}
            />
          </div>

          {/* Master Carken */}
          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs text-gray-600">Master Carken:</span>
            <Controller
              name="masterCarken3pv"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="3 PV"
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="text-xs"
                />
              )}
            />
            <Controller
              name="masterCarken7pv"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="7 PV"
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="ml-2 text-xs"
                />
              )}
            />
          </div>

          {/* Bubble Wrap */}
          <div className="flex items-center gap-2">
            <Controller
              name="bubbleWrap"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="Bubble wrap:"
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="text-xs"
                />
              )}
            />
          </div>

          {/* PACKING: BISBO / LOOSE PACK */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600">PACKING:</span>
            <Controller
              name="packingBisbo"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="BISBO"
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="text-xs"
                />
              )}
            />
            <Controller
              name="looscePack"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="LOOSE PACK"
                  checked={!!field.value}
                  onChange={field.onChange}
                  className="text-xs"
                />
              )}
            />
          </div>

          {/* Photos Attached */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">
              Photos attached: Yes / No
            </label>
            <Input
              {...register('photosAttached')}
              size="sm"
              placeholder="Yes / No"
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* ── FABRICATION SECTION ── */}
      <div className="mt-4 rounded-md border-2 border-gray-400 p-4">
        {/* Section header */}
        <div className="mb-3 flex items-center gap-6">
          <span className="text-xs font-bold uppercase tracking-wide text-gray-700">
            FABRICATION
          </span>
          <Controller
            name="fabricationOk"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="OK"
                checked={!!field.value}
                onChange={field.onChange}
                className="text-xs"
              />
            )}
          />
          <Controller
            name="fabricationNotOk"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="NOT OK"
                checked={!!field.value}
                onChange={field.onChange}
                className="text-xs"
              />
            )}
          />
        </div>

        {/* Fabrication grid - 4 columns */}
        <div className="grid grid-cols-2 gap-y-3 md:grid-cols-4">
          {/* Row 1 */}
          <FabCell name="dCut" label="D CUT" control={control} />
          <FabCell name="pasting" label="PASTING" control={control} />
          <FabCell name="greasing" label="GREASING" control={control} />
          <FabCell name="indexing" label="INDEXING" control={control} />

          {/* Row 2 */}
          <FabCell name="centerPin" label="CENTER PIN" control={control} />
          <FabCell name="binding" label="BINDING" control={control} />
          <FabCell name="inserting" label="INSERTING" control={control} />
          <FabCell name="perforation" label="PERFORATION" control={control} />

          {/* Row 3 */}
          <FabCell name="bToB" label="B TO B" control={control} />
          <FabCell name="uv" label="UV" control={control} />
          <FabCell name="spiral" label="SPIRAL" control={control} />
          <FabCell name="windDWire" label='WIND "D" WIRE' control={control} />

          {/* Row 4 - LAM */}
          <FabCell name="lamMatt" label="LAM: MATT" control={control} />
          <FabCell name="gloss" label="GLOSS" control={control} />
          <FabCell name="frontLam" label="FRONT" control={control} />
          <FabCell name="backLam" label="BACK" control={control} />

          {/* Row 5 - FOIL */}
          <FabCell name="foil" label="FOIL:" control={control} />
          <FabCell name="varnish" label="VARNISH:" control={control} />
          <FabCell name="frontFoil" label="FRONT" control={control} />
          <FabCell name="backFoil" label="BACK" control={control} />

          {/* Row 6 */}
          <FabCell name="hbTitle" label="H.B. TITLE" control={control} />
          <FabCell name="sunPack" label="SUN PACK" control={control} />
          <FabCell name="pvgSheet" label="PVG SHEET" control={control} />
          <FabCell name="stripGum" label="STRIP GUM" control={control} />
        </div>
      </div>

      {/* ── NOTE ── */}
      <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-600">
        <p className="mb-2">
          <strong>NOTE:</strong> The Printer will be held responsible for the
          failure to comply with the above mentioned parameters and may be
          penalized for the same.
        </p>
        <div className="flex items-start gap-2">
          <label className="mt-1 font-semibold">NOTE:</label>
          <Textarea
            {...register('note')}
            rows={2}
            placeholder="Additional notes..."
            className="flex-1 text-xs"
          />
        </div>
      </div>

      {/* ── SUBMIT ── */}
      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="outline" size="md">
          Save As Draft
        </Button>
        <Button type="submit" size="md">
          Save Checklist
        </Button>
      </div>
    </form>
  );
}

// 'use client';

// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as zod from 'zod';
// import { Checkbox, Input, Button, Title } from 'rizzui';

// const schema = zod.object({
//   jobNameOk: zod.boolean(),
//   jobNameNotOk: zod.boolean(),

//   jobNoOk: zod.boolean(),
//   jobNoNotOk: zod.boolean(),

//   quantityOk: zod.boolean(),
//   quantityNotOk: zod.boolean(),

//   delMethodOk: zod.boolean(),
//   delMethodNotOk: zod.boolean(),

//   hqOk: zod.boolean(),
//   hqNotOk: zod.boolean(),

//   sizeOk: zod.boolean(),
//   sizeNotOk: zod.boolean(),

//   paperOk: zod.boolean(),
//   paperNotOk: zod.boolean(),

//   printingQualityOk: zod.boolean(),
//   printingQualityNotOk: zod.boolean(),

//   // fabrication
//   cuttingOk: zod.boolean(),
//   cuttingNotOk: zod.boolean(),

//   pastingOk: zod.boolean(),
//   pastingNotOk: zod.boolean(),

//   creasingOk: zod.boolean(),
//   creasingNotOk: zod.boolean(),
// });

// export default function Checklist() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = (data: any) => {
//     console.log(data);
//   };

//   const Row = ({ label, ok, notOk }: any) => (
//     <div className="grid grid-cols-12 items-center gap-4 border-b py-2">
//       <div className="col-span-4 text-sm font-medium">{label}</div>

//       <div className="col-span-4 flex items-center gap-3">
//         <Controller
//           name={ok}
//           control={control}
//           render={({ field }) => (
//             <Checkbox {...field} checked={field.value} label="OK" />
//           )}
//         />
//       </div>

//       <div className="col-span-4 flex items-center gap-3">
//         <Controller
//           name={notOk}
//           control={control}
//           render={({ field }) => (
//             <Checkbox {...field} checked={field.value} label="NOT OK" />
//           )}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* BASIC DETAILS */}
//       <div className="rounded-xl border p-5">
//         <Title as="h5">Basic Details</Title>

//         <Row label="JOB NAME" ok="jobNameOk" notOk="jobNameNotOk" />
//         <Row label="JOB NO" ok="jobNoOk" notOk="jobNoNotOk" />
//         <Row label="QUANTITY" ok="quantityOk" notOk="quantityNotOk" />
//         <Row label="DEL METHOD" ok="delMethodOk" notOk="delMethodNotOk" />
//         <Row label="H.O" ok="hqOk" notOk="hqNotOk" />
//         <Row label="SIZE" ok="sizeOk" notOk="sizeNotOk" />
//         <Row label="PAPER" ok="paperOk" notOk="paperNotOk" />
//         <Row
//           label="PRINTING QUALITY"
//           ok="printingQualityOk"
//           notOk="printingQualityNotOk"
//         />
//       </div>

//       {/* FABRICATION */}
//       <div className="rounded-xl border p-5">
//         <Title as="h5">Fabrication</Title>

//         <Row label="CUTTING" ok="cuttingOk" notOk="cuttingNotOk" />
//         <Row label="PASTING" ok="pastingOk" notOk="pastingNotOk" />
//         <Row label="CREASING" ok="creasingOk" notOk="creasingNotOk" />
//       </div>

//       <div className="flex justify-end">
//         <Button type="submit">Save Checklist</Button>
//       </div>
//     </form>
//   );
// }
