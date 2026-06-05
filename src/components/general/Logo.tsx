import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/images/logo.png" alt="Logo" width={70} height={70}/>
    </Link>
  )
}
