import { getPhoto, uploadPhoto, deletePhoto } from '../http/api';
global.fetch = jest.fn();

describe('getPhoto', () => {
    it('should return the data in form of an array from the API', async () => {

        const mockData = { data: [{ id: '123', path: 'xyz' }, { id: '124', path: 'abc' }] };
        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };

        fetch.mockResolvedValue(mockResponse);

        const result = await getPhoto();

        expect(result).toEqual(mockData.data);
        expect(fetch).toHaveBeenCalledWith('/api/image');

    });

    it('should log an error if an exception occurs', async () => {

        const mockError = new Error('mocked error');
        fetch.mockRejectedValue(mockError);

        console.log = jest.fn();

        await getPhoto();

        expect(console.log).toHaveBeenCalledWith(mockError);
    });
});

describe('uploadPhoto', () => {
    it('should return the data in form of an object upon successful upload', async () => {
        const mockFile = new Blob(['photo'], { type: 'image/jpeg' });
        const mockData = { data: { name: 'xyz', id: '125' } };
        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };

        fetch.mockResolvedValue(mockResponse);

        const result = await uploadPhoto(mockFile);

        expect(result).toEqual(mockData.data);
        expect(fetch).toHaveBeenCalledWith('/api/image', {
            method: "POST",
            body: mockFile,
        });
    });

    it('should log an error if an exception occurs during upload', async () => {
        const mockFile = new Blob(['photo'], { type: 'image/jpeg' });
        const mockError = new Error('mocked upload error');
        fetch.mockRejectedValue(mockError);

        console.log = jest.fn();

        await uploadPhoto(mockFile);

        expect(console.log).toHaveBeenCalledWith(mockError);
    });
});

describe('deletePhoto', () => {
    it('should return message upon successful photo deletion', async () => {
        const mockId = '123';
        const mockData = { message: 'Photo deleted successfully' };
        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };

        fetch.mockResolvedValue(mockResponse);

        const result = await deletePhoto(mockId);

        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`/api/image?id=${mockId}`, {
            method: "DELETE",
        });
    });

    it('should log an error if an exception occurs during deletion', async () => {
        const mockId = '123';
        const mockError = new Error('mocked deletion error');
        fetch.mockRejectedValue(mockError);

        console.log = jest.fn();

        await deletePhoto(mockId);

        expect(console.log).toHaveBeenCalledWith(mockError);
    });
});
