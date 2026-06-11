export function BulletList({ items }) {
  return (
    <div className="reason-list">
      {items.map((item) => (
        <div key={item}>
          <span />
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
