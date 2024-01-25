import { GET, POST, DELETE } from "../app/api/image/route";
import * as apiResponseUtils from '../utils/apiResponse';
import fs from "fs";
import pg from "pg";
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const mockQuery = jest.fn().mockResolvedValue({
    rows: [
        {
            id: "1",
            name: "test.jpg",
            type: "image/jpeg",
            size: 100,
            width: 100,
            height: 100,
        },
    ]
});

jest.mock('pg', () => {
    const mockConnect = jest.fn().mockImplementation(() => Promise.resolve({
        query: mockQuery,
        release: jest.fn(),
    }));
    return {
        Pool: jest.fn(() => ({
            connect: mockConnect,
        })),
    };
});

jest.mock('../utils/apiResponse', () => ({
    jsonResponse: jest.fn().mockImplementation((data) => ({ ...data, _type: 'MockedResponse' })),
}));

jest.mock('fs', () => ({
    existsSync: jest.fn(),
    promises: {
        readFile: jest.fn(),
        unlink: jest.fn(),
    },
}));

jest.mock('uuid', () => ({
    v4: jest.fn(),
}));
jest.mock("sharp");

beforeEach(() => {
    jest.clearAllMocks();
    mockQuery.mockResolvedValue({
        rows: [
            {
                id: "1",
                name: "test.jpg",
                type: "image/jpeg",
                size: 100,
                width: 100,
                height: 100,
            },
        ]
    });
});

describe("GET /api/image", () => {

    it("should return image info if info and id are provided", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?info=true&id=1'),
        };

        const result = await GET(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            data: expect.objectContaining({
                id: "1",
                name: "test.jpg",
                type: "image/jpeg",
            }),
            status: 200,
        });

        expect(result).toEqual({
            _type: 'MockedResponse',
            data: expect.objectContaining({
                id: "1",
                name: "test.jpg",
                type: "image/jpeg",
            }),
            status: 200,
        });

    });

    it("should return all images if no info or id is provided", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/'),
        };

        const result = await GET(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            data: expect.arrayContaining([
                expect.objectContaining({
                    id: "1",
                    name: "test.jpg",
                    type: "image/jpeg",
                }),
            ]),
            status: 200,
        });

        expect(result).toEqual({
            _type: 'MockedResponse',
            data: expect.arrayContaining([
                expect.objectContaining({
                    id: "1",
                    name: "test.jpg",
                    type: "image/jpeg",
                }),
            ]),
            status: 200,
        });
    });

    it("should return image file if id is provided", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?id=1'),
        };
        fs.existsSync.mockReturnValueOnce(true);
        fs.promises.readFile.mockResolvedValueOnce(Buffer.from('file content'));
        const response = await GET(request);
        expect(response).toBeDefined();
        expect(response.headers.get("Content-Type")).toBe("image/jpeg");
    });

    it("should return 404 if image file does not exist and only id is provided", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?id=1'),
        };
        fs.existsSync.mockReturnValueOnce(false);
        const result = await GET(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "File does not exist",
            status: 404
        });

        expect(result).toEqual({
            _type: 'MockedResponse',
            message: "File does not exist",
            status: 404
        });
    });

    it("should return 404 if image does not exist and info and id are provided", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?info=true&id=2'),
        };
        mockQuery.mockResolvedValueOnce({
            rows: []
        });
        const result = await GET(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "Image not found",
            status: 404
        });

        expect(result).toEqual({
            _type: 'MockedResponse',
            message: "Image not found",
            status: 404
        });
    });

    it("should handle database connection errors gracefully", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?info=true&id=1'),
        };
        pg.Pool().connect.mockImplementationOnce(() => Promise.reject(new Error("Connection failed")));

        const result = await GET(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "Internal Server Error",
            status: 500
        });

        expect(result).toEqual({
            _type: 'MockedResponse',
            message: "Internal Server Error",
            status: 500
        });
    });
});

describe("POST /api/image", () => {

    it("should return a success response when a valid image file is uploaded", async () => {
        const fileContent = new ArrayBuffer(10);
        const mockArrayBuffer = jest.fn().mockResolvedValue(fileContent);

        const req = {
            formData: jest.fn().mockResolvedValue({
                get: jest.fn().mockReturnValue({
                    name: "test.jpg",
                    type: "image/jpeg",
                    arrayBuffer: mockArrayBuffer,
                }),
            }),
        };

        fs.writeFileSync = jest.fn();

        uuidv4.mockReturnValue("unique-id");

        sharp.mockReturnValue({
            metadata: jest.fn().mockResolvedValue({
                width: 100,
                height: 100,
            }),
        });

        apiResponseUtils.jsonResponse.mockImplementation((data) => data);

        const result = await POST(req);

        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "File uploaded successfully",
            data: {
                name: "unique-id-test.jpg",
                id: "unique-id",
            },
            status: 200,
        });

        expect(result).toEqual({
            message: "File uploaded successfully",
            data: {
                name: "unique-id-test.jpg",
                id: "unique-id",
            },
            status: 200,
        });
    });

    it("should return 400 if file is not a valid image", async () => {
        const file = { type: "text/plain" }; // Invalid MIME type
        const req = { formData: jest.fn().mockResolvedValue(new Map([["file", file]])) };
        const result = await POST(req);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "File is not a valid image",
            status: 400,
        });
        expect(result).toEqual({
            message: "File is not a valid image",
            status: 400,
        });
    });

    it("should return 400 if no file is provided", async () => {
        const request = {
            formData: jest.fn().mockResolvedValue({
                get: jest.fn().mockReturnValue(null), // Simulate no file uploaded
            }),
        };
        const result = await POST(request);

        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "No file uploaded",
            status: 400,
        });

        expect(result).toEqual({
            message: "No file uploaded",
            status: 400,
        });
    });

    it("should handle database connection errors gracefully", async () => {
        const fileContent = new ArrayBuffer(10);
        const mockArrayBuffer = jest.fn().mockResolvedValue(fileContent);

        const request = {
            formData: jest.fn().mockResolvedValue({
                get: jest.fn().mockReturnValue({
                    name: "test.jpg",
                    type: "image/jpeg",
                    arrayBuffer: mockArrayBuffer,
                }),
            }),
        };
        pg.Pool().connect.mockImplementationOnce(() => Promise.reject(new Error("Connection failed")));
        const result = await POST(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "Internal Server Error",
            status: 500
        });

        expect(result).toEqual({
            message: "Internal Server Error",
            status: 500
        });
    });
})

describe("DELETE /api/image/", () => {
    it("should return 200 if image is deleted successfully", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?id=1'),
        };
        const result = await DELETE(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "Image deleted successfully",
            status: 200
        });

        expect(result).toEqual({
            message: "Image deleted successfully",
            status: 200
        });
    });

    it("should return 404 if image does not exist", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?id=2'),
        };
        mockQuery.mockResolvedValueOnce({
            rows: []
        });
        const result = await DELETE(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "Image not found",
            status: 404
        });

        expect(result).toEqual({
            message: "Image not found",
            status: 404
        });
    });

    it("should handle database connection errors gracefully", async () => {
        const request = {
            nextUrl: new URL('http://localhost/api/image/?id=1'),
        };
        pg.Pool().connect.mockImplementationOnce(() => Promise.reject(new Error("Connection failed")));
        const result = await DELETE(request);
        expect(apiResponseUtils.jsonResponse).toHaveBeenCalledWith({
            message: "Internal Server Error",
            status: 500
        });

        expect(result).toEqual({
            message: "Internal Server Error",
            status: 500
        });
    });
});