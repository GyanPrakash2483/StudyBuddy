export default function Button(props: {
    text: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <button className='w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md' onClick={props.onClick}>
            {props.text}
        </button>
    )
}