import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' color='green' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 mb-5 text-center font-serif text-green-600 max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link className='self-center mb-5' to={`/search?category=${post && post.category}`}>
        <Button color='green' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-5 mb-10 mx-auto w-full max-h-[300px] object-cover rounded-lg shadow-lg border border-green-500'
      />
      <div className='flex justify-between p-3 border-b border-gray-200 mx-auto w-full max-w-2xl text-sm bg-white'>
        <span className='text-gray-600'>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic text-gray-600'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className='p-3 max-w-2xl mx-auto w-full post-content prose lg:prose-lg bg-white'>
        {post && <div dangerouslySetInnerHTML={{ __html: post.content }} />}
      </div>

      

      <div className='flex flex-col justify-center items-center bg-white'>
      <h1 className='text-2xl mt-10 mb-5 font-bold text-green-600 uppercase border-b-2 border-green-600 pb-2'>Recent Articles</h1>
        <div className='flex flex-wrap gap-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
