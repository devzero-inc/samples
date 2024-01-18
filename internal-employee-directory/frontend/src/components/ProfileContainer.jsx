import React from 'react';
import sample from '../assets/sample-profile.jpg';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ProfileContainer = (props) => {

    const handleGithubProfile = () => {
        if (props.employee.profiles.github)
            window.open(props.employee.profiles.github, '_blank');
    }

    const handleLinkedInProfile = () => {
        if (props.employee.profiles.linkedIn)
            window.open(props.employee.profiles.linkedIn, '_blank');
    }

    return (
        <div
            className=' absolute transform bg-slate-300 rounded-lg  w-64 flex flex-col
             justify-between gap-4 text-black right-[10%] top-[10%] overflow-hidden
             object-cover shadow-2xl'>
            <div className=' w-full'>
                <div className='h-60 w-full'>
                    <img src={props.employee.profilePicture ? props.employee.profilePicture : sample} alt="" className=' object-cover h-full w-full' />
                </div>
                <div className=' p-2'>
                    <h1 className=' text-3xl font-bold'>About</h1>
                    <p className=' text-md'>{props.employee.about}</p>
                </div>
            </div>
            <div className=' w-full p-2 flex items-center gap-2'>
                {/* <div className='flex-1 flex items-center gap-2 border rounded-md
                            border-black px-2 py-1 justify-center cursor-pointer'
                >
                    <GitHubIcon />
                    <h1>Github</h1>
                </div> */}
                <div 
                    className='flex-1 flex items-center gap-2 border rounded-md
                              border-black px-2 py-1 justify-center cursor-pointer
                                transition duration-300 ease-in-out hover:bg-black hover:text-white'
                    onClick={handleGithubProfile}
                >
                    <GitHubIcon className='' />
                    <h1 className=''>Github</h1>
                </div>

                <div
                    className='flex-1 flex items-center gap-2 border rounded-md
                              border-black px-2 py-1 justify-center cursor-pointer
                                transition duration-300 ease-in-out hover:bg-black hover:text-white'
                    onClick={handleLinkedInProfile}
                >
                    <LinkedInIcon />
                    <h1>LinkedIn</h1>
                </div>
            </div>
        </div>
    )
}

export default ProfileContainer
