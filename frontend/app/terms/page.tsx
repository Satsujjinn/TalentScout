'use client';

export default function TermsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
        <p>
          By accessing this demo you agree to use it solely for evaluation
          purposes. The application is provided "as is" with no warranties or
          guarantees.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">User Conduct</h2>
        <p>
          Please refrain from uploading sensitive information. All content should
          be considered public and temporary.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          TalentScout is not liable for any damages arising from use of this
          demonstration site.
        </p>
      </section>
    </div>
  );
}
