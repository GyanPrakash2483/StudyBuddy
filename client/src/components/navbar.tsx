export default function Navbar() {
    return (
        <div className="flex items-center justify-between">
            <img className='w-50 p-6' src='/assets/logo.png' alt='logo' />
            <nav>
                <a href='/'>Home</a>
            </nav>
        </div>
    )
}