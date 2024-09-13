import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { getLocations, getPrice } from "@/price";
interface AddressAutocompleteProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  id,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const locations = getLocations();
    const filtered = locations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  }, [value]);

  return (
    <div className="relative">
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        list={`${id}-suggestions`}
        required
      />
      <datalist id={`${id}-suggestions`}>
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default AddressAutocomplete;
