import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import Logo from '../public/assets/eksi-code-logo.png'
import { InferGetStaticPropsType } from 'next'
import UserMenu from './UserMenu'

type Data = {
    id: string;
    name: string;
    logo: string;
    members: string;
    link: string;
};

// export const getStaticProps = async () => {
//   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/telegrams');
//   const telegrams: Data = await res.json();

//   console.log(res);

//   return {
//     props: {
//       telegrams,
//     },
//   };
// };

const Nav =  () => {
// const Nav =  ({ telegrams }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [nav, setNav] = useState(false)

  // console.log(process.env.NEXT_PUBLIC_API_URL + '/telegrams');

  const handleNav=()=>{
    setNav(!nav)
  }
  return (
    <nav className="flex flex-wrap w-full justify-center z-10 font-eksifont sticky top-0 nav-sahdow bg-white">
      {/* Menu */}
      <div className="flex items-center sm:basis-full md:basis-full lg:basis-full basis-3/4 h-16 mx-10 sm:mx-4 justify-between">
        {/* Logo */}
        <div className="flex items-center w-1/3">
          <Link href="/">
            <a className="flex content-center">
              <Image 
                src={Logo}
                alt="eksi-code-logo"
                width="53"
                height="30">
              </Image>
            </a>
          </Link>
        </div>

        {/*  Search Console */}
        <div className="flex justify-center w-1/3 sm:w-full">
          <div className="relative text-gray-600 w-full">
            <input className="border-2 w-full border-gray-300 bg-white h-10 pl-2 pr-8 focus:ring-eksiCode focus:border-eksiCode rounded-lg text-sm focus:outline-none" name="search" placeholder="Ara..." required/>
            <button type="submit" className="absolute right-0 top-0 w-8 h-10">
              <AiOutlineSearch />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end w-1/3">
          {/*  Desktop menu */}
          <div className="flex flex-nowrap sm:hidden text-center md:text-sm lg:text-sm">
            <Link href="/uye-giris">
              <a className="p-2 ml-3 border border-white hover:border hover:border-eksiCode rounded-lg hover:text-eksiCode text-dark">Üye Girişi</a>
            </Link>
            <Link href="/uye-ol">
              <a className=" border rounded-lg p-2 ml-3 hover:bg-white hover:text-eksiCode bg-eksiCode text-gray-50">Üye Ol</a>
            </Link>
            <Link href="/bildirimler">
              <a className="inline-block relative mx-3 ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:text-eksiCode text-dark text-4xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-800 bg-eksiCode"></span>
              </a>
            </Link>
            <UserMenu />
          </div>

          {/*  Hamburger Menu Icon */}
          <div onClick={handleNav} className="sm:block hidden cursor-pointer">
            <AiOutlineMenu size={25} className="m-6 text-dark"/>
          </div>
        </div>
      </div>
      <hr className="h-1 w-full"></hr>
        <div className="flex items-center sm:basis-full basis-3/4 h-16 mx-10 sm:mx-4 justify-center">
          Telegram Grupları
        </div>
      
      {/*  Mobile menu */}
      <div className={nav ? "md:hidden fixed left-0 top-0 w-full h-full bg-dark/70": " "}>

        <div className={nav ? "fixed right-0 top-0 w-[75%] ease-in duration-500 xl:w-[35%] sm:w-[50%] md:w-[45%] h-full bg-menu":
                              "fixed right-[-100%] top-0 ease-in duration-500 h-full bg-menu"}>
                                
            <div className="flex w-full items-end justify-end">
              <div onClick={handleNav} className="rounded-full shadow-lg shadow-gray-400 p-2 mr-5 mt-5 cursor-pointer">
                <AiOutlineClose/>
              </div>
            </div>
            
            {/*  Mobile Menu */}
            <div className="flex flex-col items-end mt-5 mx-5 py-4 z-20 font-eksifont">
              Mobile Menu
              <div className="mt-20 flex items-center justify-around my-10 ml-2 w-full sm:w-[80%]">
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 text-eksi">
                  <FaGithub/>
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 text-eksi">
                  <FaTwitter/>
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 text-eksi">
                  <FaDiscord/>
                </div>
              </div>
            </div>

        </div>

      </div>

    </nav>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_API_URL + '/telegrams';
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await res.json();

  console.log('data' + data);

  return {
    props: {
      telegrams: data.telegrams,
    },
  };
}

export default Nav