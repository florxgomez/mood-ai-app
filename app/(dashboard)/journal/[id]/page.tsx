import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });
  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);
  // rendering client component in server component and passing props to it, props has to be serializable
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
