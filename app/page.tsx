import Exercise from "./components/Exercise/Exercise";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] min-h-screen gap-16 p-6">
            <section>
                <h2>Squat & Push</h2>
                <div>
                    <h3 className='mt-4'>Breathing</h3>
                    <div className='flex flex-wrap gap-4'>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                    </div>
                </div>
                <div>
                    <h3 className='mt-4'>Breathing</h3>
                    <div className='flex flex-wrap gap-4'>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                    </div>
                </div>
                <div>
                    <h3 className='mt-4'>Breathing</h3>
                    <div className='flex flex-wrap gap-4'>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                        <Exercise/>
                    </div>
                </div>
            </section>

        </div>
    );
}
