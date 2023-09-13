import React from 'react';
import fetch from 'node-fetch';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';

import { useLayoutShowApi } from '@/hooks/api/useLayoutShowApi';
import { useFlashBackgroundOnRender } from '@/hooks/useFlashBackgroundOnRender';

import { LayoutDataTypes } from '@/components/types/LayoutDataTypes';
import { LayoutImageOnTagImageMap } from '@/components/pages/layoutPage/LayoutImageOnTagImageMap';
import { LayoutText } from '@/components/pages/layoutPage/LayoutText';
import { LayoutComments } from '@/components/pages/layoutPage/LayoutComments';
import { LayoutPageButtons } from '@/components/pages/layoutPage/LayoutPageButtons';

interface LayoutData {
  data: {
    data: LayoutDataTypes;
  };
}

// SSG　静的サイト生成のための関数　ビルド時に取得したデータをpropsとして渡す
export async function getStaticProps(context: GetStaticPropsContext) {
  const layoutId = context.params?.layoutId;
  const response = await fetch(`http://127.0.0.1:8000/api/layout/${layoutId}`);
  const itemData = (await response.json()) as LayoutData;
  return {
    props: {
      layoutDetail: itemData.data,
    },
    revalidate: 3600, // 60秒間隔で再生成
  };
}

export async function getStaticPaths() {
  const paths = [{ params: { layoutId: '1' } }];

  return {
    paths,
    fallback: 'blocking',
  };
}

/**
 * 商品詳細ページ
 * ユーザーの商品に対する状態(いいね、持っているもの)以外は静的サイト生成で表示
 * ユーザーの商品に対する状態はクライアントサイドで取得
 *
 * @param layoutDetail
 * @returns
 * @example
 * <ItemPage itemDetail={itemDetail} />
 */
export const LayoutPage = ({
  layoutDetail,
}: {
  layoutDetail: LayoutDataTypes;
}) => {
  const router = useRouter();
  const layoutId = router.query.layoutId;
  const backgroundColor = useFlashBackgroundOnRender();
  console.log(layoutDetail);

  useLayoutShowApi(layoutId as string);

  return (
    <div className="flashBackground" style={{ backgroundColor }}>
      <Box sx={{ width: '80%', margin: '0 auto' }}>
        <Grid container>
          {/* レイアウト画像 */}
          <Grid item xs={8}>
            <LayoutImageOnTagImageMap
              layoutId={layoutDetail.layoutId}
              tagPositions={layoutDetail.tagPositions}
            />
          </Grid>

          {/* 投稿テキスト */}
          <Grid item xs={4} sx={{ mb: 2 }}>
            <LayoutText
              text={layoutDetail.text}
              userName={layoutDetail.userName}
              userId={layoutDetail.userId}
              createdAt={layoutDetail.createdAt}
            />

            {/* いいねボタン */}

            <LayoutPageButtons createdAt={layoutDetail.createdAt}/>
            {/* コメント */}
            <LayoutComments comments={layoutDetail.comments} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default LayoutPage;
