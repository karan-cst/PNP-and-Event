import { Title } from 'rizzui/typography';
import cn from '@core/utils/class-names';
import Breadcrumb from '@core/ui/breadcrumb';

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header
      className={cn('mb-6 @container xs:-mt-2 md:mt-4 lg:mb-3', className)}
    >
      <div className="flex items-center justify-between gap-4">
        {/* LEFT: Title + Breadcrumb */}
        <div className="flex min-w-0">
          <Title as="h2" className="text-[22px] lg:text-lg 4xl:text-[26px]">
            {title} <span className="ml-1">/</span>
          </Title>

          <Breadcrumb
            separator=""
            separatorVariant="circle"
            className="ml-3 flex-wrap"
          >
            {breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                {...(item?.href && { href: item.href })}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex flex-wrap items-center justify-end gap-4">
          {children}
        </div>
      </div>
    </header>
    // <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
    //   <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
    //     <div>
    //       <Title
    //         as="h2"
    //         className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
    //       >
    //         {title}
    //       </Title>

    //       <Breadcrumb
    //         separator=""
    //         separatorVariant="circle"
    //         className="flex-wrap"
    //       >
    //         {breadcrumb.map((item) => (
    //           <Breadcrumb.Item
    //             key={item.name}
    //             {...(item?.href && { href: item?.href })}
    //           >
    //             {item.name}
    //           </Breadcrumb.Item>
    //         ))}
    //       </Breadcrumb>
    //     </div>
    //     {children}
    //   </div>
    // </header>
  );
}
