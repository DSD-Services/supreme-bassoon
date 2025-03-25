"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type SearchFormProps = { initialQuery: string };

export const SearchForm = ({ initialQuery }: SearchFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term === "") {
      params.delete("q");
    } else {
      params.set("q", term);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        defaultValue={initialQuery}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};
