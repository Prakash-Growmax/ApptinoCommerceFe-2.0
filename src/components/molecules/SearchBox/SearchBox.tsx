import { Fragment, useState } from 'react';
import { isMobile } from 'react-device-detect';

// assuming you're using `cn` from shadcn or a utility function
import { Search, X } from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { SearchTypes } from './search.types';

const SearchBox = ({
  searchTextValue,
  handleSearch,
  handleSearchClear,
  searchPlaceholder = 'Search',
}: SearchTypes) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Fragment>
      {/* Desktop View */}
      {!isMobile && (
        <div className="w-1/3">
          <div className="relative">
            <Input
              type="text"
              value={searchTextValue}
              onChange={e => handleSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              {searchTextValue ? (
                <ShadCnButton
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchClear}
                >
                  <X size={16} color="black" />
                </ShadCnButton>
              ) : (
                <Search color="black" size={16} strokeWidth={2} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile View */}
      {isMobile && (
        <div
          className={cn(
            'fixed top-2 left-2 right-2 z-50 bg-white px-2 py-2 rounded-md shadow-md',
            !showSearch && 'w-fit flex justify-end'
          )}
        >
          {showSearch ? (
            <div className="flex items-center gap-2 w-full">
              <Input
                type="text"
                value={searchTextValue}
                onChange={e => handleSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1"
              />
              <ShadCnButton
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowSearch(false);
                  handleSearchClear();
                }}
              >
                <X size={16} color="black" />
              </ShadCnButton>
            </div>
          ) : (
            <ShadCnButton
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(true)}
            >
              <Search color="blue" size={16} strokeWidth={2} />
            </ShadCnButton>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default SearchBox;
