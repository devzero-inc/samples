"use client";

import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import React, { useEffect } from 'react';

interface PostProps {
    title?: string,
    description?: string,
    status?: string,
    target?: string,
}

const Post: React.FC<PostProps> = ({ title, description, status, target }) => {

    const [displayDate, setDisplayDate] = React.useState<string>('');

    const getDate = (target: string): void => {
        const date = new Date(target);
        const formattedDate = date?.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric'
        });
        setDisplayDate(formattedDate);
    }

    useEffect(() => {
        if (target) {
            getDate(target);
        }
    }, [target])

    const getStatusColor = (status: string): string => {
        console.log(status);
        switch (status) {
            case 'In Progress':
                return 'bg-blue-500';
            case 'Need Feedback':
                return 'bg-red-500';
            case 'Completed':
                return 'bg-green-500';
            case 'Next':
                return 'bg-violet-500';
            default:
                return 'bg-purple-500';
        }
    }


    return (
        <div className=" flex border border-cusBorder items-center h-44 bg-cusSec  text-white">
            <div className=" flex-2 flex flex-col items-center justify-around py-5 px-4 h-full">
                <div>
                    <WarningIcon />
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <KeyboardArrowUpIcon className=' scale-150' />
                    <KeyboardArrowDownIcon className=' scale-150' />
                </div>
            </div>
            <div className=" flex-1 h-full flex flex-col py-5 px-4 justify-between border-l border-r border-cusBorder">
                <div>
                    <div className='flex items-center gap-2 mb-2'>
                        {status &&
                            <p className={`${getStatusColor(status)} px-2 rounded-lg`}>{status}</p>
                        }
                        <p className=' font-bold text-lg'>{title}</p>
                    </div>
                    <p className='text-sm text-gray-400'>
                        {description}
                    </p>
                </div>
                <p className=''>Target Release: <span className='bg-custom-gradient px-2 py-1 rounded-lg'>{displayDate}</span></p>
            </div>
            <div className=" flex-2 flex flex-col items-center justify-around py-5 px-4 h-full">
                <div className=' text-sm'>+24</div>
                <PollOutlinedIcon className=' text-3xl' />
            </div>
        </div>
    )
}

export default Post
