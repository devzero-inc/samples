"use client";

import WarningIcon from '@mui/icons-material/Warning';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import React, { useState, useEffect } from 'react';

interface PostProps {
    id?: string,
    title?: string,
    description?: string,
    status?: string,
    target?: string,
}

interface vote {
    id: string,
    postId: string,
    userId: string,
    type: string,
    createdAt: string,
    updatedAt: string,
}

const Post: React.FC<PostProps> = ({ id, title, description, status, target }) => {

    const [displayDate, setDisplayDate] = useState<string>('');
    const [votes, setVotes] = useState<vote[]>([]);

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

    useEffect(() => {
        fetch(`/api/post?postId=${id}`)
            .then((res) => res.json()) 
            .then((data) => {
                // console.log(data);
                setVotes(data.votes);
            })
            .catch((err) => console.log(err));
    }, [])

    const getStatusColor = (status: string): string => {
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

    const vote = (type: string): void => {
        const localData = localStorage.getItem("session");
        const session = localData ? JSON.parse(localData) : null;
        if(!session){
            alert('Please login to vote');
            return;
        }
        const userID = session?.user?.id;
        const token = session?.access_token;
        console.log(token);

        if (userID && id) {

            const formData = new FormData();
            formData.append('postId', id);
            formData.append('userId', userID);
            formData.append('type', type);

            fetch(`/api/vote`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if(data.status === 200){
                        setVotes(prev => [...prev, data.data]);
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <div className=" flex border border-cusBorder items-center h-44 bg-cusSec  text-white">
            <div className=" flex-2 flex flex-col items-center justify-around py-5 px-4 h-full">
                <div>
                    <WarningIcon className=' cursor-pointer' onClick={() => {vote('urgent')}}/>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <KeyboardArrowUpIcon className=' scale-150 cursor-pointer' onClick={() => {vote('yes')}}/>
                    <KeyboardArrowDownIcon className=' scale-150 cursor-pointer' onClick={() => {vote('meh')}}/>
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
                <div className=' text-sm'>+{votes.length}</div>
                <PollOutlinedIcon className=' text-3xl' />
            </div>
        </div>
    )
}

export default Post
