import { useState, useMemo, useRef, useEffect, forwardRef } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import countries from "world-countries";

interface CountryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  placeholder?: string;
  name?: string;
}

const CountryCombobox = forwardRef<HTMLButtonElement, CountryComboboxProps>(
  (
    {
      value,
      onChange,
      onBlur,
      error,
      placeholder = "-- Select Country/Region --",
      name,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Transform countries data for better performance
    const countryOptions = useMemo(() => {
      return countries
        .map((country) => ({
          value: country.cca2,
          label: country.name.common,
          flag: country.flag,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    // Filter countries based on search
    const filteredCountries = useMemo(() => {
      if (!search) return countryOptions;
      const searchLower = search.toLowerCase();
      return countryOptions.filter((country) =>
        country.label.toLowerCase().includes(searchLower)
      );
    }, [search, countryOptions]);

    // Get selected country
    const selectedCountry = useMemo(() => {
      return countryOptions.find((c) => c.value === value);
    }, [value, countryOptions]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
          if (onBlur) onBlur();
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [open, onBlur]);

    // Focus input when opening
    useEffect(() => {
      if (open && inputRef.current) {
        inputRef.current.focus();
      }
    }, [open]);

    const handleSelect = (countryValue: string) => {
      onChange(countryValue);
      setOpen(false);
      setSearch("");
      if (onBlur) onBlur();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange("");
      setSearch("");
    };

    return (
      <div ref={containerRef} className="relative w-full">
        {/* Trigger Button - styled to match your form inputs */}
        <button
          ref={ref}
          type="button"
          name={name}
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between gap-2 px-3 py-3 bg-grey border ${
            error ? "border-red-500" : "border-[#dfdfdf]"
          } text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
        >
          <span className="flex items-center gap-2 truncate">
            {selectedCountry ? (
              <>
                <span className="text-base">{selectedCountry.flag}</span>
                <span className="text-text-grey">{selectedCountry.label}</span>
              </>
            ) : (
              <span className="text-text-grey">{placeholder}</span>
            )}
          </span>
          <div className="flex items-center gap-1">
            {selectedCountry && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[#dfdfdf] shadow-lg">
            {/* Search Input */}
            <div className="p-2 border-b border-[#dfdfdf]">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full px-3 py-2 border border-[#dfdfdf] bg-grey focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Country List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.value}
                    type="button"
                    onClick={() => handleSelect(country.value)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-gray-100 transition-colors text-left ${
                      country.value === value ? "bg-blue-50" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-base">{country.flag}</span>
                      <span className="text-text-grey">{country.label}</span>
                    </span>
                    {country.value === value && (
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-8 text-center text-gray-500">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CountryCombobox.displayName = "CountryCombobox";

export default CountryCombobox;
