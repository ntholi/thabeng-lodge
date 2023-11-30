"use client";
import React from "react";
import ReactPageScroller from "react-page-scroller";

export default function PageScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactPageScroller>{children}</ReactPageScroller>;
}
