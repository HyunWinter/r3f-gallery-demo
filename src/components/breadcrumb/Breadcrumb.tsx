import { Suspense } from 'react'

import {
  Breadcrumb as _Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'

interface BreadcrumbProps {
  navItems: { title: string; href: string }[]
}

export default function Breadcrumb({ navItems }: BreadcrumbProps) {
  return (
    <section className="section-container pb-[2.5rem]">
      <Suspense fallback={<div>Loading...</div>}>
        <_Breadcrumb>
          <BreadcrumbList className="text-base">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center justify-center gap-1.5 break-words text-neutral-500 sm:gap-2.5 dark:text-neutral-400 text-base"
              >
                <BreadcrumbItem className="h-full flex items-center justify-center">
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {index === navItems.length - 1 ? null : <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </_Breadcrumb>
      </Suspense>
    </section>
  )
}
