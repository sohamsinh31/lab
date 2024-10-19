import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Extracting query parameters from req object
    const { forPage } = req.query;

    // Legal content data
    const legalContent: Record<string, any> = {
        google: {
            title: "Google Auth",
            date: "24/06/2024",
            content: [
                {
                    heading: "Information We Collect",
                    subpoints: [
                        "Personal Data: Name, email address, and other contact details.",
                        "Communication Data: Emails sent through our platform using predefined templates.",
                        "Technical Data: IP address, browser type, and usage data for website analytics."
                    ]
                },
                {
                    heading: "How We Use Your Information",
                    subpoints: [
                        "Facilitate and monitor business communications.",
                        "Ensure compliance with predefined business rules.",
                        "Improve our services and user experience."
                    ]
                },
                {
                    heading: "Data Sharing",
                    subpoints: [
                        "As required by law.",
                        "To third-party service providers (e.g., Google APIs) that support our platform, under strict confidentiality agreements."
                    ]
                },
                {
                    heading: "Data Security",
                    subpoints: [
                        "We implement strong security measures to protect your data from unauthorized access, including encryption and secure servers."
                    ]
                },
                {
                    heading: "Your Rights",
                    subpoints: [
                        "Access and correct your personal information.",
                        "Request deletion of your account and data."
                    ]
                }
            ]
        }
        // Add more content for other pages like "terms-and-conditions", etc.
    };

    // Respond with the specific content for the requested page
    if (forPage && typeof forPage === 'string' && legalContent[forPage]) {
        res.status(200).json(legalContent[forPage]);
    } else {
        res.status(404).json({ message: "Page not found" });
    }
}
