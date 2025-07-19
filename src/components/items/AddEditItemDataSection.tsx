/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import AddEditItemInput from './AddEditItemInput';
import AddEditItemSelectMenu from './AddEditItemSelectMenu';
import {
  cities,
  drivers,
  languages,
  nationalities,
  recipients,
  shippers,
  vehicles,
} from '../../lib/data';

const shipmentPages = ['addShipment', 'editShipment'];

const AddEditItemDataSection = React.memo(
  ({ title, inputs, value, onChange, section, page }: any) => {
    const selectMenuData: any = useMemo(() => {
      const getSelectedItem = (options: any, identifier: string) => {
        return options?.find((option: any) => option.id === value[`${identifier}Id`]) || null;
      };

      if (section) {
        const citiesData = {
          options: cities,
          title: 'المدينة',
        };

        switch (section) {
          case 'driver':
            return [
              {
                sectionPrefix: 'driver',
                options: drivers,
                label: 'اختر السائق',
                title: 'السائق',
                selectedItem: getSelectedItem(drivers, 'driver'),
              },
              {
                sectionPrefix: 'driverVehicle',
                options: vehicles,
                label: 'اختر نوع الشاحنة',
                title: 'الشاحنة',
                selectedItem: getSelectedItem(vehicles, 'driverVehicle'),
              },
            ];
          case 'shipment':
            return [
              {
                sectionPrefix: 'shipmentPickupCity',
                ...citiesData,
                label: 'اختر مدينة التحميل',
                selectedItem: getSelectedItem(cities, 'shipmentPickupCity'),
              },
              {
                sectionPrefix: 'shipmentDropOffCity',
                ...citiesData,
                label: 'اختر مدينة التسليم',
                selectedItem: getSelectedItem(cities, 'shipmentDropOffCity'),
              },
            ];

          case 'shipper':
            return {
              sectionPrefix: 'shipper',
              options: shippers,
              label: 'اختر المرسِل',
              title: 'المرسِل',
              selectedItem: getSelectedItem(shippers, 'shipper'),
            };

          case 'recipient':
            return {
              sectionPrefix: 'recipient',
              options: recipients,
              label: 'اختر المستلم',
              title: 'المستلم',
              selectedItem: getSelectedItem(recipients, 'recipient'),
            };
        }
      } else if (page && !shipmentPages.includes(page)) {
        const nationalitiesData = {
          identifier: 'nationality',
          options: nationalities,
          label: 'اختر جنسية المستخدم',
          title: 'الجنسية',
          selectedItem: getSelectedItem(nationalities, 'nationality'),
        };

        switch (page) {
          case 'addAdmin':
          case 'editAdmin':
            return {
              ...nationalitiesData,
            };
          case 'addDriver':
          case 'editDriver':
            return [
              {
                identifier: 'vehicle',
                options: vehicles,
                label: 'اختر نوع الشاحنة',
                title: 'الشاحنة',
                selectedItem: getSelectedItem(vehicles, 'vehicle'),
              },
              {
                ...nationalitiesData,
                label: 'اختر جنسية السائق',
              },
              {
                identifier: 'language',
                options: languages,
                label: 'اختر اللغة',
                title: 'اللغة',
                selectedItem: getSelectedItem(languages, 'language'),
              },
            ];
        }
      }
    }, [section, value, page]);

    const handleShipmentPageSectionSelectMenuItemSelection = (
      selectedItem: any,
      sectionSelectMenuDataItem: any,
    ) => {
      if (!selectedItem) return;

      const updates: any = {};
      const sectionPrefix = sectionSelectMenuDataItem?.sectionPrefix || section;

      updates[`${sectionPrefix}Id`] = selectedItem.id;

      Object.entries(selectedItem).forEach(([key, val]) => {
        if (key === 'id') return;
        const formFieldName = `${sectionPrefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        updates[formFieldName] = val;
      });

      onChange({
        target: {
          value: updates,
        },
      });
    };

    const handleItemPageSelectMenuItemSelection = (selectedItem: any, identifier: any) => {
      if (!selectedItem) return;
      onChange({
        target: {
          name: `${identifier}Id`,
          value: selectedItem?.id,
        },
      });
    };

    const renderedShipmentPageSectionSelectMenu = () => {
      if (section) {
        if (selectMenuData && Array.isArray(selectMenuData)) {
          return selectMenuData.map((item, index) => (
            <AddEditItemSelectMenu
              key={index}
              options={item?.options}
              label={item?.label}
              title={item?.title}
              onChange={(selectedItem) =>
                handleShipmentPageSectionSelectMenuItemSelection(selectedItem, item)
              }
              value={item?.selectedItem}
            />
          ));
        } else if (selectMenuData) {
          return (
            <AddEditItemSelectMenu
              options={selectMenuData?.options}
              label={selectMenuData?.label}
              title={selectMenuData?.title}
              onChange={(selectedItem) =>
                handleShipmentPageSectionSelectMenuItemSelection(selectedItem, selectMenuData)
              }
              value={selectMenuData?.selectedItem}
            />
          );
        }
      }
    };

    const renderedItemPageSelectMenu = () => {
      if (page && !shipmentPages.includes(page)) {
        if (selectMenuData && Array.isArray(selectMenuData)) {
          return selectMenuData.map((item, index) => (
            <AddEditItemSelectMenu
              key={index}
              options={item?.options}
              label={item?.label}
              title={item?.title}
              onChange={(selectedItem: any) =>
                handleItemPageSelectMenuItemSelection(selectedItem, item.identifier)
              }
              value={item?.selectedItem}
            />
          ));
        } else if (selectMenuData) {
          return (
            <AddEditItemSelectMenu
              options={selectMenuData?.options}
              label={selectMenuData?.label}
              title={selectMenuData?.title}
              onChange={(selectedItem: any) =>
                handleItemPageSelectMenuItemSelection(selectedItem, selectMenuData.identifier)
              }
              value={selectMenuData?.selectedItem}
            />
          );
        }
      }
    };

    return (
      <>
        {title && <h1 className='font-bold text-xl sm:text-2xl'>{title}</h1>}
        <div className='w-full grid gap-10 my-10 grid-cols-1 md:grid-cols-2'>
          {renderedShipmentPageSectionSelectMenu()}

          {inputs.map((input: any, index: any) => (
            <AddEditItemInput
              key={index}
              label={input.label}
              name={input.name}
              value={value[input.name]}
              onChange={onChange}
              description={input.description}
              type={input.type}
            />
          ))}
          {renderedItemPageSelectMenu()}
        </div>
      </>
    );
  },
);

export default AddEditItemDataSection;
