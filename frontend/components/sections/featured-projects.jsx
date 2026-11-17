import { getProjects } from "@/service/project.service"
import { FeaturedProjectsClient } from "./featured-projects-client"

export async function FeaturedProjects() {
  let projects = []
  try {
    const data = await getProjects()
    if (data?.success) {
      const allProjects = data.data || data.projects || []
      projects = allProjects.filter(p => p.isFeatured).slice(0, 3)
      if (projects.length === 0) {
        projects = allProjects.slice(0, 3) // Fallback to first 3 if none featured
      }
    }
  } catch (error) {
    console.error("Failed to fetch featured projects:", error)
  }

  return <FeaturedProjectsClient projects={projects} />
}
