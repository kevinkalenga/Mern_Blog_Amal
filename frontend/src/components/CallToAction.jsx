import {Button} from 'flowbite-react'

export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border
         border-teal-500 justify-center items-center 
         rounded-tl-3xl rounded-br-3xl text-center'>
             <div className='flex-1 justify-center text-center flex flex-col'>
                 <h2 className='text-2xl'>Apprendre du Javascript</h2>
                 <p className='text-gray-500 my-2'>Verifie ces reources contenant 100 projet en js</p>
                 <Button rel='noopener noreferrer' gradientDuoTone='purpleTopink'target='_blank' className='rounded-tl-xl rounded-bl-none'>
                    <a href="#">100 Projets Javascript</a>
                 </Button>
             </div>
             <div className='flex-1 p-7'>
                <img src="https://tse2.mm.bing.net/th/id/OIP.Ss5YpIZYz3hZClTnOZiDkgHaEK?pid=Api&P=0&h=180"  />
             </div>
        </div>
    )
}