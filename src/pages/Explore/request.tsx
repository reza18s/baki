import Button from '@/components/base/Button/Button';
import { customToast } from '@/components/base/toast';
import { IcCase } from '@/components/icons/IcCase';
import { IcChair } from '@/components/icons/IcChair';
import {
  RequestType,
  useCreateRequestMutation,
  useGetMeQuery,
  useGetRequestQuery,
  useGetRequestsQuery,
} from '@/graphql/generated/graphql.codegen';
import React from 'react';

export const Request = ({
  id,
  searchType,
}: {
  id: string;
  searchType?: string;
}) => {
  const { data: me } = useGetMeQuery();
  const { data: requests } = useGetRequestsQuery({ variables: { me: true } });
  const request = requests?.getRequests.find(
    (r) => r.requesterId === me?.getMe.id && r.receiverId === id,
  );
  const [createRequest, { loading: requestLoading }] =
    useCreateRequestMutation();
  const [createRequest2, { loading: requestLoading2 }] =
    useCreateRequestMutation();
  console.log(request);
  return request?.status !== 'accept' ? (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6">
      {request ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-4">
          {request.type === 'companionRequest' && (
            <IcChair className="size-12"></IcChair>
          )}
          {request.type === 'hostingInvitation' && (
            <IcCase className="size-12"></IcCase>
          )}
          <h1 className="text-sm font-bold">
            {request.type === 'companionRequest'
              ? 'درخواست همسفری شما ارسال شد.'
              : request.type === 'hostingInvitation'
                ? 'درخواست میزبانی شما ارسال شد.'
                : 'درخواست شما ارسال شد.'}
          </h1>
        </div>
      ) : (
        <>
          {' '}
          <Button
            variant="outline"
            className="flex h-10 w-[230px] items-center justify-center gap-1 border-gray-300 bg-white p-0 text-sm font-medium"
            onClick={() => {
              createRequest({
                variables: {
                  receiverId: id,
                  searchType: searchType || 'random',
                  type: 'companionRequest' as RequestType,
                },
                onCompleted: () => {
                  customToast('دعوت با موفقیت ارسال شد', 'success');
                },
                onError: () => {
                  customToast('مشکلی پیش امد لطفا دوباره امتحان کنید', 'error');
                },
              });
            }}
            loading={requestLoading}
          >
            <IcCase></IcCase>
            ارسال درخواست همسفری
          </Button>
          <Button
            variant="outline"
            className="flex h-10 w-[230px] items-center justify-center gap-1 border-gray-300 bg-white p-0 text-sm font-medium"
            onClick={() => {
              createRequest2({
                variables: {
                  receiverId: id,
                  searchType: searchType || 'random',
                  type: 'hostingInvitation' as RequestType,
                },
                onCompleted: () => {
                  customToast('دعوت با موفقیت ارسال شد', 'success');
                },
                onError: (err) => {
                  customToast(err.message, 'error');
                },
              });
            }}
            loading={requestLoading2}
          >
            <IcChair></IcChair>ارسال دعوت میزبانی
          </Button>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};
