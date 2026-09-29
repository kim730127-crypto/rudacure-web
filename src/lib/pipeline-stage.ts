/* Development stage per asset, language independent. Index into PIPELINE_STAGES.
   Derived from each asset's public status line, not from a percentage.
   RCI001AH ("PoC complete / animal trial prep") is placed at Preclinical and
   RC0125 AAV ("optimization") at Discovery; confirm with the programme owner. */
export const PIPELINE_STAGES = ["Disc", "Pre", "P1", "P2", "P3", "NDA"] as const;

export const STAGE_BY_ASSET: Record<string, number> = {
  RCI001: 3,
  RCI001AH: 1,
  RCI002: 1,
  RCI003: 0,
  "RC0125 AAV": 0,
};
