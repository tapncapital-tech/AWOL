export interface RepProfile {
  rep_id: string;
  rep_name: string;
  rep_title: string;
  rep_number: string;
  rep_email: string;
  avatar_initials: string;
}

export const DEFAULT_REP_ID = "sylvester";

export const REP_ROSTER: Record<string, RepProfile> = {
  sylvester: {
    rep_id: "sylvester",
    rep_name: "Sylvester Moore El",
    rep_title: "Lead AI Architect",
    rep_number: "(202) 618-1204",
    rep_email: "tech@agentworkforce.online",
    avatar_initials: "SM",
  },
  robert: {
    rep_id: "robert",
    rep_name: "Robert Sam",
    rep_title: "Sales Director",
    rep_number: "1(972) 559-9447",
    rep_email: "tech@agentworkforce.online",
    avatar_initials: "R",
  },
};

export function getRepProfile(repId?: string | null): RepProfile {
  if (!repId) {
    return REP_ROSTER[DEFAULT_REP_ID];
  }
  const cleanId = repId.toLowerCase().trim();
  return REP_ROSTER[cleanId] || REP_ROSTER[DEFAULT_REP_ID];
}

export function getRepContextArray(rep: RepProfile): [string, string, string] {
  return [rep.rep_name, rep.rep_number, rep.rep_email];
}
