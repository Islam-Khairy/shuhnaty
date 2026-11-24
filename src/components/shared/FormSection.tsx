import FormInput from './FormInput';
import SearchableSelect from './SearchableSelect';

export interface SelectMenuConfig {
  sectionPrefix?: string;
  identifier?: string;
  options: any[];
  label: string;
  title: string;
  selectedItem: any;
}

interface FormSectionProps {
  title?: string;
  selectMenus?: SelectMenuConfig[];
  inputs: any;
  value: Record<string, any>;
  onChange: any;
}

const FormSection = ({ title, selectMenus = [], inputs, value, onChange }: FormSectionProps) => {
  const handleSelectMenuChange = (selectedItem: any, config: SelectMenuConfig) => {
    if (!selectedItem) return;

    if (config.sectionPrefix) {
      const updates: Record<string, any> = {};
      updates[`${config.sectionPrefix}Id`] = selectedItem.id;

      Object.entries(selectedItem).forEach(([key, val]) => {
        if (key === 'id') return;
        const formFieldName = `${config.sectionPrefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        updates[formFieldName] = val;
      });

      onChange({ target: { value: updates } });
    } else if (config.identifier) {
      onChange({ target: { name: `${config.identifier}Id`, value: selectedItem?.id } });
    }
  };

  return (
    <>
      {title && <h1 className='font-bold text-xl sm:text-2xl'>{title}</h1>}
      <div className='w-full grid gap-10 my-10 grid-cols-1 md:grid-cols-2'>
        {selectMenus.map((config, index) => (
          <SearchableSelect
            key={index}
            options={config.options}
            label={config.label}
            title={config.title}
            onChange={(selectedItem) => handleSelectMenuChange(selectedItem, config)}
            value={config.selectedItem}
          />
        ))}

        {inputs.map(
          (
            input: { label: string; name: string; type?: string; description?: string | string[] },
            index: number,
          ) => (
            <FormInput
              key={index}
              label={input.label}
              name={input.name}
              value={value[input.name]}
              onChange={onChange}
              description={input.description}
              type={input.type}
            />
          ),
        )}
      </div>
    </>
  );
};

export default FormSection;
