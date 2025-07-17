'use client';

import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu5 } from '../dropdown-menu/dropdown-menu-5';

interface IProjectExtendedItem {
  total: string;
  description: string;
}
type IProjectExtendedItems = Array<IProjectExtendedItem>;

interface IProjectExtendedProps {
  status: {
    variant?:
    | 'primary'
    | 'destructive'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | null
    | undefined;
    label: string;
  };
  logo: string;
  title: string;
  description: string;
  team: {
    size?: string;
    group: Array<{ filename?: string; variant?: string; fallback?: string }>;
  };
  statistics: IProjectExtendedItem[];
  progress?: {
    variant: string;
    value: number;
  };
  url: string;
}

const MySitesProjectCard = ({
  status,
  logo,
  title,
  description,
  // statistics,
  url,
}: IProjectExtendedProps) => {
  const renderItem = (statistic: IProjectExtendedItem, index: number) => {
    return (
      <div
        key={index}
        className="grid grid-cols-1 content-between gap-1.5 border border-dashed border-input shrink-0 rounded-md px-2.5 py-2 min-w-24 max-w-auto"
      >
        <span className="text-mono text-sm leading-none font-medium">
          {statistic.total}
        </span>
        <span className="text-secondary-foreground text-xs">
          {statistic.description}
        </span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden grow justify-between">
      <div className="p-5 mb-5">
        <div className="flex items-center justify-between mb-5">
          <Badge size="lg" variant={status.variant} appearance="light">
            {status.label}
          </Badge>
          <DropdownMenu5
            trigger={
              <Button variant="ghost" mode="icon">
                <EllipsisVertical />
              </Button>
            }
          />
        </div>
        <div className="flex justify-center mb-2">
          <img
            src={logo}
            className="min-w-[50px] max-w-[45px] shrink-0"
            alt="image"
          />
        </div>
        <div className="text-center mb-7">
          <Link
            href={url}
            className="text-lg font-medium text-mono hover:text-primary"
          >
            {title}
          </Link>
          <div className="text-sm text-secondary-foreground">{description}</div>
        </div>
        {/* <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5">
          {statistics.map((statistic, index) => {
            return renderItem(statistic, index);
          })}
        </div> */}
      </div>
    </Card>
  );
};

export {
  MySitesProjectCard,
  type IProjectExtendedItem,
  type IProjectExtendedItems,
  type IProjectExtendedProps,
};
