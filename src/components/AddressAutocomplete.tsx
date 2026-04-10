"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";

interface Props {
  label: string;
  placeholder: string;
  onPlaceSelected: (address: string) => void;
  iconColor?: string;
}

interface Prediction {
  description: string;
  place_id: string;
}

export default function AddressAutocomplete({ label, placeholder, onPlaceSelected, iconColor = "text-zinc-600" }: Props) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: Event) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (value.length < 3) {
      setPredictions([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setPredictions(data);
        setShowDropdown(data.length > 0);
      } catch {
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function selectPrediction(pred: Prediction) {
    setQuery(pred.description);
    setPredictions([]);
    setShowDropdown(false);
    onPlaceSelected(pred.description);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <label className="text-sm text-zinc-500 mb-1 block">{label}</label>
      <div className="relative">
        <MapPin className={`absolute left-3 top-3 w-4 h-4 ${iconColor} pointer-events-none z-10`} />
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="input-dark pl-10"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => { if (predictions.length > 0) setShowDropdown(true); }}
        />
        {loading && <Loader2 className="absolute right-3 top-3 w-4 h-4 text-zinc-600 animate-spin" />}
      </div>

      {showDropdown && predictions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-[#141414] border border-[#262626] rounded-lg shadow-xl overflow-hidden">
          {predictions.map((pred) => (
            <button
              key={pred.place_id}
              type="button"
              className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-[#1A1A1A] hover:text-white border-b border-[#1A1A1A] last:border-0 transition"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectPrediction(pred)}
            >
              {pred.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
