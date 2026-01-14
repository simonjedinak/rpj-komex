export default function SvgBar({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1036.83 67.22"
      preserveAspectRatio="none"
      className={"absolute inset-x-0 h-20 w-full" + ` ${className}`}
      fill="#f90101"
    >
      <path d="M518.42,0c301.56,0,518.42,67.22,518.42,67.22H0S216.86,0,518.42,0Z" />
    </svg>
  );
}
