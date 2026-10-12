"use client";

import { GitHubCalendar } from "react-github-calendar";
import { Scaler } from "@/components/Scaler";
import "react-activity-calendar/tooltips.css";

export const CALENDAR_WIDTH = 329;
const CALENDAR_HEIGHT = 180;
const BLOCK_SIZE = 17;
const BLOCK_MARGIN = 7;

const SHADES = ["#12211a", "#1d5a2c", "#2f9e3a", "#55d64f", "#39ff14"];
const THEME = { dark: SHADES, light: SHADES };

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

function lastNinetyDays(days: Day[]): Day[] {
  const cutoff = new Date();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCDate(cutoff.getUTCDate() - 89);
  return days.filter((d) => new Date(d.date + "T00:00:00Z") >= cutoff);
}

function describe(day: { date: string; count: number }): string {
  const date = new Date(day.date + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

export function Activity() {
  return (
    <Scaler width={CALENDAR_WIDTH} height={CALENDAR_HEIGHT}>
      <div className="activity text-xs">
        <GitHubCalendar
          username="rxsklife"
          transformData={lastNinetyDays}
          theme={THEME}
          colorScheme="dark"
          blockSize={BLOCK_SIZE}
          blockMargin={BLOCK_MARGIN}
          fontSize={11}
          showColorLegend={false}
          tooltips={{ activity: { text: describe } }}
          labels={{ totalCount: "{{count}} contributions in the last 90 days" }}
          errorMessage="activity feed unreachable right now."
        />
      </div>
    </Scaler>
  );
}
