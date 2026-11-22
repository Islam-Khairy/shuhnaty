import { ShipmentFormData } from '../../../types/shipments';
import FormSection from '../../shared/FormSection';
import NotesArea from './addShipmentInputs/NotesArea';
import PhoneNumberInput from './addShipmentInputs/phoneNumberInput/PhoneNumberInput';
import {
  shipperSectionSelectMenus,
  recipientSectionSelectMenus,
} from '../../../lib/data/selectMenuConfigs';

interface ShipperRecipientSectionProps {
  title: string;
  inputs: { label: string; name: string; type?: string }[];
  value: ShipmentFormData;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string | number | object } },
  ) => void;
  section: 'shipper' | 'recipient';
  mode?: 'add' | 'edit';
  existingNotes?: boolean;
}

const ShipperRecipientSection = ({
  title,
  inputs,
  value,
  onChange,
  section,
  mode = 'add',
  existingNotes,
}: ShipperRecipientSectionProps) => {
  const selectMenus =
    section === 'shipper' ? shipperSectionSelectMenus(value) : recipientSectionSelectMenus(value);

  const notesKey = section === 'shipper' ? 'shipperNotes' : 'recipientNotes';

  return (
    <div>
      <FormSection
        title={title}
        inputs={inputs}
        value={value}
        onChange={onChange}
        selectMenus={selectMenus}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-10'>
        {(['PrimaryPhoneNumber', 'SecondaryPhoneNumber'] as const).map((type, index) => (
          <PhoneNumberInput
            key={index}
            label={`رقم الهاتف (${type === 'PrimaryPhoneNumber' ? 'أساسي' : 'احتياطي'})`}
            value={value[`${section}${type}` as keyof ShipmentFormData] as string}
            onChange={(val: string) =>
              onChange({ target: { name: `${section}${type}`, value: val } })
            }
          />
        ))}
      </div>
      <NotesArea
        mode={mode}
        variant={section}
        value={value[notesKey]}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange({ target: { name: notesKey, value: e.target.value } })
        }
        existingNotes={existingNotes}
      />
      <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />
    </div>
  );
};

export default ShipperRecipientSection;
