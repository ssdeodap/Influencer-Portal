import React from 'react';

interface TagSelectorProps {
  title: string;
  description: string;
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ title, description, options, selectedOptions, onSelectionChange }) => {
  const handleToggle = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      onSelectionChange(selectedOptions.filter(item => item !== option));
    } else {
      onSelectionChange([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-primary">{title}</label>
      <p className="text-sm text-brand-text-secondary mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => handleToggle(option)}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-all border
              ${selectedOptions.includes(option)
                ? 'bg-brand-primary-start text-white border-brand-primary-start'
                : 'bg-gray-100 text-brand-text-primary border-gray-200 hover:bg-gray-200'
              }`
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;