import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

function Footer() {
  const { language, translations } = useLanguage();
  const texts = translations[language].footer;

  return (
    <footer className='bg-[#F0F4F9] rounded-lg m-0 dark:bg-[#1E1F20] border-gray-200 fixed bottom-0 left-0 right-0 w-full'>
      <div className='mx-auto max-w-screen-xl p-4'>
        {/* Mostrar solo en dispositivos móviles (xs y sm) */}
        <div className='block xs:hidden text-center'>
          <span className='text-sm text-gray-500 dark:text-gray-400 block mb-2'>
            {texts.copyright1}<Link to='/copyright' className='hover:underline'>{texts.copyright2}</Link>{texts.copyright3}
          </span>
        </div>
        {/* Mostrar solo en dispositivos móviles (md, lg, xl y 2xl) */}
        <div className='block text-center'>
          <span className='text-sm text-gray-500 dark:text-gray-400 block mb-2'>
            {texts.copyright1}<Link to='/copyright' className='hover:underline'>{texts.copyright2}</Link>{texts.copyright3}
          </span>
        </div>
        {/* Mostrar solo en dispositivos mayores a móviles (md, lg, xl, 2xl) */}
        <ul className='hidden sm:flex flex-wrap justify-center items-center text-sm font-medium text-gray-500 dark:text-gray-400'>
          <li className='mx-2 md:mx-4 mb-2'>
            <Link className='hover:underline' to='/about-us'>{texts.aboutUs}</Link>
          </li>
          <li className='mx-2 md:mx-4 mb-2'>
            <Link className='hover:underline' to='/privacy-policy'>{texts.privacyPolicy}</Link>
          </li>
          <li className='mx-2 md:mx-4 mb-2'>
            <Link className='hover:underline' to='/license'>{texts.license}</Link>
          </li>
          <li className='mx-2 md:mx-4 mb-2'>
            <Link className='hover:underline' to='/contact-us'>{texts.contactUs}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
