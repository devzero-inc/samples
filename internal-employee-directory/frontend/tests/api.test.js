/* eslint-env jest */

import { getAllEmployees, getOneEmployee } from '../src/http/api';
import AxiosService from '../src/service/axiosService';
jest.mock('../src/service/axiosService');

const employees = [
    {
        name: 'Alex Johnson',
        designation: 'CTO & Co-Founder',
        employeeID: 'DZ001',
        bio: 'Co-founder/CTO. Previously lead developer at BlueTech. Graduated from Massachusetts Institute of Technology with a Masters in Computer Science.',
        about: 'Technology Leader',
        workHistory: {
            companyName: 'BlueTech',
            position: 'Lead Developer',
        },
        contactDetails: {
            email: 'alex.j@.com',
            phone: 1234567890,
        },
        profiles: {
            linkedIn: '',
            github: '',
        },
        profilePicture: 'https://i.imgur.com/HxTquEx.jpg',
    },

    {
        name: 'Samantha Davis',
        designation: 'Chief Marketing Officer',
        employeeID: 'DZ002',
        bio: 'Innovative CMO with a strong background in digital marketing strategies for tech startups. Expert in branding and market penetration. MBA from Harvard Business School.',
        about: 'Marketing Guru | Brand Strategist',
        workHistory: {
            companyName: 'MarketGenius',
            position: 'Marketing Director',
        },
        contactDetails: {
            email: 's.davis@.com',
            phone: 1234567891,
        },
        profiles: {
            linkedIn: '',
            github: '',
        },
        profilePicture: 'https://i.imgur.com/6yYs3C0.jpg',
    },
]

describe('getAllEmployees', () => {
    it('should return an array of employees', async () => {
        AxiosService.get.mockResolvedValue({ data: { employees }, status: 200 });
        const result = await getAllEmployees();
        expect(result).toEqual(employees);
    });

    it('should return nothing if there is an error', async () => {
        AxiosService.get.mockRejectedValue({ status: 500 });
        const result = await getAllEmployees();
        expect(result).toEqual(undefined);
    });
});

describe('getOneEmployee', () => {
    it('should return an employee object', async () => {
        AxiosService.get.mockResolvedValue({ data: { employee: employees[0] }, status: 200 });
        const result = await getOneEmployee('DZ001');
        expect(result).toEqual(employees[0]);
    });

    it('should return nothing if the id is not found', async () => {
        AxiosService.get.mockResolvedValue({ data: { employee: undefined }, status: 404 });
        const result = await getOneEmployee('DZ001');
        expect(result).toEqual(undefined);
    });

    it('should return nothing if there is an error', async () => {
        AxiosService.get.mockRejectedValue({ status: 500 });
        const result = await getOneEmployee('DZ001');
        expect(result).toEqual(undefined);
    });
});