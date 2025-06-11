'use client';

export default function PrivacyPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
        <p>
          We respect your privacy and collect only the minimal data required for
          this demonstration. Information such as your name and email is used
          solely for account creation and login purposes.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Use of Data</h2>
        <p>
          Data provided is never shared with third parties. It is stored
          temporarily and removed on a regular basis. This project exists to
          showcase the TalentScout concept and does not track usage beyond basic
          analytics.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p>
          We use cookies only for authentication. No advertising or marketing
          cookies are stored.
        </p>
      </section>
    </div>
  );
}
