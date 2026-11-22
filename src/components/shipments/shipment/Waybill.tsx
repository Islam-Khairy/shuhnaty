import { QRCodeSVG } from 'qrcode.react';
import WaybillInfoRow from './WaybillInfoRow';
import { Shipment } from '../../../types/shipments';
import { Driver } from '../../../types/drivers';
import { Shipper } from '../../../types/shippers';
import { Recipient } from '../../../types/recipients';

const Waybill = ({
  shipment,
  driver,
  shipper,
  recipient,
}: {
  shipment: Shipment;
  driver: Driver;
  shipper: Shipper;
  recipient: Recipient;
}) => {
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
      <div className='flex xs:flex-col xs:items-center gap-4 md:gap-0 xs:text-center text-left justify-between'>
        <div className='font-light'>
          <div className='font-bold'>AL Jeed Transportation</div>
          <div>
            <span>Jeddah</span> Branch
          </div>
          <div>
            <span>C.R</span> 4030172574
          </div>
          <span className='hidden sm:block'>date: {shipment.pickupDate}</span>
        </div>
        <img
          src='/images/truck-Logo.svg'
          alt='logo'
          className='w-24 mx-auto'
        />
        <div className='font-Almarai xs:text-center text-right'>
          <div className='font-bold'>مؤسسة الجيد للنقليات</div>
          <div>
            فرع <span>جدة</span>
          </div>
          <div>
            س ت: <span>4030172574</span>
          </div>
          <div className='mt-2 px-2 py-1 rounded-lg bg-primary text-[#FCFCFC] w-fit mx-auto hidden sm:block'>
            <span>رقم الشحنة: </span> <span>{shipment.trackingNumber}</span>
          </div>
        </div>
      </div>
      <hr className='border-0 border-t-2 border-solid border-[#666] mt-2 mb-6' />
      <div className='text-center font-Almarai font-bold text-lg mb-4'>كشف تحميل شاحنة</div>

      <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6'>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>بيانات الشاحنة</div>
            {vehicleDetails.map(
              (row: { value: string; label?: string | undefined }, index: number) => (
                <div key={index}>
                  <WaybillInfoRow
                    label={row.label || '-'}
                    value={row.value}
                  />
                </div>
              ),
            )}
          </div>
          <div className='col-span-1'>
            <div className='font-Almarai font-bold text-lg mb-1'>بيانات السائق</div>
            {driverDetails.map((row: { value: string; label: string }, index: number) => (
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
            {recipientDetails.map((row: { value: string; label: string }, index: number) => (
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
            {shipperDetails.map((row: { value: string; label: string }, index: number) => (
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
        <div className='col-span-2'>
          <div className='font-Almarai font-bold text-lg mb-1'>تفاصيل الشحنة</div>
          {shipmentDetails.map((row: any, index: number) => (
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
          <p className='text-center whitespace-nowrap overflow-hidden text-ellipsis'>
            توقيع الموظف
          </p>
          <hr className='border-0 border-t-2 border-dashed border-[#666] mt-6' />
        </div>
        <div className='col-span-1 text-center'>
          <div className='border-2 border-primary p-1 w-fit m-auto'>
            <QRCodeSVG
              value={`https://shuhnaty.vercel.app/shipments/${shipment.id}`}
              size={50}
              bgColor='#ffffff'
              fgColor='#212121'
              level='H'
            />
          </div>
        </div>
        <div className='col-span-1'>
          <p className='text-center whitespace-nowrap overflow-hidden text-ellipsis'>
            توقيع السائق
          </p>
          <hr className='border-0 border-t-2 border-dashed border-[#666] mt-6' />
        </div>
      </div>
    </div>
  );
};

export default Waybill;
