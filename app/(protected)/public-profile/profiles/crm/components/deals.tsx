'use client';

import Link from 'next/link';
import { DropdownMenu3 } from '@/partials/dropdown-menu/dropdown-menu-3';
import { DropdownMenu5 } from '@/partials/dropdown-menu/dropdown-menu-5';
import { EllipsisVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface IDealsItem {
  name: string;
  amount: string;
  date: number;
  label: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
}
type IDealsItems = Array<IDealsItem>;

const Deals = () => {
  const items: IDealsItems = [
    {
      name: 'Acme Software License',
      amount: '5,000',
      date: 30,
      label: 'Ongoing',
      color: 'primary',
    },
    {
      name: 'Strategic Partnership Deal',
      amount: '12,500',
      date: 45,
      label: 'Closed',
      color: 'success',
    },
    {
      name: 'Client Onboarding',
      amount: '18,000',
      date: 60,
      label: 'On Hold',
      color: 'destructive',
    },
    {
      name: 'Widget Supply Agreement',
      amount: '3,500',
      date: 10,
      label: 'Canceled',
      color: 'warning',
    },
    {
      name: 'Project X Redesign',
      amount: '8,200',
      date: 15,
      label: 'Closed',
      color: 'success',
    },
  ];

  const renderItem = (item: IDealsItem, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell className="text-start py-2">
          <Link
            href="#"
            className="text-sm font-medium text-mono hover:text-primary"
          >
            {item.name}
          </Link>
        </TableCell>
        <TableCell className="text-sm text-foreground">
          ${item.amount}
        </TableCell>
        <TableCell>
          <Badge variant={item.color} appearance="light">
            {item.label}
          </Badge>
        </TableCell>
        <TableCell className="text-sm text-foreground">
          {item.date} days
        </TableCell>
        <TableCell className="text-start">
          <DropdownMenu3
            trigger={
              <Button variant="ghost" mode="icon">
                <EllipsisVertical />
              </Button>
            }
          />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deals</CardTitle>
        <DropdownMenu5
          trigger={
            <Button variant="ghost" mode="icon">
              <EllipsisVertical />
            </Button>
          }
        />
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto p-0">
        <Table className="text-end">
          <TableHeader>
            <TableRow className="bg-accent/60">
              <TableHead className="text-start min-w-[150px] text-secondary-foreground! h-10">
                Deal Name
              </TableHead>
              <TableHead className="min-w-[100px] text-secondary-foreground! h-10">
                Amount
              </TableHead>
              <TableHead className="min-w-[100px] text-secondary-foreground! h-10">
                Status
              </TableHead>
              <TableHead className="min-w-[110px] text-secondary-foreground! h-10">
                Duration
              </TableHead>
              <TableCell className="w-[30px] h-10"></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              return renderItem(item, index);
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center">
        <Button mode="link" underlined="dashed" asChild>
          <Link href="/network/user-table/store-clients">All Deals</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { Deals, type IDealsItem, type IDealsItems };
