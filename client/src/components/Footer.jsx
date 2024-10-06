import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-green-500 bg-white'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-green-600'
            >
              <span className='px-2 py-1 bg-green-200 rounded-lg'>
                Agriculture
              </span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                >
                   Contact us
                </Footer.Link>
                <Footer.Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
              >
                 FQR
              </Footer.Link>

              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-t border-green-400 mt-4" />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Hasna Lakhel"
            year={new Date().getFullYear()}
            className="text-green-600"
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook} className="text-green-600"/>
            <Footer.Icon href='#' icon={BsInstagram} className="text-green-600"/>
            <Footer.Icon href='#' icon={BsTwitter} className="text-green-600"/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
