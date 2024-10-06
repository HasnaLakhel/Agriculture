import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);



  const sellNft = [
    {

      title: "M'informer",
      desc: "Constituer mon dossier de demande de subvention du FDA!",

    },
    {
      title: "Saisir ma demande ",
      desc: " Effectuer ma démarche en ligne pour la demande préalable ou pour la demande de subvention.",
    },
    {
      title: "Suivi",
      desc: " Suivre le traitement de mon dossier de demande de subvention du FDA",
    },
  ];



  return (
    <div className='bg-[#FCF8F1] bg-opacity-30'>
      <div className='hero'>
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h1 className="mt-4 mb-8 mr-6 text-3xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-7xl">
                  Le Fonds de Développement Agricole
                </h1>
                <p className="mt-4 mb-8 text-base text-black lg:mt-8 sm:text-xl">
                  Le FDA vous aide dans la réalisation de vos projets
                </p>
                <a href="#" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-green-300 rounded-full lg:mt-16 hover:bg-green-500 focus:bg-green-400" role="button">
                Connectons-nous
                </a>
              </div>
              <div className=''>
                <img
                  className="w-full"
                  src="https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?cs=srgb&dl=pexels-alejandro-barr%C3%B3n-96715.jpg&fm=jpg&_gl=1*m2v9qe*_ga*MTU0NDIxODI4Mi4xNzExNTQ3NDM4*_ga_8JE65Q40S6*MTcxMTU0NzQzNy4xLjEuMTcxMTU0NzUwMi4wLjAuMA.."
                  alt="programming"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
  
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12'>
        <div className='services'>
          <div className="items-center flex flex-col gap-9">
            <div className="font-Cormorant text-[25px] sm:text-5xl font-bold leading-[58px]">
              Nos services en ligne
            </div>
            <span className="font-Cormorant text-[25px] sm:text-2xl font-bold leading-[58px]">Pour toutes les étapes de la demande </span>
            <div className="cursor-pointer flex flex-wrap justify-center gap-10 xl:gap-[84px] px-[4%] lg:px-0">
              {sellNft.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="px-[17px] hover:border-1 duration-1000 hover:shadow-pupularCard w-full lg:max-w-[280px] xl:max-w-[337px] pb-[2%] max-h-fit bg-[#7dee79] border-[4px] border-[#049b43] rounded-[28px] flex flex-col gap-2.5 items-center justify-center"
                  >
                    <div className="max-w-[200px]">
                    </div>
                    <div className="whitespace-nowrap font-Cormorant text-[23px] sm:text-4xl md:text-[26px] lg:text-3xl font-semibold leading-[44px]">
                      {data.title}
                    </div>
                    <div className="font-montserrat text-[15px] text-center md:text-[22px] lg:text-base md:leading-[25px] font-normal leading-5 tracking-[0.03em]">
                      {data.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  
        <div className='post'>
          <div className='items-center flex flex-col gap-6'>
            {posts && posts.length > 0 && (
              <>
                <div className="font-Cormorant text-[25px] sm:text-5xl font-bold leading-[58px]">
                  Actualités
                </div>
                <div className='flex flex-wrap gap-9'>
                  {posts.slice(0, 3).map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
                <Link
                  to={'/search'}
                  className='text-lg text-teal-500 hover:underline text-center my-5' >  Afficher tous les Article
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );  
} 