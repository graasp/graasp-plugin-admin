export type Role = {
  id: string,
  name: string,
};

export type MemberRole = {
  id: string,
  memberId: string,
  roleId: string,
};
