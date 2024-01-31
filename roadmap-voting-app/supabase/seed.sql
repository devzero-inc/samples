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

-- INSERT INTO posts 
-- (id, title, description, status, target, createdat, updatedat) 
-- VALUES 
-- ('6bec8ad3-31d7-4fed-a2fc-43820743e4b8', 'User Profile Customization', 'Implementing advanced user profile customization options including themes, avatars, and bio.', 'In Progress', '2024-03-01T00:00:00', '2024-01-30T06:59:56.061271', '2024-01-30T06:59:56.061271'),
-- ('ec09c09e-d5c9-49ea-9d1f-48940686fdf3', 'Dark Mode Support', 'Introducing a dark mode feature for better usability in low-light conditions.', 'Completed', '2024-02-01T00:00:00', '2024-01-30T07:02:44.972204', '2024-01-30T07:02:44.972204'),
-- ('c441ba91-3261-42f1-8faf-8980ee58f014', 'In-App Messaging System', 'Adding a secure and efficient messaging system for user-to-user communication within the app.', 'Next', '2024-03-14T00:00:00', '2024-01-30T07:06:04.150922', '2024-01-30T07:06:04.150922'),
-- ('65cb3d95-aaa2-4152-bbce-4803fe45d125', 'Enhanced Data Security', 'Upgrading our data encryption methods to enhance user data security and privacy.', 'Next', '2024-03-12T00:00:00', '2024-01-30T07:07:29.855652', '2024-01-30T07:07:29.855652'),
-- ('c0362424-2178-4312-8365-9417f434e15d', 'Integration with Third-Party APIs', 'Allowing integration with popular third-party APIs for extended functionality.', 'Need Feedback', '2024-02-15T00:00:00', '2024-01-30T07:08:43.122766', '2024-01-30T07:08:43.122766'),
-- ('bf05f02a-07d1-4dc3-9cc6-d779af291ff5', 'Offline Access Capabilities', 'Developing offline access for key features of the app for enhanced usability without internet access.', 'In Progress', '2024-02-21T00:00:00', '2024-01-30T07:10:23.171441', '2024-01-30T07:10:23.171441'),
-- ('de1fcf83-dfc5-498f-b71d-2e0fcec785fe', 'Real-time Notifications', 'Implementing real-time notifications for important updates and user interactions.', 'Completed', '2024-02-02T00:00:00', '2024-01-30T07:11:32.425408', '2024-01-30T07:11:32.425408'),
-- ('f791052b-a947-40b0-b353-db8f0bb48bf9', 'Multi-Language Support', 'Introducing multiple language support to cater to a global user base.', 'In Progress', '2024-02-27T00:00:00', '2024-01-30T07:13:06.416562', '2024-01-30T07:13:06.416562'),
-- ('a2adca22-fe39-4a0d-96a6-bd8471bfc726', 'Customizable Widgets', 'Providing users with customizable widgets for their home screen for quick app access.', 'In Progress', '2024-02-25T00:00:00', '2024-01-30T07:13:58.740369', '2024-01-30T07:13:58.740369'),
-- ('13d7fc08-8b92-4eb7-a7bc-1e936feb8770', 'Voice Command Features', 'Adding voice command functionality for hands-free navigation and control.', 'Next', '2024-03-10T00:00:00', '2024-01-30T07:14:54.361739', '2024-01-30T07:14:54.361739'),
-- ('0c1012ab-4b54-48e2-af94-ab5c26c07ba8', 'Advanced Analytics Dashboard', 'Developing an advanced analytics dashboard for users to track their app usage and activities.', 'Need Feedback', '2024-02-13T00:00:00', '2024-01-30T07:16:10.795264', '2024-01-30T07:16:10.795264');