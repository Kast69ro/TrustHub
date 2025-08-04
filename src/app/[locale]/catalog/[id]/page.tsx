'use client'
import ResourceDetailPage from "@/components/resource-by-id/resourse"
import { useParams } from "next/navigation"

export default function ResourceById() {
  const params = useParams()
  const idParam = params.id

  const resourceId = Array.isArray(idParam) ? idParam[0] : idParam

  if (!resourceId) {
    return <div>Resource ID is missing</div>
  }

  return (
    <div>
      <ResourceDetailPage id={resourceId} />
    </div>
  )
}
