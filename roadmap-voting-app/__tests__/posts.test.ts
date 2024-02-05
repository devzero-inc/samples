import { NextRequest } from 'next/server';
import { POST } from '../app/api/posts/route';

jest.mock('../utils/controller', () => ({
    getVotes: jest.fn(),
    getPosts: jest.fn(),
}));

import { getVotes, getPosts } from '../utils/controller';

const createMockRequest = (postId: string | null): NextRequest => ({
    nextUrl: new URL(postId ? `http://localhost/api/posts?postId=${postId}` : `http://localhost/api/posts`),
} as unknown as NextRequest);

describe('POST api/posts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return votes for a given post if postId is provided', async () => {
        const mockVotesData = [{ id: '1', userId: 'user1', vote: true }];
        (getVotes as jest.Mock).mockResolvedValueOnce({ data: mockVotesData, error: null });

        const mockRequest = createMockRequest('test-post');
        const result = await POST(mockRequest);
        const jsonResponse = await result.json();

        expect(getVotes).toHaveBeenCalledWith('test-post');
        expect(jsonResponse.votes).toEqual(mockVotesData);
        expect(result.status).toBe(200);
    });

    it('should return all posts if postId is not provided', async () => {
        const mockPostsData = [{ id: '1', title: 'Test Post', content: 'Test content' }];
        (getPosts as jest.Mock).mockResolvedValueOnce({ data: mockPostsData, error: null });

        const mockRequest = createMockRequest(null);
        const result = await POST(mockRequest);
        const jsonResponse = await result.json();

        expect(getPosts).toHaveBeenCalled();
        expect(jsonResponse.posts).toEqual(mockPostsData);
        expect(result.status).toBe(200);
    });

    it('should return 500 error if an unexpected error occurs', async () => {
        (getPosts as jest.Mock).mockResolvedValueOnce({ data: null, error: 'error connecting to supabase' });
        (getVotes as jest.Mock).mockResolvedValueOnce({ data: null, error: 'error connecting to supabase' });

        const mockRequest = createMockRequest(null);
        const result = await POST(mockRequest);
        const jsonResponse = await result.json();

        expect(jsonResponse).toEqual(
            {
                message: 'An unexpected error occurred',
                status: 500,
            }
        );
    });

});
