import React, { useState, useEffect } from 'react';
import Logo from '../assets/devzero_logo.png';
import EmployeeCard from './EmployeeCard';
import SearchIcon from './SearchIcon';

const Sidebar = ({ employees, setCurrentEmployee, filteredEmployees, setFilteredEmployees }) => {

    const [search, setSearch] = useState('');

    useEffect(() => {
        if (employees) {
            setFilteredEmployees(
                employees.filter(emp => {
                    const lowerCaseName = emp.name.toLowerCase();
                    const lowerCaseSearch = search.toLowerCase();

                    return lowerCaseName.startsWith(lowerCaseSearch);
                })
            );
        }
    }, [search, employees, setFilteredEmployees])

    return (
        <div className=' bg-cusPrimary w-[20%] h-screen overflow-auto flex flex-col text-cusTextPrime '>
            <div className=' p-4 flex flex-col gap-8'>
                <img src={Logo} alt='logo' className=' h-16 w-16 rounded-2xl bg-cusSecondary p-1' />
                <div>
                    <h1 className=' text-3xl font-bold'>Directory</h1>
                    {employees &&
                        <p className=' text-sm'>Employee registry for {employees.length} personnel</p>
                    }
                </div>
                <div className='relative w-[100%]'>
                    <input
                        className='w-full bg-cusSecTwo px-2 py-1 bg-transparent border-b outline-none'
                        type="text"
                        placeholder='Search'
                        onChange={(e) => { setSearch(e.target.value) }}
                    />
                    <SearchIcon />
                </div>
            </div>
            <div className='flex flex-col'>
                {filteredEmployees.length !== 0 ?
                    filteredEmployees.map(emp => {
                        return (
                            <EmployeeCard key={emp._id} pic={emp.profilePicture} name={emp.name} id={emp.employeeID} setCurrentEmployee={setCurrentEmployee} />
                        )
                    })
                    :
                    <p className=' text-center'>No matches</p>
                }
            </div>
        </div>
    )
}

export default Sidebar
