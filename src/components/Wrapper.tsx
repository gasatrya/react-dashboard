interface Wrapper {
  title?: string
  children?: React.ReactNode
}

export default function Wrapper({ title, children }: Wrapper) {
  return (
    <div>
      {title && <h2 className="text-xl mb-3">{title}</h2>}
      <div className="relative">
        <div className="relative z-10">{children}</div>

        {/* <div className="card absolute w-full h-full top-0 left-0 right-0 bottom-0 z-0">
          <div className="card-before card-after absolute before:left-0 before:top-0 after:left-0 after:top-0"></div>
          <div className="card-before card-after absolute right-0 before:right-0 before:top-0 after:right-0 after:top-0"></div>
          <div className="card-before card-after absolute left-0 bottom-0 before:left-0 before:bottom-0 after:left-0 after:bottom-0"></div>
          <div className="card-before card-after absolute right-0 bottom-0 before:right-0 before:bottom-0 after:right-0 after:bottom-0"></div>
        </div> */}
      </div>
    </div>
  )
}
