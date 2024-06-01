interface PageHeader {
  page: string
  desc: string
  parent?: string
}

export default function PageHeader({ page, desc, parent }: PageHeader) {
  return (
    <>
      <div className="text-sm capitalize mb-4">
        {parent && <span>{parent} / </span>}{' '}
        <span className="text-primary font-semibold">{page}</span>
      </div>

      <div className="flex gap-4 border-b border-border pb-4 mb-4 items-center">
        <h1 className="text-3xl font-bold">{page}</h1>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>
    </>
  )
}
