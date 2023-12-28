'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  // useSearchParam allow you to access params in the URL.
  // For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // useRouter for smoother, client-side transitions.
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    // URLSearchParams is a Web API that provides methods for manipulating the URL query parameters.
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    // set the params string based on the user’s input. If the input is empty, you want to delete it.
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // updates the URL with the user's search data. For example, /dashboard/invoices?query=lee if the user searches for "Lee".
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      {/* Hint: If you're using state to manage the value of an input, you'd use the `value` attribute instead of `defaultValue` to make it a controlled component */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        // To ensure the input field is in sync with the URL
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
