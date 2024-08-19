import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function NotFound() {
  return (
    <html lang="en">
      <body
        className={`${inter.className}bg-neutral-100 dark:bg-neutral-900 transition-colors duration-200flex items-center justify-center h-screen`}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}