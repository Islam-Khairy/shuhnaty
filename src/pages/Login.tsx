import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiLock } from 'react-icons/ci';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import logo from '/images/truck-Logo.svg';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <div className='grid grid-rows-[1fr_auto] w-screen h-screen'>
        <div className='flex justify-center items-center'>
          <div className='w-full max-w-lg shadow-2xl border bg-[#FCFCFC] mx-2 md:mx-0 px-8 py-6 rounded-xl'>
            <div className='flex justify-center items-center mb-4'>
              <img
                src={logo}
                alt='logo'
                className='w-24 h-24'
              />
            </div>
            <h1 className='my-6 text-center font-medium text-xl'>الدخول للحساب</h1>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col items-start gap-1'
            >
              <label
                htmlFor='userName'
                className='text-[#333333] text-sm'
              >
                اسم المستخدم
              </label>
              <div className='relative w-full mb-6'>
                <input
                  id='userName'
                  dir='rtl'
                  className='border border-gray-200 w-full rounded-md py-2 ps-10 focus:outline-none font-Rubik'
                  placeholder='أدخل اسم المستخدم'
                />
                <CgProfile
                  size={20}
                  color='#666666'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 '
                />
              </div>
              <label
                htmlFor='password'
                className='text-[#333333] text-sm'
              >
                كلمة المرور
              </label>
              <div className='relative w-full mb-4'>
                <input
                  id='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  dir='rtl'
                  className='border border-gray-200 w-full rounded-md py-2 ps-10 focus:outline-none font-Rubik'
                  placeholder='أدخل كلمة المرور'
                />
                <CiLock
                  size={20}
                  color='#666666'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2'
                />
                <button
                  type='button'
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className='absolute left-4 top-1/2 transform -translate-y-1/2'
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? (
                    <IoEyeOffOutline
                      size={20}
                      color='#666666'
                    />
                  ) : (
                    <IoEyeOutline
                      size={20}
                      color='#666666'
                    />
                  )}
                </button>
              </div>
              <span className='font-Rubik text-[#333333] text-sm'>
                هذه نسخة تجريبية، فقط قم بالضغط على زر تسجيل الدخول
              </span>
              <button className='w-full px-10 py-2 text-[#FCFCFC] font-thin bg-[#DD7E1F] rounded-lg mt-4'>
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
        <div className='py-6 w-full text-center'>
          <p className='text-gray-500 text-sm font-Rubik'>
            © {new Date().getFullYear()} Shuhnaty Dashboard Demo by{' '}
            <a
              target='_blank'
              href='https://www.linkedin.com/in/islam-khairy-364793307/'
              className='text-[#DD7E1F] hover:underline'
            >
              Islam Khairy
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
