import searchIcon from '/images/search.svg';

const SearchInput = ({
  value,
  onChange,
  styles = '',
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: string;
}) => {
  return (
    <div
      dir='rtl'
      className={`relative flex items-center border border-gray-300 rounded-md py-3 px-10 w-full max-w-sm  ${styles}`}
    >
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder='ابحث هنا'
        className={`grow outline-none placeholder-gray-400 bg-transparent font-Rubik`}
      />
      <img
        src={searchIcon}
        alt='box Search icon'
        className='w-6 h-6 absolute right-2 cursor-pointer'
      />
    </div>
  );
};

export default SearchInput;
