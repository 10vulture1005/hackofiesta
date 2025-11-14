import { crTeam } from "@/constants/teams/cr"
import { websiteTeam } from "@/constants/teams/website"
import { lead } from "@/constants/teams/lead"
import { outReachTeam } from "@/constants/teams/outreach"
import { logisticsTeam } from "@/constants/teams/logistics"
import { mediaTeam } from "@/constants/teams/media"
import { designTeam } from "@/constants/teams/design"
import { techTeam } from "@/constants/teams/tech"
import { Member } from "@/interface/member"

export interface Team {
    name: string;
    images: Member[];
    backgroundImage: string;
}

export const Teams: Team[] = [
    {
        name: "Overall Lead",
        images: lead,
        backgroundImage: "backgrounds/lead-bg.png"
    },
    {
        name: "Design",
        images: designTeam,
        backgroundImage: "backgrounds/design-bg.png"
    },
    {
        name: "Website",
        images: websiteTeam,
        backgroundImage: "backgrounds/website-bg.png"
    },
    {
        name: "Outreach",
        images: outReachTeam,
        backgroundImage: "backgrounds/outreach-bg.png"
    },
    {
        name: "CR",
        images: crTeam,
        backgroundImage: "backgrounds/cr-bg.png"
    },
    {
        name: "Logistics",
        images: logisticsTeam,
        backgroundImage: "backgrounds/logistics-bg.png"
    },
    {
        name: "Media",
        images: mediaTeam,
        backgroundImage: "backgrounds/media-bg.png"
    },
    {
        name:   "Technical",
        images: techTeam,
        backgroundImage: "backgrounds/tech-bg.png"
    }
];
