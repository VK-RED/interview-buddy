import Link from 'next/link'

export default function Interview(){

    return(
        <div>
                <div className="flex flex-col justify-center h-screen w-screen items-center">

                    <div className="font-bold text-6xl my-4">
                        Welcome to Interview Buddy 
                    </div>

                    <div className="my-3">

                        <Link href="/interview">
                            <button className="h-auto w-auto py-3 bg-white text-black font-semibold rounded-full px-10">Let's Get Started</button>
                        </Link>
                        
                    </div>

                </div>

                

        </div>
    )
}



