import { AboutProfile } from './AboutProfile.type';

export interface AboutLeadership{
  kicker?: string,
  heading?: string,
  subhead?: string,
  profiles: AboutProfile[],
}
