import { RandomUser } from '@/graphql/generated/graphql.codegen';
import {
  AmountOfEarlyRising,
  gender,
  MaritalStatus,
  smokeStatus,
  spiritStatus,
  sportStatus,
} from '@/lib/constants';

export const getBaseInfo = (user: RandomUser) => {
  return [
    gender.find((val) => val.value === user.gender)!.label,
    spiritStatus.find((val) => val.value === user.spiritStatus)!.label,
    sportStatus.find((val) => val.value === user.sportsStatus)!.label,
    MaritalStatus.find((val) => val.value === user.maritalStatus)!.label,
    AmountOfEarlyRising.find((val) => val.value === user.AmountOfEarlyRising)!
      .label,
    smokeStatus.find((val) => val.value === user.smokeStatus)!.label,
  ];
};
