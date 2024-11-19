export function Bio({ bio }: { bio: string }) {
  return (
    <div>
      <h1 className="text-sm text-gray-500">درباره من</h1>
      <span className="text-base font-medium text-black">{bio}</span>
    </div>
  );
}
