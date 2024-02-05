import { getPosts, getVotes, doVote, createUser, loginUser } from "../http/api";

global.fetch = jest.fn();

describe("getPosts function", () => {
    it("should fetch posts correctly", async () => {
        const mockData = {
            posts: [
                {
                    id: "6bec8ad3-31d7-4fed-a2fc-43820743e4b8",
                    title: "User Profile Customization",
                    description:
                        "Implementing advanced user profile customization options including themes, avatars, and bio.",
                    status: "In Progress",
                    target: "2024-03-01T00:00:00",
                    createdat: "2024-01-30T06:59:56.061271",
                    updatedat: "2024-01-30T06:59:56.061271",
                },
                {
                    id: "ec09c09e-d5c9-49ea-9d1f-48940686fdf3",
                    title: "Dark Mode Support",
                    description:
                        "Introducing a dark mode feature for better usability in low-light conditions.",
                    status: "Completed",
                    target: "2024-02-01T00:00:00",
                    createdat: "2024-01-30T07:02:44.972204",
                    updatedat: "2024-01-30T07:02:44.972204",
                },
            ],
        };
        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getPosts();

        expect(result).toEqual(mockData.posts);
        expect(global.fetch).toHaveBeenCalledWith("/api/posts", {
            method: "POST",
        });
    });

    it("should handle errors correctly", async () => {
        const mockError = new Error("mocked error");
        (global.fetch as jest.Mock).mockRejectedValue(mockError);

        jest.mock('node-fetch', () => jest.requireActual('node-fetch'));

        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Mocked API error'));

        try {
            await getPosts();
        } catch (error: any) {
            expect(error.message).toBe('Mocked API error');
        }

    });
});

describe("getVotes function", () => {
    it("should fetch votes correctly", async () => {
        const id: string = "ec09c09e-d5c9-49ea-9d1f-48940686fdf3";
        const mockData = {
            votes: [
                {
                    createdat: "2024-02-05T06:22:41.219186",
                    id: "72a89765-b661-4f5a-a52c-48d1c3497faa",
                    postid: "ec09c09e-d5c9-49ea-9d1f-48940686fdf3",
                    type: "meh",
                    updatedat: "2024-02-05T06:37:52.19",
                    userid: "9f1bba80-9e3c-4dea-a108-f483a0191151",
                },
                {
                    createdat: "2024-02-02T10:57:06.910732",
                    id: "f1c656ca-f711-4f4c-ac90-b47fb086deb3",
                    postid: "ec09c09e-d5c9-49ea-9d1f-48940686fdf3",
                    type: "yes",
                    updatedat: "2024-02-02T10:57:06.910732",
                    userid: "8d37d96b-7357-44f5-a695-acf4dec90d2a",
                },
            ],
        };
        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await getVotes(id);

        expect(result).toEqual(mockData.votes);
        expect(global.fetch).toHaveBeenCalledWith(`/api/posts?postId=${id}`, {
            method: "POST",
        });
    });

    it("should handle errors correctly", async () => {
        const mockError = new Error("mocked error");
        (global.fetch as jest.Mock).mockRejectedValue(mockError);

        jest.mock('node-fetch', () => jest.requireActual('node-fetch'));

        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Mocked API error'));

        try {
            await getPosts();
        } catch (error: any) {
            expect(error.message).toBe('Mocked API error');
        }

    });
});

describe("doVote function", () => {
    it("should perform a vote correctly", async () => {
        const token = "token123";
        const postId = "6bec8ad3-31d7-4fed-a2fc-43820743e4b8";
        const userId = "9f1bba80-9e3c-4dea-a108-f483a0191151";
        const voteType = "yes";

        const mockData = {
            message: "Vote recorded successfully",
            data: {
                createdAt: "2024-02-05T08:21:10.285Z",
                id: "04e57c1a-4cc3-424a-bd5d-5b7618dea6fd",
                postId: "de1fcf83-dfc5-498f-b71d-2e0fcec785fe",
                type: "yes",
                updatedAt: "2024-02-05T08:21:10.285Z",
                userId: "9f1bba80-9e3c-4dea-a108-f483a0191151",
            },
        };

        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await doVote(token, postId, userId, voteType);

        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith("/api/vote", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: expect.any(FormData),
        });
    });

    it("should handle errors correctly", async () => {
        const mockError = new Error("mocked error");
        (global.fetch as jest.Mock).mockRejectedValue(mockError);

        jest.mock('node-fetch', () => jest.requireActual('node-fetch'));

        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Mocked API error'));

        try {
            await getPosts();
        } catch (error: any) {
            expect(error.message).toBe('Mocked API error');
        }

    });

});

describe("createProduct function", () => {
    it("should create a product correctly", async () => {
        const name = "name123";
        const email = "email@email.com";
        const password = "password123";

        const mockData = {
            message: "user created successfuly",
            data: {
                user: {
                    id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                    aud: "authenticated",
                    role: "authenticated",
                    email: "p@p.com",
                    email_confirmed_at: "2024-02-05T08:29:58.914278495Z",
                    phone: "",
                    last_sign_in_at: "2024-02-05T08:29:58.916585946Z",
                    app_metadata: {
                        provider: "email",
                        providers: ["email"],
                    },
                    user_metadata: {},
                    identities: [
                        {
                            identity_id: "9a3f9cc1-9db0-46ee-a721-b68720b9fa77",
                            id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                            user_id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                            identity_data: {
                                email: "p@p.com",
                                email_verified: false,
                                phone_verified: false,
                                sub: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                            },
                            provider: "email",
                            last_sign_in_at: "2024-02-05T08:29:58.912962309Z",
                            created_at: "2024-02-05T08:29:58.91301Z",
                            updated_at: "2024-02-05T08:29:58.91301Z",
                            email: "p@p.com",
                        },
                    ],
                    created_at: "2024-02-05T08:29:58.910902Z",
                    updated_at: "2024-02-05T08:29:58.918318Z",
                },
                session: {
                    access_token:
                        "eyJhbGciOiJIUzI1NiIsImtpZCI6IktVQllTaDBVK2VWbWFpa2IiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA3MTI1Mzk4LCJpYXQiOjE3MDcxMjE3OTgsImlzcyI6Imh0dHBzOi8vdXp2aWlkcHFneWZpYXdreWhiaWYuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImRjYzE3Mjc0LWI5NmYtNGExZC04ZGE4LTUwZmNjODY0ODE1NiIsImVtYWlsIjoicEBwLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA3MTIxNzk4fV0sInNlc3Npb25faWQiOiI4NmVlOTFmNC01NGU3LTQ4ZGItYjEzNC1lNjQxNmEyYmFiYTYifQ.5-zjjwLGucp-1jdAD5tS0Tjv4mYADk8ip1KLbGfPSs4",
                    token_type: "bearer",
                    expires_in: 3600,
                    expires_at: 1707125398,
                    refresh_token: "faMrg1lopZkBmGxZWqc5CA",
                    user: {
                        id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                        aud: "authenticated",
                        role: "authenticated",
                        email: "p@p.com",
                        email_confirmed_at: "2024-02-05T08:29:58.914278495Z",
                        phone: "",
                        last_sign_in_at: "2024-02-05T08:29:58.916585946Z",
                        app_metadata: {
                            provider: "email",
                            providers: ["email"],
                        },
                        user_metadata: {},
                        identities: [
                            {
                                identity_id: "9a3f9cc1-9db0-46ee-a721-b68720b9fa77",
                                id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                                user_id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                                identity_data: {
                                    email: "p@p.com",
                                    email_verified: false,
                                    phone_verified: false,
                                    sub: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                                },
                                provider: "email",
                                last_sign_in_at: "2024-02-05T08:29:58.912962309Z",
                                created_at: "2024-02-05T08:29:58.91301Z",
                                updated_at: "2024-02-05T08:29:58.91301Z",
                                email: "p@p.com",
                            },
                        ],
                        created_at: "2024-02-05T08:29:58.910902Z",
                        updated_at: "2024-02-05T08:29:58.918318Z",
                    },
                },
            },
            status: 200,
        };

        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await createUser(name, email, password);

        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith("/api/user", {
            method: "POST",
            body: expect.any(FormData),
        });
    });

    it("should handle errors correctly", async () => {
        const mockError = new Error("mocked error");
        (global.fetch as jest.Mock).mockRejectedValue(mockError);

        jest.mock('node-fetch', () => jest.requireActual('node-fetch'));

        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Mocked API error'));

        try {
            await getPosts();
        } catch (error: any) {
            expect(error.message).toBe('Mocked API error');
        }

    });

});

describe("loginUser function", () => {
    it("should login a user correctly", async () => {
        const userEmail = "testuser@example.com";
        const userPassword = "testpassword";

        const mockData = {
            message: "User logged in successfully",
            data: {
                user: {
                    id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                    aud: "authenticated",
                    role: "authenticated",
                    email: "p@p.com",
                    email_confirmed_at: "2024-02-05T08:29:58.914278Z",
                    phone: "",
                    confirmed_at: "2024-02-05T08:29:58.914278Z",
                    last_sign_in_at: "2024-02-05T08:37:24.442277644Z",
                    app_metadata: {
                        provider: "email",
                        providers: ["email"],
                    },
                    user_metadata: {},
                    identities: [
                        {
                            identity_id: "9a3f9cc1-9db0-46ee-a721-b68720b9fa77",
                            id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                            user_id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                            identity_data: {
                                email: "p@p.com",
                                email_verified: false,
                                phone_verified: false,
                                sub: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                            },
                            provider: "email",
                            last_sign_in_at: "2024-02-05T08:29:58.912962Z",
                            created_at: "2024-02-05T08:29:58.91301Z",
                            updated_at: "2024-02-05T08:29:58.91301Z",
                            email: "p@p.com",
                        },
                    ],
                    created_at: "2024-02-05T08:29:58.910902Z",
                    updated_at: "2024-02-05T08:37:24.444026Z",
                },
                session: {
                    access_token:
                        "eyJhbGciOiJIUzI1NiIsImtpZCI6IktVQllTaDBVK2VWbWFpa2IiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA3MTI1ODQ0LCJpYXQiOjE3MDcxMjIyNDQsImlzcyI6Imh0dHBzOi8vdXp2aWlkcHFneWZpYXdreWhiaWYuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImRjYzE3Mjc0LWI5NmYtNGExZC04ZGE4LTUwZmNjODY0ODE1NiIsImVtYWlsIjoicEBwLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA3MTIyMjQ0fV0sInNlc3Npb25faWQiOiJmNjNkZTUyZi01NWVlLTRlNTEtYjYwNC0wOTFhNDA5MDM4ODEifQ.7ZcFjfEJBEbs0jhaGxeCsSLeU8eBgGpBirD01zzo_-U",
                    token_type: "bearer",
                    expires_in: 3600,
                    expires_at: 1707125844,
                    refresh_token: "J4fdXrfy1xTGkuP6R2LGow",
                    user: {
                        id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                        aud: "authenticated",
                        role: "authenticated",
                        email: "p@p.com",
                        email_confirmed_at: "2024-02-05T08:29:58.914278Z",
                        phone: "",
                        confirmed_at: "2024-02-05T08:29:58.914278Z",
                        last_sign_in_at: "2024-02-05T08:37:24.442277644Z",
                        app_metadata: {
                            provider: "email",
                            providers: ["email"],
                        },
                        user_metadata: {},
                        identities: [
                            {
                                identity_id: "9a3f9cc1-9db0-46ee-a721-b68720b9fa77",
                                id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                                user_id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                                identity_data: {
                                    email: "p@p.com",
                                    email_verified: false,
                                    phone_verified: false,
                                    sub: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                                },
                                provider: "email",
                                last_sign_in_at: "2024-02-05T08:29:58.912962Z",
                                created_at: "2024-02-05T08:29:58.91301Z",
                                updated_at: "2024-02-05T08:29:58.91301Z",
                                email: "p@p.com",
                            },
                        ],
                        created_at: "2024-02-05T08:29:58.910902Z",
                        updated_at: "2024-02-05T08:37:24.444026Z",
                    },
                },
            },
            userData: {
                id: "dcc17274-b96f-4a1d-8da8-50fcc8648156",
                name: "p001",
                email: "p@p.com",
            },
            status: 200,
        };

        const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
        (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

        const result = await loginUser(userEmail, userPassword);

        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith("/api/user?login=yes", {
            method: "POST",
            body: expect.any(FormData),
        });
    });

    it("should handle errors correctly", async () => {
        const mockError = new Error("mocked error");
        (global.fetch as jest.Mock).mockRejectedValue(mockError);

        jest.mock('node-fetch', () => jest.requireActual('node-fetch'));

        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Mocked API error'));

        try {
            await getPosts();
        } catch (error: any) {
            expect(error.message).toBe('Mocked API error');
        }

    });

});