import type { Metadata } from 'next';
// Import existing fonts
import { Geist, Geist_Mono, Roboto } from 'next/font/google'; // <-- Add Roboto here
import './globals.css';
import Header from './Header';

// Configure existing fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Configure the Roboto font
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'], // Match the full range from the link (100..900)
  style: ['normal', 'italic'], // Match the styles from the link
  subsets: ['latin'],
  variable: '--font-roboto', // Define a CSS variable for easy use
});

export const metadata: Metadata = {
  title: 'Home | Mohammad Mashouka',
  description: 'DESIGNER - ARTIST',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Add the new font variable to the body class list
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <Header />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
