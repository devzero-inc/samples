import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import EmployeePage from './components/EmployeePage';
import TreeCont from './components/TreeCont';
import { getAllEmployees } from './http/api';

const App = () => {

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState("DZ001");
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    getAllEmployees()
      .then((res) => {setEmployees(res)})
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredEmployees(employees);
}, [employees])

  return (
    <div className='flex relative font-mono'>
      {employees && <Sidebar employees={employees} setCurrentEmployee={setCurrentEmployee}
                             filteredEmployees={filteredEmployees} setFilteredEmployees={setFilteredEmployees} />}
      {currentEmployee && <EmployeePage currentEmployee={currentEmployee} setShowTree={setShowTree}/>}
      {showTree &&
        <div className={`z-20 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
                        transition-all duration-300 ease-in-out overflow-hidden w-[80%] h-[80%] shadow-2xl`}>
          <TreeCont setShowTree={setShowTree} />
        </div>
      }
    </div>
  )
}

export default App
