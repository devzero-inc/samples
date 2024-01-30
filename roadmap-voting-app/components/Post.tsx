import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';

const Post = () => {
    return (
        <div className=" flex border border-cusBorder items-center h-44 bg-cusSec  text-white">
            <div className=" flex-2 flex flex-col items-center justify-around py-5 px-4 h-full">
                <div>
                    <WarningIcon />
                </div>
                <div className='flex flex-col items-center'>
                    <KeyboardArrowUpIcon className=' text-4xl' />
                    <KeyboardArrowDownIcon className=' text-4xl' />
                </div>
            </div>
            <hr className=' border border-cusBorder h-full' />
            <div className=" flex-1 h-full flex flex-col py-5 px-4 justify-between">
                <div>
                    <div className='flex items-center gap-2 mb-2'>
                        <p className=' bg-green-400 px-2 py-1 rounded-lg'>In Progress</p>
                        <p className=' font-bold text-lg'>Integrate Postgres</p>
                    </div>
                    <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia fugit necessitatibus explicabo et vel autem aliquam molestias consequuntur asperiores quia non, nulla harum.</p>
                </div>
                <p>Target Release: <span className='bg-custom-gradient px-2 py-1 rounded-lg'>May 2024</span></p>
            </div>
            <hr className=' border border-cusBorder h-full' />
            <div className=" flex-2 flex flex-col items-center justify-around py-5 px-4 h-full">
                <div>+69</div>
                <PollOutlinedIcon className=' text-3xl' />
            </div>
        </div>
    )
}

export default Post
