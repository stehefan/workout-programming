import React from 'react'

const Loading = () => {

    return (
        <section>
            <div className="h-10 w-3/4 bg-neutral-700 rounded animate-pulse mb-6"></div>
            {[...Array(2)].map((_, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                    <div className="h-6 w-1/2 bg-neutral-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-1/4 bg-neutral-700 rounded animate-pulse mb-4"></div>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] justify-items-center gap-4">
                        {[...Array(3)].map((_, exerciseIndex) => (
                            <div key={exerciseIndex} className='h-[32rem] border border-neutral-700 animate-pulse rounded-lg p-4'>
                                <div key={exerciseIndex} className="h-40 bg-neutral-700 rounded animate-pulse"></div>
                                <div className="h-4 w-1/2 bg-neutral-700 rounded animate-pulse mt-2"></div>
                                <div className="h-2 w-1/3 bg-neutral-700 rounded animate-pulse mt-2"></div>
                                <div className="h-28 w-full bg-inherit mt-2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>)
}

export default Loading
