import { Breadcrumb } from '../../components/Breadcrumb'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tools = [
  { id: 'conversion', name: 'Conversión de Tasas' },
  //{ id: 'amortization', name: 'Amortización de Crédito' },
  //{ id: 'salud-financiera', name: 'Salud Financiera' },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-22 py-8 sm:px-2">
        <Breadcrumb items={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/herramientas' },
        ]} />
        <h1 className="text-3xl font-bold mt-4 mb-8">Todas las Herramientas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>Descripción breve de la herramienta</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/herramientas/${tool.id}`}>
                  <Button 
                    className="w-full bg-[#fe9800] hover:bg-yellow-600"
                  >
                    Usar herramienta
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

