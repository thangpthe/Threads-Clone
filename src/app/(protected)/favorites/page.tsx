import Feed from '@/src/components/feed/Feed';
import Container from '@/src/components/layouts/Container'
import LoadingSpinner from '@/src/components/loading/LoadingSpinner'
import { getLikedPosts } from '@/src/server-actions/getLikedPosts'
import { Heart } from 'lucide-react';
import { Suspense } from 'react'

async function FavoriteContent(){
    const posts = await getLikedPosts();
    if(posts?.length === 0){
       return (
         <div className='flex flex-col items-center justify-center py-14 text-text-mute space-y-4'>
            <Heart size={36} className='mb-3 opacity-70'/>
            <p className='text-sm font-medium'>You have no favorite post</p>

        </div>
       )
    }
    return (
        <>
            {posts?.map((post) => {
                return <Feed key={post.id} post={post} action/>
            })}
        </>
    )
}
export default function FavoritePage() {
  return (
    <Container title="Favorites">
        <Suspense fallback={<LoadingSpinner/>}>
        <FavoriteContent/>
        </Suspense>
    </Container>
  )
}
