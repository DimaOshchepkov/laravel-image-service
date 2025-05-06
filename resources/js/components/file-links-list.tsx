type Props = {
  temporaryLinks: string[];
  usedLinks: string[];
};

export default function FileLinksList({ temporaryLinks, usedLinks }: Props) {
  const hasLinks = temporaryLinks.length > 0 || usedLinks.length > 0;

  if (!hasLinks) {
    return <p className="text-muted-foreground text-sm">No links</p>;
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Created links:</p>
      <ul className="space-y-1 text-sm">
        {temporaryLinks.map((link) => (
          <li key={link}>
            <div className="text-blue-600 underline">{link}</div>
          </li>
        ))}
        {usedLinks.map((link) => (
          <li key={link}>
            <div className="text-blue-600 line-through">{link}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
