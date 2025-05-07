export const dynamic = 'force-static';
import Posts from './posts/page';
import './globals.css';
import Link from 'next/link';
export default function Home({ searchParams }) {
  return (
    <div>
      <Link href={'/about'}>about page</Link>
      <Posts searchParams={searchParams} />
    </div>
  );
}
