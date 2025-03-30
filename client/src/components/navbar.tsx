export default function Navbar() {
    return (
        <div className="flex items-center justify-between text-white">
            <img className='w-50 p-6' src='/assets/logo-dark.png' alt='logo' />
            <nav className='flex gap-18'>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href='/'>Contact</a>
            </nav>
            <div className='p-6 cursor-pointer'>
                <a href='/login'>Login</a>
            </div>
        </div>
    )
}