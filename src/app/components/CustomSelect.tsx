import { useState, useRef, useEffect, useId, type KeyboardEvent } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface CustomSelectProps {
  id?: string;
  name: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  accentColor?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function CustomSelect({
  id: externalId,
  name,
  options,
  placeholder = "Select an option",
  defaultValue = "",
  disabled = false,
  accentColor = "#015AAA",
  className = "",
  onChange,
}: CustomSelectProps) {
  const generatedId = useId();
  const id = externalId || `select-${generatedId}`;
  const listboxId = `${id}-listbox`;

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync default value if it changes
  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectOption = (val: string) => {
    setSelectedValue(val);
    setIsOpen(false);
    onChange?.(val);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (e.key === "ArrowDown" || e.key === "Down") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === "ArrowUp" || e.key === "Up") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(options.length - 1);
      } else {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        const idx = options.indexOf(selectedValue);
        setFocusedIndex(idx >= 0 ? idx : 0);
      } else if (focusedIndex >= 0 && focusedIndex < options.length) {
        selectOption(options[focusedIndex]);
      }
    } else if (e.key === "Escape" || e.key === "Esc") {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    }
  };

  const selectedLabel = selectedValue || placeholder;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Hidden input for Formspree & FormData submission */}
      <input type="hidden" name={name} value={selectedValue} />

      <button
        id={id}
        type="button"
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={placeholder}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm outline-none transition-all flex items-center justify-between gap-2 text-left cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed ${
          isOpen
            ? "border-[#015AAA] ring-2 ring-[#015AAA]/15 shadow-sm"
            : "border-slate-200 hover:border-slate-300 focus:border-[#015AAA] focus:ring-2 focus:ring-[#015AAA]/15"
        }`}
      >
        <span
          className={`truncate ${
            selectedValue ? "text-slate-900 font-medium" : "text-slate-400"
          }`}
        >
          {selectedLabel}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#015AAA]" : ""
          }`}
        />
      </button>

      {/* Custom Dropdown Menu Panel */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 focus:outline-none"
          tabIndex={-1}
        >
          {options.map((option, idx) => {
            const isSelected = option === selectedValue;
            const isFocused = idx === focusedIndex;

            return (
              <div
                key={option}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setFocusedIndex(idx)}
                className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-[#015AAA] text-white font-semibold"
                    : isFocused
                    ? "bg-[#015AAA]/10 text-[#015AAA] font-medium"
                    : "text-slate-700 hover:bg-[#015AAA]/5 hover:text-[#015AAA]"
                }`}
              >
                <span className="truncate">{option}</span>
                {isSelected && <Check size={16} className="shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
