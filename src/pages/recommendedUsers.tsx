import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { LikeCard } from '@/components/notifications/likeCard';
import { useRecommendedUsersQuery } from '@/graphql/generated/graphql.codegen';
import { paths } from '@/routes/paths';
import { useIonRouter } from '@ionic/react';
import React from 'react';

export const RecommendedUsers = () => {
  const { data } = useRecommendedUsersQuery();
  const hs = useIonRouter();
  return (
    <Page
      header={<AppBar title="همسفران پیشنهادی" backButt={false}></AppBar>}
      contentClassName="p-6 pt-16"
    >
      <div className="relative grid grid-cols-2 gap-4">
        {data?.recommendedUsers.map((recommendedUser) => (
          <LikeCard
            key={recommendedUser.id}
            user={recommendedUser}
            onClick={() =>
              hs.push(
                paths.recommendedUsers.profile.exactPath(recommendedUser.id),
              )
            }
          ></LikeCard>
        ))}
      </div>
    </Page>
  );
};
