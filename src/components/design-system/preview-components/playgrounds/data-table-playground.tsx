import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ArrowUpDownIcon,
  SearchIcon,
  ColumnsIcon,
} from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

const PRODUCTS: Product[] = [
  { id: "P-001", name: "Ceramic Vase", category: "Decor", price: 48, stock: 120, status: "In Stock" },
  { id: "P-002", name: "Linen Throw", category: "Textiles", price: 65, stock: 45, status: "Low Stock" },
  { id: "P-003", name: "Pendant Lamp", category: "Lighting", price: 120, stock: 78, status: "In Stock" },
  { id: "P-004", name: "Oak Side Table", category: "Furniture", price: 280, stock: 0, status: "Out of Stock" },
  { id: "P-005", name: "Wool Rug", category: "Textiles", price: 190, stock: 32, status: "Low Stock" },
  { id: "P-006", name: "Brass Candle Holder", category: "Decor", price: 35, stock: 200, status: "In Stock" },
  { id: "P-007", name: "Floor Lamp", category: "Lighting", price: 340, stock: 15, status: "Low Stock" },
  { id: "P-008", name: "Marble Coasters", category: "Decor", price: 22, stock: 350, status: "In Stock" },
  { id: "P-009", name: "Leather Chair", category: "Furniture", price: 890, stock: 8, status: "Low Stock" },
  { id: "P-010", name: "Silk Cushion", category: "Textiles", price: 55, stock: 120, status: "In Stock" },
  { id: "P-011", name: "Concrete Planter", category: "Decor", price: 38, stock: 65, status: "In Stock" },
  { id: "P-012", name: "Desk Lamp", category: "Lighting", price: 95, stock: 42, status: "In Stock" },
  { id: "P-013", name: "Bookshelf", category: "Furniture", price: 450, stock: 0, status: "Out of Stock" },
  { id: "P-014", name: "Cotton Blanket", category: "Textiles", price: 85, stock: 90, status: "In Stock" },
  { id: "P-015", name: "Wall Mirror", category: "Decor", price: 160, stock: 25, status: "Low Stock" },
]

const COLUMNS = [
  { key: "name" as const, label: "Product Name", sortable: true },
  { key: "category" as const, label: "Category", sortable: true },
  { key: "price" as const, label: "Price", sortable: true },
  { key: "stock" as const, label: "Stock", sortable: true },
  { key: "status" as const, label: "Status", sortable: false },
]

const PAGE_SIZES = [5, 10, 15]

export default function DataTablePlayground() {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<keyof Product | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(COLUMNS.map((c) => c.key))
  )

  const filtered = useMemo(() => {
    let data = PRODUCTS
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      )
    }
    if (sortKey) {
      data = [...data].sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }
        return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
      })
    }
    return data
  }, [search, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / pageSize)
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  function toggleSort(key: keyof Product) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  function toggleAll() {
    if (selected.size === pageData.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(pageData.map((p) => p.id)))
    }
  }

  function toggleRow(id: string) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
    "In Stock": "default",
    "Low Stock": "secondary",
    "Out of Stock": "destructive",
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-7 pl-6 text-xs"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
              <ColumnsIcon className="size-3" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {COLUMNS.map((col) => (
              <DropdownMenuCheckboxItem
                key={col.key}
                checked={visibleColumns.has(col.key)}
                onCheckedChange={(checked) => {
                  const next = new Set(visibleColumns)
                  if (checked) next.add(col.key)
                  else next.delete(col.key)
                  setVisibleColumns(next)
                }}
                className="text-xs"
              >
                {col.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox
                  checked={selected.size === pageData.length && pageData.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {COLUMNS.filter((c) => visibleColumns.has(c.key)).map((col) => (
                <TableHead
                  key={col.key}
                  className={`text-xs h-8 ${col.sortable ? "cursor-pointer select-none" : ""}`}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      sortKey === col.key ? (
                        <ArrowUpDownIcon className="size-3 text-primary" />
                      ) : (
                        <ChevronsUpDownIcon className="size-3 text-muted-foreground/40" />
                      )
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((product) => (
              <TableRow key={product.id} className={selected.has(product.id) ? "bg-muted/30" : ""}>
                <TableCell className="py-1.5">
                  <Checkbox
                    checked={selected.has(product.id)}
                    onCheckedChange={() => toggleRow(product.id)}
                  />
                </TableCell>
                {COLUMNS.filter((c) => visibleColumns.has(c.key)).map((col) => (
                  <TableCell key={col.key} className="py-1.5 text-xs">
                    {col.key === "price" ? `$${product.price}` : col.key === "status" ? (
                      <Badge variant={statusVariant[product.status]} className="text-xs px-1.5 py-0 h-4">
                        {product.status}
                      </Badge>
                    ) : (
                      product[col.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {filtered.length} products · {selected.size} selected
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <p className="text-xs text-muted-foreground">Rows:</p>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
              className="h-5 rounded border border-border bg-transparent px-1 text-xs text-foreground"
            >
              {PAGE_SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeftIcon className="size-3" />
            </Button>
            <span className="min-w-8 text-center text-xs text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-xs"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRightIcon className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
