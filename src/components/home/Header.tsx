import { Link } from 'react-router-dom';
import { NAVLINKS, SVGS, type Navlinks } from '../../constants/home';
const Header = ({ auth }: { auth: boolean }) => {


  return(
    <>
    <header className='w-full p-4 bg-[#ebebeb] flex justify-between items-center' >
        <nav className='flex items-center gap-[2rem] '>
            <button className='flex  items-center justify-center'>
                {SVGS.bar}
            </button>
            {NAVLINKS.map((nav : Navlinks, index)=>(
                <>
                    <ul className='hidden items-center md:flex space-x-4' key={index} >
                        <li>
                            <Link to={nav.link}>
                                {nav.name}
                            </Link>
                        </li>
                    </ul>

                </>
            ))}
        </nav>

        <img src="/src/assets/images/logo.png" className='mx-auto hidden lg:flex h-[30px] w-[30px]' alt="logo" loading='lazy' />


        <div className='flex items-center justify-between  '>
            {/*Mobile*/}
           <div className='flex md:hidden items-center justify-between gap-2' >
               <button className='border-[6px] rounded-full p-2 border-[#272727]'>
                  {SVGS.cart}
               </button>

               {/*Use auth section */}
              {auth ? <button className=' rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]'>MO</button> : <button className=' rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]'>{SVGS.user}</button>}
           </div>

           {/*desktop and tabs*/}
           <div className='hidden md:flex items-center w-[300px] justify-between'>
               <button className=' rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]'>
                  {SVGS.like}
               </button>
               <div className='flex items-center'>
                   <div className='w-[80px] h-[50px] flex items-center justify-center p-2 text-white rounded-[22px] bg-[#272727]' >Cart</div>
                   <button className='border-[6px] -ml-1 rounded-full p-2 border-[#272727]'>
                      {SVGS.cart}
                   </button>
               </div>

                {/*Use auth section */}
               {auth ? <button className=' rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]'>MO</button> : <button className=' rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]'>{SVGS.user}</button>}

           </div>
        </div>


    </header>
    </>
  );
};
export default Header;
