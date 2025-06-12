import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section className="hero">
        <h1>Welcome to TalentScout</h1>
        <p>Connect with athletes and recruiters around the world.</p>
        <div className="actions">
          <Link href="/login" className="btn">Login</Link>
          <Link href="/signup" className="btn primary">Sign Up</Link>
        </div>
      </section>
    </Layout>
  );
}
