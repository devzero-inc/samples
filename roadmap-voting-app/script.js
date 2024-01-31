const cl = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = cl.createClient(supabaseUrl, supabaseAnonKey);

async function insertPosts() {
    const posts = [
        {
            id: "6bec8ad3-31d7-4fed-a2fc-43820743e4b8",
            title: "User Profile Customization",
            description: "Implementing advanced user profile customization options including themes, avatars, and bio.",
            status: "In Progress",
            target: "2024-03-01T00:00:00",
            createdat: "2024-01-30T06:59:56.061271",
            updatedat: "2024-01-30T06:59:56.061271"
        },
        {
            id: "ec09c09e-d5c9-49ea-9d1f-48940686fdf3",
            title: "Dark Mode Support",
            description: "Introducing a dark mode feature for better usability in low-light conditions.",
            status: "Completed",
            target: "2024-02-01T00:00:00",
            createdat: "2024-01-30T07:02:44.972204",
            updatedat: "2024-01-30T07:02:44.972204"
        },
        {
            id: "c441ba91-3261-42f1-8faf-8980ee58f014",
            title: "In-App Messaging System",
            description: "Adding a secure and efficient messaging system for user-to-user communication within the app.",
            status: "Next",
            target: "2024-03-14T00:00:00",
            createdat: "2024-01-30T07:06:04.150922",
            updatedat: "2024-01-30T07:06:04.150922"
        },
        {
            id: "65cb3d95-aaa2-4152-bbce-4803fe45d125",
            title: "Enhanced Data Security",
            description: "Upgrading our data encryption methods to enhance user data security and privacy.",
            status: "Next",
            target: "2024-03-12T00:00:00",
            createdat: "2024-01-30T07:07:29.855652",
            updatedat: "2024-01-30T07:07:29.855652"
        },
        {
            id: "c0362424-2178-4312-8365-9417f434e15d",
            title: "Integration with Third-Party APIs",
            description: "Allowing integration with popular third-party APIs for extended functionality.",
            status: "Need Feedback",
            target: "2024-02-15T00:00:00",
            createdat: "2024-01-30T07:08:43.122766",
            updatedat: "2024-01-30T07:08:43.122766"
        },
        {
            id: "bf05f02a-07d1-4dc3-9cc6-d779af291ff5",
            title: "Offline Access Capabilities",
            description: "Developing offline access for key features of the app for enhanced usability without internet access.",
            status: "In Progress",
            target: "2024-02-21T00:00:00",
            createdat: "2024-01-30T07:10:23.171441",
            updatedat: "2024-01-30T07:10:23.171441"
        },
        {
            id: "de1fcf83-dfc5-498f-b71d-2e0fcec785fe",
            title: "Real-time Notifications",
            description: "Implementing real-time notifications for important updates and user interactions.",
            status: "Completed",
            target: "2024-02-02T00:00:00",
            createdat: "2024-01-30T07:11:32.425408",
            updatedat: "2024-01-30T07:11:32.425408"
        },
        {
            id: "f791052b-a947-40b0-b353-db8f0bb48bf9",
            title: "Multi-Language Support",
            description: "Introducing multiple language support to cater to a global user base.",
            status: "In Progress",
            target: "2024-02-27T00:00:00",
            createdat: "2024-01-30T07:13:06.416562",
            updatedat: "2024-01-30T07:13:06.416562"
        },
        {
            id: "a2adca22-fe39-4a0d-96a6-bd8471bfc726",
            title: "Customizable Widgets",
            description: "Providing users with customizable widgets for their home screen for quick app access.",
            status: "In Progress",
            target: "2024-02-25T00:00:00",
            createdat: "2024-01-30T07:13:58.740369",
            updatedat: "2024-01-30T07:13:58.740369"
        },
        {
            id: "13d7fc08-8b92-4eb7-a7bc-1e936feb8770",
            title: "Voice Command Features",
            description: "Adding voice command functionality for hands-free navigation and control.",
            status: "Next",
            target: "2024-03-10T00:00:00",
            createdat: "2024-01-30T07:14:54.361739",
            updatedat: "2024-01-30T07:14:54.361739"
        },
        {
            id: "0c1012ab-4b54-48e2-af94-ab5c26c07ba8",
            title: "Advanced Analytics Dashboard",
            description: "Developing an advanced analytics dashboard for users to track their app usage and activities.",
            status: "Need Feedback",
            target: "2024-02-13T00:00:00",
            createdat: "2024-01-30T07:16:10.795264",
            updatedat: "2024-01-30T07:16:10.795264"
        }
    ];

    for (const post of posts) {
        const { data, error } = await supabase
            .from('posts')
            .insert([post]);

        if (error) {
            console.error('Error:', error);
            break;
        } else {
            console.log('Inserted:', data);
        }
    }
}

insertPosts().catch(console.error);