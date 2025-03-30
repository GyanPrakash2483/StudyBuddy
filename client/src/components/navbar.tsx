export default function Navbar() {
    return (
        <div className="flex items-center justify-between">
            <img className='w-50 p-6' src='/assets/logo.png' alt='logo' />
            <nav className='flex gap-18'>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href='/'>Contact</a>
            </nav>
            <div className='p-6 cursor-pointer'>
                Login
            </div>
        </div>
    )
}