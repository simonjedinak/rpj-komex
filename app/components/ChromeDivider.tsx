export default function ChromeDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`flex flex-row ${className} h-full w-[2.5px] blur-[1px] rounded-2xl overflow-clip`}
    >
      <span className="bg-[#ffffff] flex-1 w-1/2"></span>
      <span className="bg-[#282828] flex-1 w-1/2"></span>
    </span>
  );
}
