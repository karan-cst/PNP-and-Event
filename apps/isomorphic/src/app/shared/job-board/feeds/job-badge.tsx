'use client';

import { useState } from 'react';
import cn from '@core/utils/class-names';
import { Badge, Button } from 'rizzui';

export default function JobBadge({
  skills,
}: {
  skills: { name: string; value: string | number | boolean }[];
}) {
  const [initialCount, setInitialCount] = useState(5);
  const [isMore, setIsMore] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {skills.slice(0, initialCount).map((skill, index) => {
        if (skill.value) {
          return (
            <JobFeedCardBadge
              key={`skill-${index}`}
              text={typeof skill.value === 'string' ? skill.value : skill.name}
            />
          );
        }
        return null;
      })}
      {!isMore && (
        <Button
          as="span"
          size="md"
          variant="text"
          className="h-auto cursor-pointer p-0"
          onClick={(e) => {
            e.stopPropagation();
            setInitialCount(initialCount + 20);
            setIsMore(true);
          }}
        >
          <JobFeedCardBadge text="more" />
        </Button>
      )}
    </div>
  );
}

export function JobFeedCardBadge({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Badge
      size="md"
      variant="flat"
      className={cn('bg-gray-100 text-gray-500', className)}
    >
      {text}
    </Badge>
  );
}
