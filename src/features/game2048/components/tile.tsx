type TileProp = {
  value: number;
  row: number;
  col: number;
};

export function Tile({ value, row, col }: TileProp) {
  if (value == 0) return null;

  return (
    <div
      className={`tile tile-${value}`}
      style={{
        gridColumn: col + 1,
        gridRow: row + 1,
      }}
    >
      {value}
    </div>
  );
}
