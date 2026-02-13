import { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us - Heartline",
    description: "Get in touch with the Heartline team.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-muted-foreground text-center mb-10">
                Have questions, feedback, or need support? We're here to help.
            </p>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
                <div className="flex flex-col items-center p-6 bg-card border rounded-xl text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        For general inquiries and support.
                    </p>
                    <a href="mailto:support@heartline.app" className="text-primary hover:underline font-medium">
                        support@heartline.app
                    </a>
                </div>

                <div className="flex flex-col items-center p-6 bg-card border rounded-xl text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-sm text-muted-foreground">
                        San Francisco, CA<br />
                        United States
                    </p>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-xl border">
                <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <input id="name" className="w-full p-2 border rounded-md bg-background" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input id="email" type="email" className="w-full p-2 border rounded-md bg-background" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                        <input id="subject" className="w-full p-2 border rounded-md bg-background" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                        <textarea id="message" className="w-full p-2 border rounded-md bg-background h-32" placeholder="Tell us more..." />
                    </div>
                    <button type="button" className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 font-medium transition-colors">
                        Send Message
                    </button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                        * This form is currently for demonstration. Please email us directly.
                    </p>
                </form>
            </div>
        </div>
    );
}
