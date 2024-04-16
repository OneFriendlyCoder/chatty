import { db } from "@/lib/db";
export default async function Home() {

  await db.set('hello', 'hello');
  return (
    <div>
      this is a new chat app
    </div>
  );
}
