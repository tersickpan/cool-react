export default function BaseImagePreview({ src, alt = "image preview" }) {
  return (
    <div className="max-w-md mx-auto">
      <img
        src={src}
        alt={alt}
        className="rounded-2xl shadow-xl w-full object-cover"
      />
    </div>
  )
}