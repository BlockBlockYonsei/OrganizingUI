export interface ExecutiveMember {
  id: string;
  club_class: number;
  member_type: string;
}

export type ExecutiveMemberType =
  | "President"
  | "VicePresident"
  | "Treasurer"
  | "PlanningTeamLeader"
  | "PlanningTeamMember"
  | "MarketingTeamLeader"
  | "MarketingTeamMember";
