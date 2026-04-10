"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface Props {
  label: string;
  placeholder: string;
  onPlaceSelected: (address: string) => void;
  defaultValue?: string;
  iconColor?: string;
}

export default function AddressAutocomplete({ label, placeholder, onPlaceSelected, defaultValue = "", iconColor = "text-zinc-600" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current || autocompleteRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "fr" },
      fields: ["formatted_address", "place_id"],
      types: ["geocode", "establishment"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onPlaceSelected(place.formatted_address);
      }
    });

    autocompleteRef.current = autocomplete;
  }, [onPlaceSelected]);

  return (
    <div>
      <label className="text-sm text-zinc-500 mb-1 block">{label}</label>
      <div className="relative">
        <MapPin className={`absolute left-3 top-3 w-4 h-4 ${iconColor} pointer-events-none`} />
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          className="input-dark pl-10"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onBlur={() => {
            if (inputRef.current) {
              onPlaceSelected(inputRef.current.value);
            }
          }}
        />
      </div>
    </div>
  );
}
