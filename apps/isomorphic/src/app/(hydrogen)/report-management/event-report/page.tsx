'use client';

import PageHeader from '@/app/shared/page-header';
import MetricCard from '@core/components/cards/metric-card';
import { useState } from 'react';
import { Button } from 'rizzui/button';
import { Input } from 'rizzui/input';
import { Title } from 'rizzui/typography';
import { ActionIcon } from 'rizzui/action-icon';
import { PiXBold } from 'react-icons/pi';
import { Modal } from '@core/modal-views/modal';

const pageHeader = {
  title: 'Event Reports',
  breadcrumb: [
    {
      href: '#',
      name: 'Report Management',
    },
    {
      name: 'Event Reports',
    },
  ],
};

const Reports = [
  { title: 'Event-wise profit & loss Statement Report', id: 1 },
  { title: 'Vendor-wise usage & performance Report', id: 2 },
  { title: 'Monthly/Quarterly Margin Report', id: 3 },
];

export default function EventReports() {
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleCardClick = (report: any) => {
    setSelectedReport(report);
    setForm({ startDate: '', endDate: '' });
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!form.startDate || !form.endDate) return;

    console.log({
      reportId: selectedReport.id,
      ...form,
    });

    setOpen(false);
  };
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Reports.map((report) => (
          <div onClick={() => handleCardClick(report)} key={report.id}>
            <MetricCard
              key={report.id}
              title={report.title}
              metric={null}
              className="cursor-pointer transition hover:shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        size="lg"
        isOpen={open}
        onClose={() => setOpen(false)}
        className="bg-[#5e5d5db0]"
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      >
        <div className="px-7 pb-8 pt-6">
          <div className="mb-7 flex items-center justify-between">
            <Title as="h3" className="font-inter font-semibold">
              {selectedReport?.title}
            </Title>
            <ActionIcon size="sm" variant="text" onClick={() => setOpen(false)}>
              <PiXBold className="size-6" />
            </ActionIcon>
          </div>
          <div className="space-y-4">
            <Input
              type="date"
              label="Start Date"
              max={today}
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />

            <Input
              type="date"
              label="End Date"
              max={today}
              min={form.startDate}
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
