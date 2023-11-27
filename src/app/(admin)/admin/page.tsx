import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export default function AdminPage() {
  return (
    <div>
      <Button component={Link} href='/'>
        Next link button
      </Button>
    </div>
  );
}
