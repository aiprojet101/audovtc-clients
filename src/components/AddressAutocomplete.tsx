"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string, placeId?: string) => void;
  iconColor?: string;
}

export default function AddressAutocomplete({ label, placeholder, value, onChange, iconColor = "text-zinc-600" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current || autocompleteRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "fr" },
      fields: ["formatted_address", "place_id", "geometry"],
      types: ["geocode", "establishment"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address, place.place_id);
      }
    });

    autocompleteRef.current = autocomplete;
  }, [onChange]);

  return (
    <div>
      <label className="text-sm text-zinc-500 mb-1 block">{label}</label>
      <div className="relative">
        <MapPin className={`absolute left-3 top-3 w-4 h-4 ${iconColor}`} />
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          className="input-dark pl-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        />
      </div>
    </div>
  );
}
