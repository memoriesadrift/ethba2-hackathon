import Image from "next/image"

type Props = {
  text: string
  imageUrl: string
}

export const AssetCell = ({ text, imageUrl }: Props) => (
  <div className="flex items-center gap-2">
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={`Image of ${text}`}
        objectFit="cover"
        layout="fill"
      />
    </div>
    <span>{text}</span>
  </div>
)
