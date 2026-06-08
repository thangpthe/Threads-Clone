interface PostButtonProps{
    title: string;
    onClick?:() => void;
    disabled?: boolean;
}

export default function PostButton({title,onClick,disabled}:PostButtonProps) {
  return (
    <button className={`border border-border px-3 py-1 rounded-lg text-white font-semibold cursor-pointer hover:bg-surface-hover transition ${disabled ? "opacity-50":""}`}>

    </button>
  )
}
