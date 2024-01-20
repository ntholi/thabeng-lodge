import React, { PropsWithChildren } from "react";
import AppShell from "../appshell/AppShell";

export default function AdminLayout({ children }: PropsWithChildren) {
  return <AppShell>{children}</AppShell>;
}
