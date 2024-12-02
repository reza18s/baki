import { RandomUser, User } from '@/graphql/generated/graphql.codegen';
import {
  AmountOfEarlyRising,
  gender,
  MaritalStatus,
  smokeStatus,
  spiritStatus,
  sportStatus,
} from '@/constants';

export const getBaseInfo = (user: RandomUser | User) => {
  return [
    gender?.find((val) => val.value === user.gender)?.label,
    spiritStatus?.find((val) => val.value === user.spiritStatus)?.label,
    sportStatus?.find((val) => val.value === user.sportsStatus)?.label,
    MaritalStatus?.find((val) => val.value === user.maritalStatus)?.label,
    AmountOfEarlyRising?.find((val) => val.value === user.AmountOfEarlyRising)
      ?.label,
    smokeStatus?.find((val) => val.value === user.smokeStatus)?.label,
  ].filter((val) => val);
};
