import { NextRequest } from 'next/server';
import { updateVote, getExistingVote, addVote } from '../utils/controller';
import { POST } from '../app/api/vote/route';
import { v4 as uuidv4 } from 'uuid';

const createMockRequest = (): NextRequest => ({
    nextUrl: new URL(`http://localhost/api/vote`),
    formData: async () => new Map([['postId', '123'], ['userId', '456'], ['type', 'yes']]),
} as unknown as NextRequest);

jest.mock('../utils/controller', () => ({
    updateVote: jest.fn(),
    getExistingVote: jest.fn(),
    addVote: jest.fn(),
}));

jest.mock('../lib/authenticate', () => ({
    authenticate: jest.fn(),
}));

jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

const mockDate = new Date('2024-02-05T10:20:30Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as Date);

describe('POST api/vote', () => {
    it('should update the vote successfully if the vote exists', async () => {

        const mockRequest = createMockRequest();

        (getExistingVote as jest.Mock).mockResolvedValueOnce('sampleData');

        (updateVote as jest.Mock).mockResolvedValueOnce({ error: null });


        const response = await POST(mockRequest);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'Vote updated successfully',
                status: 201,
            }
        );
    });

    it('should add a vote successfully if the vote does not exist', async () => {
        const mockRequest = createMockRequest();
        const mockData = {
            id: '123',
            postId: '123',
            userId: '456',
            type: 'yes',
            createdAt: '2024-02-05T10:20:30.000Z',
            updatedAt: '2024-02-05T10:20:30.000Z',
        };

        (getExistingVote as jest.Mock).mockResolvedValueOnce(null);

        (addVote as jest.Mock).mockResolvedValueOnce({ error: null });

        (uuidv4 as jest.Mock).mockReturnValueOnce('123');

        const response = await POST(mockRequest);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'Vote recorded successfully',
                data: mockData,
                status: 200,
            }
        );
    });

    it('should return 400 if postId or userId is missing', async () => {
        const req: NextRequest = {
            nextUrl: new URL(`http://localhost/api/vote`),
            formData: async () => new Map([['type', 'yes']]),
        }as unknown as NextRequest;

        const response = await POST(req);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'Post ID and User ID are required',
                status: 400,
            }
        );
    });

    it('should return 400 if type is missing', async () => {
        const req: NextRequest = {
            nextUrl: new URL(`http://localhost/api/vote`),
            formData: async () => new Map([['postId', '123'], ['userId', '456']]),
        }as unknown as NextRequest;

        const response = await POST(req);
        const jsonResponse = await response.json();

        expect(jsonResponse).toEqual(
            {
                message: 'Vote type is required',
                status: 400,
            }
        );
    });

    it('should return 500 if an unexpected error occurs', async () => {
        const req: NextRequest = {
            nextUrl: new URL(`http://localhost/api/vote`),
            formData: async () => { throw new Error('Unexpected error'); },
        }as unknown as NextRequest;

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
