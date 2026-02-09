import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - Heartline",
    description: "Terms of Service for Heartline CRM.",
    robots: {
        index: false,
        follow: true,
    }
};

export default function TermsPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl prose dark:prose-invert">
            <h1>Terms of Service</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Terms</h2>
            <p>
                By accessing this Website, accessible from https://heartline.app, you are agreeing to be bound by these Website Terms and Conditions of Use
                and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited
                from accessing this site.
            </p>

            <h2>2. Use License</h2>
            <p>
                Permission is granted to temporarily download one copy of the materials on Heartline's Website for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>attempt to reverse engineer any software contained on Heartline's Website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <h2>3. Disclaimer</h2>
            <p>
                All the materials on Heartline's Website are provided "as is". Heartline makes no warranties, may it be expressed or implied, therefore negates all other warranties.
                Furthermore, Heartline does not make any representations concerning the accuracy or likely results of the use of the materials on its Website or otherwise relating
                to such materials or on any sites linked to this Website.
            </p>

            <h2>4. Limitations</h2>
            <p>
                Heartline or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Heartline's Website,
                even if Heartline or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
            </p>
        </div>
    );
}
