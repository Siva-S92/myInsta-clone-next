import React from 'react'
import Posts from './Posts'
import MiniProfile from './MiniProfile'

export default function Feed() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto'>
        {/* posts left */}
        <section className='md:col-span-2'>
            <Posts/>
        </section>


        {/* Mini profile rightside */}
        <section className='hidden md:inline-grid md:col-span-1'>
            <MiniProfile/>
        </section>
    </main>
  )
}
