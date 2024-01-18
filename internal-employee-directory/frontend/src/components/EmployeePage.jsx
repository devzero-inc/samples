import React, { useState, useEffect } from 'react';
import ProfileContainer from './ProfileContainer';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { getOneEmployee } from '../http/api';

const EmployeePage = (props) => {

    const [employee, setEmployee] = useState();

    useEffect(() => {
        getOneEmployee(props.currentEmployee)
            .then(res => {
                setEmployee(res);
            })
            .catch(err => console.log(err));
    }, [props.currentEmployee])

    if (employee) {
        return (
            <div className=' text-cusTextPrime h-screen flex-1 flex flex-col'>
                {/* Container One */}
                <div className=' w-full h-64 bg-slate-300 flex flex-col
                                 justify-center gap-4 pl-12 text-black'>
                    <div>
                        <h1 className=' text-5xl font-bold'>{employee.name}</h1>
                        <p className=' text-xl mt-2'>{employee.designation}</p>
                    </div>
                    <div className=' flex items-center gap-2'>
                        <BadgeOutlinedIcon />
                        {employee.employeeID}
                    </div>
                </div>
                {/* Absolute positioned container */}
                {employee &&
                    <ProfileContainer employee={employee} />
                }
                {/* Last Container */}
                <div className='  bg-cusSecOne flex-1 flex flex-col justify-evenly pl-16'>
                    <div
                        className=' bg-cusSecondary flex items-center justify-between gap-12 p-2 rounded-md hover:bg-cusSecLight cursor-pointer
                                transition-all duration-300 ease-in-out w-fit'
                        onClick={() => props.setShowTree((prev) => !prev)}
                    >
                        <button > Organization Chart</button>
                        <AccountTreeOutlinedIcon />
                    </div>
                    <div className='w-[50%] flex flex-col gap-4'>
                        <h1 className='font-bold text-5xl'>Bio</h1>
                        <p>{employee.bio}</p>
                    </div>
                    <div className=' flex items-center gap-16'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='font-bold text-4xl'>Contact</h1>
                            <div className=' ml-4 flex flex-col gap-1'>
                                <div className='flex gap-2 items-center'>
                                    <EmailOutlinedIcon />
                                    {employee.contactDetails.email}
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <LocalPhoneOutlinedIcon />
                                    {employee.contactDetails.phone}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='font-bold text-4xl'>Work History</h1>
                            <div className=' ml-4 flex flex-col gap-1'>
                                <div className='flex gap-2 items-center'>
                                    <CorporateFareOutlinedIcon />
                                    <p>{employee.workHistory.companyName}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <WorkOutlineOutlinedIcon />
                                    <p>{employee.workHistory.position}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeePage
