import React from 'react';
import { DotesLoading } from './Loader';
import { Page } from '@/components/layout/Page';

export const LoaderPage = () => {
  return (
    <Page contentClassName="h-[100dvh] bg-brand-yellow flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center">
        <svg
          width="100"
          height="36"
          viewBox="0 0 100 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M94.4363 9.27759C92.0688 9.27759 90.234 7.50195 90.234 5.312C90.234 2.29341 92.6015 0.0442624 95.7385 0.0442624C98.1652 0.0442624 100 1.70153 100 4.00986C100 7.02844 97.6917 9.27759 94.4363 9.27759ZM92.6982 33.9934C92.3797 34.9022 91.5218 35.5107 90.5587 35.5107C89.5468 35.5107 88.7214 34.6999 88.7034 33.6881L88.4097 17.2028C88.3706 15.0086 89.563 12.9771 91.4978 11.9415L92.1576 11.5884C93.4278 10.9086 94.9423 10.8597 96.2537 11.4563C98.375 12.4214 99.4095 14.8455 98.6386 17.0448L92.6982 33.9934Z"
            fill="#1A1D1E"
          />
          <path
            d="M85.1179 19.1826C85.1179 22.2891 83.7246 24.7588 80.9381 26.6242C79.9003 27.3188 79.4637 28.6944 80.1086 29.7637L81.652 32.323C82.4989 33.7274 81.4875 35.5185 79.8474 35.5185H74.7178C73.9734 35.5185 73.2844 35.1258 72.9049 34.4855L70.1226 29.7903C69.8685 29.3615 69.7746 28.8564 69.8577 28.3649L70.1425 26.6799C70.3138 25.666 71.2008 24.9631 72.2132 24.7832C74.3949 24.3956 75.4702 23.2089 75.4702 21.2542C75.4702 20.408 75.1981 19.7433 74.6321 19.2817C74.1682 18.9032 73.5051 18.9788 73.0023 19.3038C70.2511 21.0824 67.5728 24.4857 66.7104 29.067L65.8901 33.7731C65.7142 34.7821 64.8383 35.5185 63.8141 35.5185H59.2208C57.91 35.5185 56.9173 34.3345 57.1458 33.0438L62.6343 2.04682C62.8035 1.09156 63.6029 0.375207 64.571 0.311521L69.2349 0.00468676C70.6 -0.0851253 71.6875 1.12949 71.4479 2.47644L69.729 12.1392L68.791 16.1646C68.6863 16.6141 69.2543 16.8653 69.5159 16.4851C71.128 14.1419 72.8142 11.9751 75.9437 11.7249C80.5462 11.3569 85.1179 14.9802 85.1179 19.1826Z"
            fill="#1A1D1E"
          />
          <path
            d="M45.8698 11.0296C48.278 11.0296 50.4972 11.2373 52.5167 11.642C55.0942 12.1585 56.506 14.7625 56.0646 17.3539L53.5878 31.8943C53.2324 33.9809 51.4241 35.5072 49.3074 35.5072H47.4871C45.7217 35.5072 44.3885 33.9065 44.7078 32.1702C44.8167 31.578 44.0791 31.2714 43.7332 31.7643C42.3675 33.7103 41.0029 35.2907 38.4122 35.5072C33.6077 35.9087 30.4218 31.3685 30.4218 26.1064C30.4218 21.8494 31.8423 18.2428 34.6241 15.3457C37.406 12.4486 41.1348 11.0296 45.8698 11.0296ZM39.8147 25.8455C39.9906 27.5339 41.9916 27.618 43.1771 26.4031C44.8512 24.6873 46.3122 22.1467 46.8169 19.2479C46.9233 18.6099 46.617 17.943 45.9798 17.8318C45.7358 17.7891 45.4821 17.7698 45.2188 17.7698C43.7391 17.7698 42.4369 18.5384 41.3716 20.0165C40.3062 21.5538 39.7735 23.2093 39.7735 24.983C39.7735 25.2937 39.7871 25.581 39.8147 25.8455Z"
            fill="#1A1D1E"
          />
          <path
            d="M24.5725 17.8755C24.139 18.1159 24.1493 18.7904 24.5826 19.0313C26.8637 20.2998 28.0043 22.1825 28.0043 24.6793C28.0043 27.9938 26.5837 30.5981 23.6835 32.5513C20.7833 34.5045 16.9953 35.5107 12.2603 35.5107H2.10783C0.796831 35.5107 -0.195957 34.3264 0.0329525 33.0355L5.02683 4.87416C5.20525 3.868 6.07984 3.13485 7.1017 3.13485H17.2912C25.5184 3.13485 29.1288 6.21263 29.1288 10.7109C29.1288 13.8236 27.624 16.1838 24.5725 17.8755ZM16.1667 9.76391H15.0995C14.0744 9.76391 13.198 10.5017 13.0231 11.5118L12.6872 13.4528C12.4642 14.7412 13.4561 15.9195 14.7635 15.9195H14.8645C17.528 15.9195 19.3036 14.4398 19.3036 12.2498C19.3036 10.6517 18.1199 9.76391 16.1667 9.76391ZM10.3823 26.4125C10.1576 27.7016 11.1498 28.8816 12.4583 28.8816H13.1481C16.5218 28.8816 18.475 27.4611 18.475 25.0936C18.475 23.318 17.1729 22.4301 14.5094 22.4301H12.8482C11.824 22.4301 10.9481 23.1665 10.7723 24.1755L10.3823 26.4125Z"
            fill="#1A1D1E"
          />
        </svg>
      </div>
      <div className="flex h-10 justify-center">
        <DotesLoading className="bg-gray-800" size="h-2 w-2" />
      </div>
    </Page>
  );
};
