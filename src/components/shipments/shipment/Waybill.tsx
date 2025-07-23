/* eslint-disable @typescript-eslint/no-explicit-any */

import { QRCodeSVG } from 'qrcode.react';
import { baseURL } from '../../../../config';
import WaybillInfoRow from './WaybillInfoRow';

const Waybill = ({ shipment, driver, shipper, recipient }: any) => {
  const driverDetails = [
    {
      value: 'الاسم',
      label: driver.name,
    },
    {
      value: 'رقم الهوية',
      label: driver.identityNumber,
    },
    {
      value: 'رقم الجوال',
      label: driver.phoneNumber,
    },
  ];

  const vehicleDetails = [
    {
      value: 'نوع الشاحنة',
      label: driver?.vehicle,
    },
    {
      value: 'رقم الشاحنة',
      label: driver.vehicleNumber,
    },
  ];

  const recipientDetails = [
    {
      value: 'الاسم',
      label: recipient.name,
    },
    {
      value: 'بيانات التواصل',
      label: recipient.primaryPhoneNumber,
    },
    {
      value: 'العنوان',
      label: recipient.address.slice(0, 25),
    },
  ];

  const shipperDetails = [
    {
      value: 'الاسم',
      label: shipper.name,
    },
    {
      value: 'بيانات التواصل',
      label: shipper.primaryPhoneNumber,
    },
    {
      value: 'الفرع',
      label: shipper.address,
    },
  ];

  // const shipmentCostDetails = [
  //   {
  //     value: 'التكلفة الأساسية',
  //     label: `${shipment.baseCost} ر.س`,
  //   },
  //   {
  //     value: 'الزيادة',
  //     label: `${shipment.extraCost} ر.س`,
  //   },
  //   {
  //     value: 'الخصم',
  //     label: `${shipment.deduct} ر.س`,
  //   },
  //   {
  //     value: 'عدد الليالي',
  //     label: `${shipment.stayedNights} ليلة`,
  //   },
  //   {
  //     value: 'تكلفة المبيت لليلة الواحدة',
  //     label: `${shipment.costPerNight} ر.س`,
  //   },
  //   {
  //     value: 'الإجمالي',
  //     label: `${shipment.total_cost} ر.س`,
  //   }
  // ];

  const shipmentDetails = [
    {
      value: 'من',
      label: shipment.pickupCity,
    },
    {
      value: 'إلى',
      label: shipment.dropOffCity,
    },
    {
      value: 'المحتويات',
      label: shipment.content,
    },
    {
      value: 'الوزن',
      label: shipment.weight,
    },
  ];

  return (
    <div
      id='waybill-printable'
      className='m-0 bg-[#fff] rounded-2xl p-4 font-Rubik text-[#1a1a1a] text-right'
    >
      <div className='flex gap-0 text-left flex-row justify-between items-start '>
        <div className='font-light'>
          <div className='font-bold'>AL Jeed Transportation</div>
          <div>
            <span>Jeddah</span> Branch
          </div>
          <div>
            <span>C.R</span> 4030172574
          </div>
          <div>
            <span>date:</span> {shipment.pickupDate}
          </div>
        </div>
        <div>
          <img
            src='/images/truck-Logo.svg'
            alt='logo'
            className='w-24'
          />
        </div>
        <div className='font-Almarai text-right'>
          <div className='font-bold'>مؤسسة الجيد للنقليات</div>
          <div>
            فرع <span>جدة</span>
          </div>
          <div>
            س ت: <span>4030172574</span>
          </div>
          <div className='mt-2 px-2 py-1 rounded-lg bg-[#DD7E1F] text-[#FCFCFC]'>
            <span>رقم الشحنة: </span> <span>{shipment.trackingNumber}</span>
          </div>
        </div>
      </div>
      <hr className='border-0 border-t-2 border-solid border-[#666] mt-2 mb-6' />
      <div className='text-center font-Almarai font-bold text-lg mb-6'>
        كشف تحميل شاحنة
        <div className='font-semibold text-base'>Truck Loading Sheet</div>
      </div>

      <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>بيانات الشاحنة</div>
            {vehicleDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow
                  label={row.label}
                  value={row.value}
                />
              </div>
            ))}
          </div>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>بيانات السائق</div>
            {driverDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow
                  label={row.label}
                  value={row.value}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 bg-[#F2F2F2] p-2 rounded-lg print-bg-gray'>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>بيانات المستلم</div>
            {recipientDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow
                  label={row.label}
                  value={row.value}
                />
              </div>
            ))}
          </div>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>بيانات المرسل</div>
            {shipperDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow
                  label={row.label}
                  value={row.value}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2'>
        {/* <div className='col-span-1'>
          <div className='font-Almarai font-bold text-lg mb-2'>تكلفة الشحنة</div>
          {shipmentCostDetails.map((row: any, index: any) => (
            <div key={index}>
              <WaybillInfoRow
                label={row.label}
                value={row.value}
              />
            </div>
          ))}
        </div> */}
        <div className='col-span-2'>
          <div className='font-Almarai font-bold text-lg mb-1'>تفاصيل الشحنة</div>
          {shipmentDetails.map((row: any, index: any) => (
            <div key={index}>
              <WaybillInfoRow
                label={row.label}
                value={row.value}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='mt-6 bg-[#FCF2E9] border-2 border-[#ffb678] rounded-lg p-2 text-sm'>
        <div>:ملاحظات</div>
        {[
          'يرجى التأكد من الشراع الثقيل',
          'يرجى تسليم الشحنة بموعد 2025/1/20',
          'تأكد من إرجاع جهاز الحرارة',
        ].map((item, index) => (
          <div key={index}>{item} -</div>
        ))}
      </div>

      <hr className='border-0 border-t-2 border-solid border-[#666] my-6' />
      <div className='text-center font-Almarai font-semibold text-lg'>إقرار سائق</div>
      <div className='text-sm text-[1A1A1A] mt-2'>
        أتعهد أنا السائق الموضح اسمي ورقم سيارتي أعلاه بأنني مستخدم عن كافة الأضرار التي تحدث
        للشحنة. كما أتعهد بتفقد الشحنة أثناء سيري، وأنني مستخدم عن إبلاغ المؤسسة بأسرع وسيلة ممكنة
        في حالة حدوث أي طارئ، وهذا إقرار مني بذلك.{' '}
      </div>

      <div className='w-full grid grid-cols-3 mt-6'>
        <div className='col-span-1'>
          <p className='text-center'>توقيع الموظف</p>
          <hr className='border-0 border-t-2 border-dashed border-[#666] mt-6' />
        </div>
        <div className='col-span-1 text-center'>
          <div className='border-2 border-[#DD7E1F] p-1 w-fit m-auto'>
            <QRCodeSVG
              value={`${baseURL}/shipments/${shipment.id}`}
              size={50}
              bgColor='#ffffff'
              fgColor='#212121'
              level='H'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <p className='text-center'>توقيع السائق</p>
          <hr className='border-0 border-t-2 border-dashed border-[#666] mt-6' />
        </div>
      </div>
    </div>
  );
};

export default Waybill;
