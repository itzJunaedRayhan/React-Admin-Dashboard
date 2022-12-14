import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' onClick={customFunc} style={{ color }} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span style={{ background: dotColor }} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { setActiveMenu, screenSize, setScreenSize, currentColor, isOpen, setIsOpen, isProfileOpen, setIsProfileOpen } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize])

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon={<AiOutlineMenu />} dotColor="" />
      <div className='flex'>
        <TooltipComponent content="Cart" position="BottomCenter">
          <button onClick={() => setIsOpen(true)} type='button' style={{ color: currentColor }} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
            <span className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
            {<FiShoppingCart />}
          </button>
        </TooltipComponent>
        <NavButton title="Chat" color={currentColor} icon={<BsChatLeft />} dotColor="#03C9D7" />
        <NavButton title="Notification" color={currentColor} icon={<RiNotification3Line />} dotColor="#03C9D7" />
        <TooltipComponent content="Profile" position='BottomCenter' >
          <div onClick={() => setIsProfileOpen(true)} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            <img className='rounded-full w-8 h-8' src={avatar} alt="Profile" />
            <p>
              <span className='text-gray-400 text-14'>Hi,</span>{' '} <span className='text-gray-400 font-bold ml-1 text-14'>Junaed</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 text-14' />
          </div>
        </TooltipComponent>
        {isOpen && <Cart />}
        {isProfileOpen && <UserProfile />}

      </div>
    </div>
  )
}

export default Navbar