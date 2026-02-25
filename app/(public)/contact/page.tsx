import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Afflux",
  description: "Get in touch with the Afflux team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Contact Us</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Have a question, suggestion, or business inquiry? We&apos;d love to hear from you. 
          Fill out the form below or reach out directly via email.
        </p>

        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>

        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Other Ways to Reach Us</h2>
        <p className="text-muted-foreground leading-relaxed">
          For business inquiries, partnerships, or press requests, you can also email us directly at:{" "}
          <a href="mailto:contact@afflux.dev" className="text-primary hover:underline">
            contact@afflux.dev
          </a>
        </p>
      </div>
    </div>
  );
}
