import * as React from "react";
import { COUNTRY_ROWS } from "@libs/value-types";
import { ChevronDown, Check } from "lucide-react";
import { parsePhoneNumber, type CountryCode } from "libphonenumber-js";
import { cn } from "../../lib/utils";
import { axisAttrs } from "../../lib/axes";
import { positionClasses } from "../../lib/position";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import type { PhoneCountryOption, PhoneInputProps } from "./types";

// =============================================================================
// Helpers
// =============================================================================

/** Detect best-guess country from navigator.language, e.g. "pt-PT" → "PT". */
function detectCountryFromBrowser(
  options: PhoneCountryOption[],
  fallback: string,
): string {
  try {
    const lang =
      typeof navigator !== "undefined" ? navigator.language : "";
    const parts = lang.split("-");
    const region = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
    if (region && options.some((o) => o.code === region)) return region;
  } catch {
    // SSR or unavailable
  }
  return fallback;
}

/**
 * Try to parse a string (E.164 or any national format) using libphonenumber-js.
 * Returns { countryCode, localNumber } on success, null on failure.
 * `hint` is an ISO alpha-2 code used as the default country for national formats.
 */
function tryParse(
  raw: string,
  hint: string,
): { countryCode: string; localNumber: string } | null {
  try {
    const phone = parsePhoneNumber(raw, hint as CountryCode);
    if (phone && phone.country) {
      return { countryCode: phone.country, localNumber: phone.nationalNumber };
    }
  } catch {
    // not parseable — caller will handle
  }
  return null;
}

// =============================================================================
// Component
// =============================================================================

function PhoneInput({ position,
  value,
  onChange,
  countryOptions = COUNTRY_ROWS as unknown as PhoneCountryOption[],
  defaultCountryCode = "US",
  placeholder = "Phone number",
  disabled = false,
  id,
  className,
  onBlur,
  emphasis,
  status,
  state,
  scale,
  concept = "phone-input",
  ...rest
}: PhoneInputProps) {
  const fallbackCode = React.useMemo(
    () => detectCountryFromBrowser(countryOptions, defaultCountryCode),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [selectedCode, setSelectedCode] = React.useState<string>(() => {
    if (value) {
      const parsed = tryParse(value, fallbackCode);
      if (parsed) return parsed.countryCode;
    }
    return fallbackCode;
  });

  const [localNumber, setLocalNumber] = React.useState<string>(() => {
    if (value) {
      const parsed = tryParse(value, fallbackCode);
      if (parsed) return parsed.localNumber;
    }
    return "";
  });

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // Sync when controlled value changes externally
  React.useEffect(() => {
    if (!value) return;
    const parsed = tryParse(value, selectedCode);
    if (!parsed) return;
    setSelectedCode(parsed.countryCode);
    setLocalNumber(parsed.localNumber);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = countryOptions.find((o) => o.code === selectedCode);

  const emit = React.useCallback(
    (code: string, local: string) => {
      const country = countryOptions.find((o) => o.code === code);
      if (!country) return;
      const digits = local.replace(/\D/g, "");
      onChange?.(`+${country.dialingCode}${digits}`);
    },
    [countryOptions, onChange],
  );

  const handleCountrySelect = (code: string) => {
    setSelectedCode(code);
    setOpen(false);
    setQuery("");
    emit(code, localNumber);
  };

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // If the input looks like a formatted or international number, try smart parse.
    // Covers: "+1 (555) 234-5678", "(555) 234-5678", "555-234-5678", etc.
    const looksFormatted = raw.startsWith("+") || /[\s\-().]/.test(raw);
    if (looksFormatted) {
      const parsed = tryParse(raw, selectedCode);
      if (parsed) {
        setSelectedCode(parsed.countryCode);
        setLocalNumber(parsed.localNumber);
        emit(parsed.countryCode, parsed.localNumber);
        return;
      }
    }

    setLocalNumber(raw);
    emit(selectedCode, raw);
  };

  const filtered = React.useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return countryOptions;
    // Strip leading "+" so users can search "+1" and find US/Canada naturally
    const q = raw.startsWith("+") ? raw.slice(1) : raw;
    return countryOptions.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.dialingCode.startsWith(q) ||
        o.code.toLowerCase().includes(q),
    );
  }, [query, countryOptions]);

  return (
    <div
      element="field--phone-input"
      {...axisAttrs({ emphasis, status, scale, concept, state: disabled ? "disabled" : state, position })}
      className={cn("flex items-center", className, positionClasses(position))}
      {...rest}
    >
      {/* Country picker trigger */}
      <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Select country"
            data-part="phone-country"
            className="flex shrink-0 items-center gap-1 disabled:pointer-events-none"
          >
            <span className="text-base leading-none">{selected?.flag ?? "🌐"}</span>
            <span element="type--body-small">+{selected?.dialingCode}</span>
            <ChevronDown className="size-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 p-0">
          <Command shouldFilter={false}>
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search country…"
            />
            <CommandList>
              <CommandEmpty>No country found</CommandEmpty>
              <CommandGroup>
                {filtered.map((opt) => (
                  <CommandItem
                    key={opt.code}
                    value={opt.code}
                    onSelect={() => handleCountrySelect(opt.code)}
                  >
                    <span className="mr-2">{opt.flag}</span>
                    <span className="flex-1">{opt.name}</span>
                    <span element="type--body-extra-small" emphasis="quiet">
                      +{opt.dialingCode}
                    </span>
                    {opt.code === selectedCode && (
                      <Check className="ml-2 size-3" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Local number input */}
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        value={localNumber}
        onChange={handleLocalChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className="min-w-0 flex-1 bg-transparent outline-none"
        aria-label="Phone number"
      />
    </div>
  );
}

export { PhoneInput };
