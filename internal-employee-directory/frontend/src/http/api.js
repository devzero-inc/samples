import AxiosService from "../service/axiosService";

const getAllEmployees = async () => {
    try {
        const employeesArr = await AxiosService.get('http://localhost:8000/api/employees/get-all');
        const sortedEmployees = employeesArr.data.employees.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        return sortedEmployees;
    } catch (error) {
        console.log(error);
    }
}

const getOneEmployee = async (id) => {
    try {
        const employee = await AxiosService.get(`http://localhost:8000/api/employees/get-one/?id=${id}`);
        return employee.data.employee;
    } catch (error) {
        console.log(error);
    }
}

export { getAllEmployees, getOneEmployee };