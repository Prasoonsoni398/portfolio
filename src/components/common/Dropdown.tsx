"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption<T = string> {
  value: T;
  label: string;
  sublabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface DropdownProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
  id?: string;
}

export function Dropdown<T = string>({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  disabled = false,
  className = "",
  triggerClassName = "",
  menuClassName = "",
  size = "md",
  align = "left",
  id: customId
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const id = customId || autoId;

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: "py-1.5 px-2.5 text-xs rounded-lg min-h-[32px]",
    md: "py-2 px-3 text-xs rounded-xl min-h-[38px]",
    lg: "py-2.5 px-3.5 text-sm rounded-xl min-h-[44px]"
  }[size];

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[11px] font-semibold uppercase tracking-wider text-base-content/70 mb-1"
        >
          {label}
        </label>
      )}

      {/* Dropdown Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2 bg-base-100 border border-base-300 text-base-content font-medium transition-all cursor-pointer hover:border-primary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${
          isOpen ? "border-primary ring-1 ring-primary/20" : ""
        } ${triggerClassName}`}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <selectedOption.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : <span className="text-base-content/40">{placeholder}</span>}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-base-content/50 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute z-50 mt-1 w-full min-w-[160px] bg-base-100 border border-base-300 rounded-xl shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto no-scrollbar animate-in fade-in-0 zoom-in-95 duration-100 ${
            align === "right" ? "right-0" : "left-0"
          } ${menuClassName}`}
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-base-content/50 text-center">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              const Icon = option.icon;

              return (
                <button
                  key={String(option.value)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    isSelected
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-base-content hover:bg-base-200"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {Icon && <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-primary" : "text-base-content/60"}`} />}
                    <div className="truncate">
                      <div>{option.label}</div>
                      {option.sublabel && (
                        <div className="text-[10px] text-base-content/50 truncate font-normal">
                          {option.sublabel}
                        </div>
                      )}
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
