export type portalSchema = {
  title: string;
  url: string;
};

export const portals: portalSchema[] = [
  {
    title: 'Chat',
    url: 'chat',
  },
  {
    title: 'Post',
    url: 'post',
  },
  {
    title: 'Attendance',
    url: 'attendance',
  },
];
