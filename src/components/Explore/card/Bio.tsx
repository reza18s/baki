export function Bio({ bio, edit }: { bio: string; edit?: React.ReactNode }) {
  return (
    <div>
      <h1 className="flex items-center gap-2 text-sm text-gray-500">
        درباره من{edit}
      </h1>
      <span className="text-base font-medium text-black">{bio}</span>
    </div>
  );
}
