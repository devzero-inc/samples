CREATE TABLE userstable (
    id UUID PRIMARY KEY REFERENCES auth.users NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE posts (
    id UUID PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    description TEXT,
    status TEXT,
    target TIMESTAMP,
    createdat TIMESTAMP DEFAULT NOW(),
    updatedat TIMESTAMP DEFAULT NOW()
);

CREATE TABLE votes (
    id UUID PRIMARY KEY NOT NULL,
    postid UUID REFERENCES posts(id),
    userid UUID REFERENCES userstable(id),
    type VARCHAR(255) CHECK (type IN ('yes', 'urgent', 'meh')),
    createdat TIMESTAMP DEFAULT NOW(),
    updatedat TIMESTAMP DEFAULT NOW()
);