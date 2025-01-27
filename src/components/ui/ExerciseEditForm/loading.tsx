export default function ExerciseEditFormSkeleton() {
    return (
        <form className='w-full animate-pulse'>
            <div className='grid grid-cols-2 gap-4 w-full content-center items-center'>
                <div className='text-lg mr-5 h-6 bg-neutral-700 rounded-sm'></div>
                <div className='h-10 bg-neutral-700 rounded-sm'></div>

                <div className='text-lg mr-5 h-6 bg-neutral-700 rounded-sm'></div>
                <div className='inline-flex gap-5'>
                    {[1, 2].map((i) => (
                        <span key={i} className='inline-flex flex-row justify-center items-center'>
                            <div className='w-4 h-4 bg-neutral-700 rounded-full'></div>
                            <div className='ml-2 w-16 h-4 bg-neutral-700 rounded-sm'></div>
                        </span>
                    ))}
                </div>

                <div className='text-lg mr-5 h-6 bg-neutral-700 rounded-sm'></div>
                <div className='h-10 bg-neutral-700 rounded-sm'></div>

                <div className='text-lg mr-5 h-6 bg-neutral-700 rounded-sm'></div>
                <div className='h-10 bg-neutral-700 rounded-sm'></div>

                <div className='text-lg mr-5 h-6 bg-neutral-700 rounded-sm'></div>
                <div className='h-10 bg-neutral-700 rounded-sm'></div>
            </div>
        </form>
    )
}
