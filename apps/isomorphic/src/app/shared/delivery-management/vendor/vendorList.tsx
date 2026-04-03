import cn from '@core/utils/class-names';
import React from 'react';
import { Text } from 'rizzui/typography';
import { Tooltip } from 'rizzui/tooltip';
import { Button } from 'rizzui/button';
import { BsExclamationCircle } from 'react-icons/bs';
import { Input } from 'rizzui/input';
import { ActionIcon } from 'rizzui/index';
import { PiMagnifyingGlassBold, PiXBold } from 'react-icons/pi';

const VendorList = ({
  className,
  vendors,
  values,
  setValues,
}: {
  className?: string;
  vendors: any[];
  values: string;
  setValues: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isSearchOpen, setSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className={cn('space-y-6', className)}>
      <div className="h-full overflow-y-scroll">
        {/* <div className="block"> */}
        <div className="relative flex items-center justify-between p-3">
          <Text className="font-inter text-[18px] font-semibold">Vendors</Text>

          <FilterOptionSearch
            title={'Vendors'}
            isSearchOpen={isSearchOpen}
            setSearchOpen={setSearchOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="flex flex-col space-y-2 pt-5">
          {vendors?.map((item: any) => {
            const value = item._id;
            const isSelected = values === value;

            return (
              <div
                key={item._id}
                onClick={() => {
                  setValues(item._id);
                }}
                className={`cursor-pointer px-3 py-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-l-4 border-black bg-gray-200 pl-2 font-semibold text-black'
                    : 'hover:bg-gray-100'
                  // isSelected
                  //   ? 'border-l-4 border-blue-500 bg-blue-50 pl-2 font-medium text-blue-600'
                  //   : 'hover:bg-gray-100'
                } `}
              >
                <FilterOption
                  name={item.name}
                  count={item.count}
                  {...(item?.tooltipText && { tooltipText: item.tooltipText })}
                  {...(item?.color && { color: item.color })}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorList;

type FilterOptions = {
  name: string;
  count?: string | number;
  color?: string;
  tooltipText?: string;
};

function FilterOption({ name, count, color, tooltipText }: FilterOptions) {
  return (
    <div className="flex items-center justify-between">
      <div className="relative flex shrink-0 items-center">
        {color ? (
          <span
            className="me-1.5 block h-4 w-4 rounded-full"
            style={{ backgroundColor: color }}
          />
        ) : null}

        {name}

        {tooltipText && (
          <Tooltip
            content={
              <p className="max-w-[100px] xs:max-w-[160px]">{tooltipText}</p>
            }
            placement="right"
          >
            <Button variant="text" className="ms-1.5 h-4 p-0">
              <BsExclamationCircle className="h-4 w-4" />
            </Button>
          </Tooltip>
        )}
      </div>

      {String(count) ? (
        <span className="text-xs opacity-80">{count}</span>
      ) : null}
    </div>
  );
}

type FilterOptionSearchProps = {
  title: string;
  isSearchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

function FilterOptionSearch({
  isSearchOpen,
  searchTerm,
  title,
  setSearchTerm,
  setSearchOpen,
}: FilterOptionSearchProps) {
  return (
    <div
      className={cn(
        'absolute end-0 z-10 flex w-full',
        isSearchOpen ? 'top-2' : '-left-1 top-2'
      )}
    >
      {isSearchOpen && (
        <Input
          type="search"
          size="sm"
          rounded="pill"
          value={searchTerm}
          onClear={() => setSearchTerm('')}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={`Search for ${title.toLowerCase()}...`}
          inputClassName="ps-3 pe-9 bg-background"
          className="w-full"
        />
      )}

      <ActionIcon
        size="sm"
        variant={isSearchOpen ? 'text' : 'flat'}
        rounded="full"
        className={cn(
          'absolute z-10 bg-opacity-95 backdrop-blur-lg transition-none',
          isSearchOpen ? 'end-1.5' : 'end-0'
        )}
        onClick={() => {
          setSearchOpen(!isSearchOpen);
          setSearchTerm('');
        }}
      >
        {isSearchOpen ? (
          <PiXBold
            aria-label="search"
            aria-labelledby="search"
            name="search"
            title="search"
            className="h-auto w-4"
          />
        ) : (
          <PiMagnifyingGlassBold
            aria-label="search"
            aria-labelledby="search"
            name="search"
            title="search"
            className="h-auto"
          />
        )}
      </ActionIcon>
    </div>
  );
}

{
  /* <div className="flex flex-col pt-5">
          <CheckboxGroup
            values={values}
            setValues={setValues}
            onChange={(e) => handleOnChange(e)}
            className="space-y-3.5"
          >
            {vendors?.map((item: any) => (
              <Checkbox
                // key={`${item.name}-key-${item.id}`}
                key={item._id}
                label={
                  <FilterOption
                    name={item.name}
                    count={item.count}
                    {...(item?.tooltipText && {
                      tooltipText: item.tooltipText,
                    })}
                    {...(item?.color && { color: item.color })}
                  />
                }
                labelClassName="w-full"
                name={item.name.toLowerCase()}
                value={generateSlug(item.name)}
              />
            ))}
          </CheckboxGroup>
        </div> */
}
{
  /* </div> */
}
