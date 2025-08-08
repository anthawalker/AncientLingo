import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>AncientLingo</title>
        <meta name="description" content="Learn ancient languages on web and mobile" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to AncientLingo</h1>
        <p className="mt-4 text-center text-gray-600 max-w-xl">
          This is the beginning of the AncientLingo web application.  Start building your learning
          path, browse the library of ancient texts, and track your vocabulary bank here!
        </p>
      </main>
    </>
  );
}