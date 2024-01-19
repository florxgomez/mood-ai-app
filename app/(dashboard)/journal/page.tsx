import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import Question from '@/components/Question';
import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      analysis: true,
      createdAt: true,
    },
  });
  // await analyze(
  //   'Today was a eh, ok day I guess. If found a new coffee shop that was cool but then I got a flat tire :)'
  // );
  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className="p-10 bg-violet-400/20 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="my-8">
        <Question />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
