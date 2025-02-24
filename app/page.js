export const dynamic = "force-static";
import Posts from "./posts/page";
import './globals.css'
export default function Home({searchParams}) {
  return (
    <div>
      <Posts searchParams={searchParams}/>
    </div>
  );
}
