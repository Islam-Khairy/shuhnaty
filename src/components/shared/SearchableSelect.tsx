import { useState, useRef, useEffect } from 'react';

interface SelectMenuOption {
  id?: number | string;
  name?: string;
  [key: string]: unknown;
}

interface SearchableSelectProps {
  options?: SelectMenuOption[];
  label: string;
  title?: string;
  onChange: (selected: SelectMenuOption | null) => void;
  value: SelectMenuOption | null;
  disabled?: boolean;
}

const SearchableSelect = ({
  options = [],
  label,
  title,
  onChange,
  value,
  disabled = false,
}: SearchableSelectProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query === ''
    ? options
    : options.filter((opt) =>
        (opt.name ?? '').toLowerCase().includes(query.toLowerCase()),
      );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = value?.name ?? '';

  return (
    <div className='col-span-1 flex flex-col gap-1' ref={containerRef}>
      <span className='text-[#1A1A1A] text-sm'>{label}</span>
      <div className='relative'>
        <input
          type='text'
          placeholder={title ?? label}
          disabled={disabled}
          value={isOpen ? query : displayValue}
          onFocus={() => { setIsOpen(true); setQuery(''); }}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:opacity-50 disabled:cursor-not-allowed bg-white'
        />
        {isOpen && filtered.length > 0 && (
          <ul className='absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto'>
            {filtered.map((opt, idx) => (
              <li
                key={opt.id ?? idx}
                onMouseDown={() => {
                  onChange(opt);
                  setIsOpen(false);
                  setQuery('');
                }}
                className='px-3 py-2 text-sm cursor-pointer hover:bg-primary hover:text-white'
              >
                {idx + 1} - {opt.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
