export interface AboutStats {
  id: string,
  value?: string,
  label?: string,
}

export interface AboutStatsList {
  heading?: string,
  text?: string,
  stats: AboutStats[],
}
