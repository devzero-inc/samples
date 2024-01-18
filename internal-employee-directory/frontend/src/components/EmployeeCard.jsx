import React from 'react';
import sample from '../assets/sample-profile.jpg';

const EmployeeCard = (props) => {

  const handleClick = () => {
    props.setCurrentEmployee(props.id);
  }

  return (
    <div
      style={{ borderBottom: '1px solid #30195c' }}
      className='flex items-center gap-5 w-full py-4 pl-7 cursor-pointer hover:bg-cusSecondary transition-all duration-300 ease-in-out'
      onClick={handleClick}
    >
      <img src={props.pic ? props.pic : sample} alt="No img" className=' w-12 h-12 rounded-full' />
      <div className='flex flex-col'>
        <p className='font-bold'>{props.name}</p>
        <p className=' text-sm text-slate-400'>{props.id}</p>
      </div>
    </div>
  )
}

export default EmployeeCard
