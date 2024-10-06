import { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';


const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2 bg-white dark:bg-green-800'>
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-green-800 dark:text-white'>
        <span className='px- py-1 bg-gradient-to-r from-green-500 to-green-300 rounded-lg text-white'>Agriculture</span>
      </Link>

      <Button className='w-12 h-10 lg:hidden' color="green" pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
       
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout} >Sign out</Dropdown.Item>
          </Dropdown>

        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='greenToBlue' outline>
              sign-in
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === '/'} as={'div'} >
          <Link to='/' className='text-green-500  hover:text-green-900 dark:text-white'>
            Accueil
          </Link>
        </NavbarLink>

        <NavbarLink active={path === '/search'} as={'div'}>
          <Link to='/search' className='text-green-500  hover:text-green-900 dark:text-white'>
          Actualités
          </Link>
        </NavbarLink>
        <NavbarLink active={path === '/application'} as={'div'}>
          <Link to='/application' className='text-green-500  hover:text-green-900 dark:text-white'>
            Subvention
          </Link>
        </NavbarLink>

        <NavbarLink active={path === '/contact'} as={'div'}>
          <Link to='/contact' className='text-green-500  hover:text-green-900 dark:text-white'>
            contact
          </Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header;
