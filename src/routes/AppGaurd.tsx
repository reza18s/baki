import React, { PropsWithChildren, useEffect, useState } from 'react';
import { paths } from './paths';
import { DotesLoading } from '@/components/base/Loader/Loader';
import { GetMeQuery, useGetMeQuery } from '@/graphql/generated/graphql.codegen';
import { useLocalStore } from '@/store/useLocalStore';
import { useHistory } from 'react-router';
import { Page } from '@/components/layout/Page';

type GuardState = 'normal' | 'loading' | 'offline';

const AppGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState<GuardState>('loading');
  const updateUserInfo = useLocalStore((s) => s.updateUserInfo);
  const setSteps = useLocalStore((s) => s.setSteps);

  const { data, refetch } = useGetMeQuery({
    onError(err) {
      if (err.message == 'Failed to fetch') {
        return;
      }
      setSteps(0);
      history.push(paths.welcome.main);
      setState('normal');
    },
  });

  useEffect(() => {
    if (data?.getMe) {
      const getMe = data.getMe;
      updateUserInfo(getMe);
      setState('normal');
    }
  }, [data, refetch]);

  return (
    <>
      {state === 'loading' ? (
        <Page contentClassName="h-full bg-brand-yellow">
          <div className="flex h-full w-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center">
              <svg
                width="375"
                height="812"
                viewBox="0 0 375 812"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="375" height="812" rx="24" fill="#FFCC4E" />
                <path
                  d="M231.436 397.278C229.069 397.278 227.234 395.502 227.234 393.312C227.234 390.293 229.602 388.044 232.738 388.044C235.165 388.044 237 389.702 237 392.01C237 395.028 234.692 397.278 231.436 397.278ZM229.698 421.993C229.38 422.902 228.522 423.511 227.559 423.511C226.547 423.511 225.721 422.7 225.703 421.688L225.41 405.203C225.371 403.009 226.563 400.977 228.498 399.942L229.158 399.588C230.428 398.909 231.942 398.86 233.254 399.456C235.375 400.421 236.409 402.845 235.639 405.045L229.698 421.993Z"
                  fill="#1A1D1E"
                />
                <path
                  d="M222.118 407.183C222.118 410.289 220.725 412.759 217.938 414.624C216.9 415.319 216.464 416.694 217.109 417.764L218.652 420.323C219.499 421.727 218.488 423.518 216.847 423.518H211.718C210.973 423.518 210.284 423.126 209.905 422.485L207.123 417.79C206.868 417.361 206.775 416.856 206.858 416.365L207.142 414.68C207.314 413.666 208.201 412.963 209.213 412.783C211.395 412.396 212.47 411.209 212.47 409.254C212.47 408.408 212.198 407.743 211.632 407.282C211.168 406.903 210.505 406.979 210.002 407.304C207.251 409.082 204.573 412.486 203.71 417.067L202.89 421.773C202.714 422.782 201.838 423.518 200.814 423.518H196.221C194.91 423.518 193.917 422.335 194.146 421.044L199.634 390.047C199.803 389.092 200.603 388.375 201.571 388.312L206.235 388.005C207.6 387.915 208.687 389.129 208.448 390.476L206.729 400.139L205.791 404.165C205.686 404.614 206.254 404.865 206.516 404.485C208.128 402.142 209.814 399.975 212.944 399.725C217.546 399.357 222.118 402.98 222.118 407.183Z"
                  fill="#1A1D1E"
                />
                <path
                  d="M182.87 399.03C185.278 399.03 187.497 399.237 189.517 399.642C192.094 400.159 193.506 402.762 193.065 405.354L190.588 419.894C190.232 421.981 188.424 423.507 186.307 423.507H184.487C182.722 423.507 181.389 421.907 181.708 420.17C181.817 419.578 181.079 419.271 180.733 419.764C179.367 421.71 178.003 423.291 175.412 423.507C170.608 423.909 167.422 419.368 167.422 414.106C167.422 409.849 168.842 406.243 171.624 403.346C174.406 400.449 178.135 399.03 182.87 399.03ZM176.815 413.845C176.991 415.534 178.992 415.618 180.177 414.403C181.851 412.687 183.312 410.147 183.817 407.248C183.923 406.61 183.617 405.943 182.98 405.832C182.736 405.789 182.482 405.77 182.219 405.77C180.739 405.77 179.437 406.538 178.372 408.017C177.306 409.554 176.773 411.209 176.773 412.983C176.773 413.294 176.787 413.581 176.815 413.845Z"
                  fill="#1A1D1E"
                />
                <path
                  d="M161.573 405.876C161.139 406.116 161.149 406.79 161.583 407.031C163.864 408.3 165.004 410.182 165.004 412.679C165.004 415.994 163.584 418.598 160.684 420.551C157.783 422.504 153.995 423.511 149.26 423.511H139.108C137.797 423.511 136.804 422.326 137.033 421.035L142.027 392.874C142.205 391.868 143.08 391.135 144.102 391.135H154.291C162.518 391.135 166.129 394.213 166.129 398.711C166.129 401.824 164.624 404.184 161.573 405.876ZM153.167 397.764H152.099C151.074 397.764 150.198 398.502 150.023 399.512L149.687 401.453C149.464 402.741 150.456 403.919 151.764 403.919H151.865C154.528 403.919 156.304 402.44 156.304 400.25C156.304 398.652 155.12 397.764 153.167 397.764ZM147.382 414.413C147.158 415.702 148.15 416.882 149.458 416.882H150.148C153.522 416.882 155.475 415.461 155.475 413.094C155.475 411.318 154.173 410.43 151.509 410.43H149.848C148.824 410.43 147.948 411.167 147.772 412.176L147.382 414.413Z"
                  fill="#1A1D1E"
                />
              </svg>
            </div>
            <div className="flex h-10 justify-center">
              <DotesLoading className="bg-gray-800" size="h-2 w-2" />
            </div>
          </div>
        </Page>
      ) : (
        children
      )}
    </>
  );
};

const checkUserInfo = (getMeData: GetMeQuery['getMe']) => {
  return (
    getMeData?.name &&
    getMeData?.gender &&
    getMeData.birthday &&
    getMeData.province &&
    (getMeData.travelInterests?.length || 0) >= 5 &&
    (getMeData.personalInterests?.length || 0) >= 5 &&
    (getMeData.mySpecialty?.length || 0) >= 1
  );
};

export default AppGuard;
