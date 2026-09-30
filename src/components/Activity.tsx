"use client";

import { GitHubCalendar } from "react-github-calendar";
import "react-activity-calendar/tooltips.css";

const SHADES = ["#1c1c1f", "#4a4640", "#8f8b82", "#c9c4b8", "#e8e4da"];
const THEME = { dark: SHADES, light: SHADES };

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

function lastSixtyDays(days: Day[]): Day[] {
  const cutoff = new Date();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCDate(cutoff.getUTCDate() - 59);
  return days.filter((d) => new Date(d.date + "T00:00:00Z") >= cutoff);
}

function describe(day: { date: string; count: number }): string {
  const date = new Date(day.date + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

export function Activity() {
  return (
    <div className="activity text-xs">
      <GitHubCalendar
        username="rxsklife"
        transformData={lastSixtyDays}
        theme={THEME}
        colorScheme="dark"
        blockSize={11}
        blockMargin={3}
        fontSize={11}
        showColorLegend={false}
        tooltips={{ activity: { text: describe } }}
        labels={{ totalCount: "{{count}} contributions in the last 60 days" }}
        errorMessage="activity feed unreachable right now."
      />
    </div>
  );
}
