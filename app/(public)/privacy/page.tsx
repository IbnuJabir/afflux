import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Afflux",
  description: "Read our privacy policy to understand how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: February 2026</p>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            At Afflux (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we respect your privacy and are committed to 
            protecting your personal information. This Privacy Policy explains how we collect, use, 
            and safeguard your data when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li><strong className="text-foreground">Usage Data:</strong> Information about how you access and use our website, including pages visited, time spent, and referring URLs.</li>
            <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, and device identifiers.</li>
            <li><strong className="text-foreground">Contact Information:</strong> If you contact us, we may collect your name, email address, and message content.</li>
            <li><strong className="text-foreground">Cookies:</strong> We use cookies and similar technologies to enhance your browsing experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Provide and maintain our website</li>
            <li>Improve user experience and content</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Respond to inquiries and support requests</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Affiliate Links & Third Parties</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website contains affiliate links to third-party products and services. When you click 
            these links, you may be redirected to external websites with their own privacy policies. 
            We are not responsible for the privacy practices of these third-party sites. We encourage 
            you to review their privacy policies before providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use cookies to improve your experience on our site. Cookies are small text files stored 
            on your device that help us understand how you use our website. You can control cookie 
            settings through your browser preferences. Disabling cookies may affect certain features 
            of our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction. However, 
            no method of transmission over the Internet is 100% secure, and we cannot guarantee 
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal data, 
            including the right to access, correct, or delete your information. To exercise these 
            rights, please contact us using the information provided below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this 
            page with an updated revision date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:privacy@afflux.dev" className="text-primary hover:underline">
              privacy@afflux.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
