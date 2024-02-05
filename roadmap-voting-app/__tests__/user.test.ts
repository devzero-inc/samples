import { NextRequest } from 'next/server';
import { signInWithSupabase, getUserFromSupabase, signUpWithSupabase, insertUserToSupabase } from '../utils/controller';
import { POST } from '../app/api/user/route';

const createMockRequest = (login: string | null): NextRequest => ({
    nextUrl: new URL(login ? `http://localhost/api/user?login=${login}` : `http://localhost/api/user`),
    formData: login ?
        async () => new Map([['email', 'sampleEmail'], ['password', 'samplePassword']])
        :
        async () => new Map([['name', 'sampleName'], ['email', 'sampleEmail'], ['password', 'samplePassword']]),
} as unknown as NextRequest);

jest.mock('../utils/controller', () => ({
    signInWithSupabase: jest.fn(),
    getUserFromSupabase: jest.fn(),
    signUpWithSupabase: jest.fn(),
    insertUserToSupabase: jest.fn(),
}));

describe('POST api/user', () => {
    it('should signin the user successfully if login query is provided', async () => {

        const mockRequest = createMockRequest('login');

        (signInWithSupabase as jest.Mock).mockResolvedValueOnce({ data: 'sampleData', userId: '123' });

        (getUserFromSupabase as jest.Mock).mockResolvedValueOnce({ data: 'userData', error: null });

        const response = await POST(mockRequest);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'User logged in successfully',
                data: 'sampleData',
                userData: 'userData',
                status: 200,
            }
        );
    });

    it('should signup a user successfully if login query is not provided', async () => {
        const mockRequest = createMockRequest(null);

        (signUpWithSupabase as jest.Mock).mockResolvedValueOnce({
            data: 'sampleData',
            user: 'sampleUser',
            userID: '123'
        });

        (insertUserToSupabase as jest.Mock).mockResolvedValueOnce({ error: null });

        const response = await POST(mockRequest);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'user created successfuly',
                data: 'sampleData',
                status: 200,
            }
        );
    });

    it('should return 400 if username is missing', async () => {
        const req: NextRequest = {
            nextUrl: new URL(`http://localhost/api/user`),
            formData: async () => new Map([['email', 'sampleEmail'], ['password', 'samplePassword']]),
        } as unknown as NextRequest;

        const response = await POST(req);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'Username is required',
                status: 400,
            }
        );
    });

    it('should return 400 if email is missing', async () => {
        const req: NextRequest = {
            nextUrl: new URL(`http://localhost/api/user`),
            formData: async () => new Map([['name', 'sampleName'], ['password', 'samplePassword']]),
        } as unknown as NextRequest;

        const response = await POST(req);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'Email is required',
                status: 400,
            }
        );
    });

    it('should return 400 if password is missing', async () => {
        const req: NextRequest = {
            nextUrl: new URL(`http://localhost/api/user`),
            formData: async () => new Map([['name', 'sampleName'], ['email', 'sampleEmail']]),
        } as unknown as NextRequest;

        const response = await POST(req);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'Password is required',
                status: 400,
            }
        );
    });

    it('should return 500 if an unexpected error occurs', async () => {
        const req: NextRequest = {
            nextUrl: new URL(`http://localhost/api/user`),
            formData: async () => { throw new Error('Unexpected error'); },
        } as unknown as NextRequest;

        const response = await POST(req);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'An unexpected error occurred',
                status: 500,
            }
        );
    });

});
