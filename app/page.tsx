"use client"
import { TeamGrid } from "@/components/team"
import TeamsSection from "./TeamSection"
import { Team, Teams } from "@/constants/teams/all";


import Header from "@/components/header";
import SplashScreen from "@/components/splash-screen";

export default function Home() {

  return (
    <>
        <Header />
        <SplashScreen />
        <main className="min-h-screen w-full bg-black font-sans">
        <div className="min-h-screen flex flex-col gap-50 pt-25 pb-25 items-center justify-center">
            <TeamsSection />
            {Teams.map((team: Team) => (
                <TeamGrid
                    key={team.name}
                    title={team.name}
                    images={team.images}
                    backgroundImage={team.backgroundImage}
                />
            ))}
        </div>
        </main>
    </>
  );
}
