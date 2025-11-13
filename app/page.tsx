"use client"
import { TeamGrid } from "@/components/team"
import TeamsSection from "./TeamSection"

export default function Home() {
  const imageData = [
    {
      id: "1",
      src: "/portfolio-image-1.jpg",
      alt: "Portfolio image 1",
      label: "Prashant",
    },
    {
      id: "2",
      src: "/portfolio-image-2.jpg",
      alt: "Portfolio image 2",
      label: "Siddharth",
    },
    {
      id: "3",
      src: "/portfolio-image-1.jpg",
      alt: "Portfolio image 1",
      label: "Prashant",
    },
  ]

  return (
      <div className="w-full min-h-screen bg-black flex flex-col gap-50 pt-25 pb-25 items-center justify-center">
    {/* <div className="w-[75vw] h-[75vh] bg-black "> */}
      <TeamGrid title="Website" images={imageData} backgroundImage="backgrounds/website-bg.png" />

      <TeamGrid title="Overall Lead" images={imageData} backgroundImage="backgrounds/lead-bg.png" />
      <TeamGrid title="Outreach" images={imageData} backgroundImage="backgrounds/outreach-bg.png" />
      <TeamGrid title="CR" images={imageData} backgroundImage="backgrounds/cr-bg.png" />
      <TeamGrid title="Logistics" images={imageData} backgroundImage="backgrounds/logistics-bg.png" />
      <TeamGrid title="Media" images={imageData} backgroundImage="backgrounds/media-bg.png" />

      {/* </div> */}
     </div>
  )
}
