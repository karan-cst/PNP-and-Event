'use client';

import { Row } from '@tanstack/react-table';
import { Text } from 'rizzui';
import {
  PiEyeBold,
  PiDownloadSimpleBold,
  PiFileCsvBold,
  PiEnvelopeBold,
} from 'react-icons/pi';

export function CustomExpandedComponent<TData extends Record<string, any>>(
  row: Row<TData>
) {
  const vendors: {
    vendorName: string;
    name: string;
    total: number;
    emlFileUrl: string;
    excelFileUrl: string;
  }[] = row.original?.vendors;

  if (!Array.isArray(vendors) || vendors.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <Text className="text-base text-gray-500">
          No Vendors available for this event.
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-gray-0 px-6 py-4 dark:bg-gray-50">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vendors.map((vendor, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-300 dark:bg-gray-100"
          >
            {/* Vendor Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                {vendor.vendorName?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-700">
                  {vendor.vendorName}
                </p>
                <p className="truncate text-xs text-gray-500">{vendor.name}</p>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-200">
              <span className="text-xs text-gray-500">Total</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-700">
                ₹{vendor.total.toLocaleString('en-IN')}
              </span>
            </div>

            {/* File Actions */}
            <div className="flex flex-col gap-2">
              {/* EML File */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <PiEnvelopeBold className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                  <span className="truncate text-xs text-gray-500">
                    Email File
                  </span>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <a
                    href={vendor.emlFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-300 dark:text-gray-500 dark:hover:bg-gray-200"
                    title="View EML"
                  >
                    <PiEyeBold className="h-3 w-3" />
                    View
                  </a>
                  <a
                    href={vendor.emlFileUrl}
                    download
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-300 dark:text-gray-500 dark:hover:bg-gray-200"
                    title="Download EML"
                  >
                    <PiDownloadSimpleBold className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Excel File */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <PiFileCsvBold className="h-3.5 w-3.5 flex-shrink-0 text-green-600" />
                  <span className="truncate text-xs text-gray-500">
                    Excel File
                  </span>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <a
                    href={vendor.excelFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-300 dark:text-gray-500 dark:hover:bg-gray-200"
                    title="View Excel"
                  >
                    <PiEyeBold className="h-3 w-3" />
                    View
                  </a>
                  <a
                    href={vendor.excelFileUrl}
                    download
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-300 dark:text-gray-500 dark:hover:bg-gray-200"
                    title="Download Excel"
                  >
                    <PiDownloadSimpleBold className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 'use client';

// import { TanTableProductsDataType } from '@core/types';
// import { Row } from '@tanstack/react-table';
// import { PiXBold } from 'react-icons/pi';
// import { Flex, Text, Title } from 'rizzui';
// import VendorsTable from '../vendorTable';

// export function CustomExpandedComponent<TData extends Record<string, any>>(
//   row: Row<TData>
// ) {
//   const vendors: {
//     vendorName: string;
//     name: string;
//     total: number;
//     emlFileUrl: string;
//     excelFileUrl: string;
//   }[] = row.original?.vendors;
//   if (!Array.isArray(vendors) || vendors.length === 0) {
//     return (
//       <Flex align="center" justify="center">
//         <Text className="p-4 text-2xl text-gray-500">
//           No Vendors available for this event.
//         </Text>
//       </Flex>
//     );
//   }
//   console.log(vendors, vendors);
//   return (
//     <div className="grid grid-cols-1 divide-y bg-gray-0 px-[26px] py-4 dark:bg-gray-50">
//       <article
//         key={1}
//         className="flex items-center justify-between py-6 first-of-type:pt-2.5 last-of-type:pb-2.5"
//       >
//         <div className="flex items-start">
//           <div className="relative me-4 aspect-[80/60] w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100"></div>
//           <header></header>
//         </div>
//         <div className="flex w-full max-w-xs items-center justify-between gap-4">
//           <div className="flex items-center"></div>
//           <Text className="font-medium text-gray-900 dark:text-gray-700"></Text>
//         </div>
//       </article>
//     </div>
//   );
// }
// <div className="bg-gray-0 px-[26px] py-4 dark:bg-gray-50">
//   <VendorsTable vendors={vendors} />
// </div>
