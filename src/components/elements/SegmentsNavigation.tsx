"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { renderElements } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const formatSegment = (segment: string): string => {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const SegmentsNavigation = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isDynamicId = (value: string): boolean => {
    const patterns = [
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      /^[A-Za-z0-9_-]{20,}$/,
      /^c[0-9a-z]{24}$/,
      /^[0-9A-HJKMNP-TV-Z]{20,30}$/,
    ];

    return patterns.some((re) => re.test(value));
  };

  const staticSegments = segments.filter(
    (s) => !s.startsWith("[") && !isDynamicId(s),
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {renderElements({
          of: staticSegments,
          render: (segment, index) => {
            const href = "/" + staticSegments.slice(0, index + 1).join("/");
            const isLast = index === staticSegments.length - 1;
            const label = formatSegment(segment);
            return (
              <React.Fragment key={href}>
                {index !== 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          },
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
