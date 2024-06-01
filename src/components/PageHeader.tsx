import { ChevronRight } from 'lucide-react'

interface PageHeader {
  page: string
  desc: string
  parent?: string
}

export default function PageHeader({ page, desc, parent }: PageHeader) {
  return (
    <>
      <div className="text-sm capitalize mb-4 flex items-center gap-x-2">
        {parent && (
          <span className="flex items-center gap-x-2">
            {parent} <ChevronRight size={14} />{' '}
          </span>
        )}{' '}
        <span className="text-primary font-semibold">{page}</span>
      </div>

      <div className="flex gap-4 border-b border-border pb-4 mb-4  items-center">
        <h1 className="text-3xl">{page}</h1>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>
    </>
  )
}
