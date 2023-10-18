import { useRecoilState, useRecoilValue } from 'recoil';
import { paginationState } from '../atoms/state/paginationState';
import { Box } from '@mui/system';
import { Button, ButtonGroup } from '@mui/material';
import { filteredItemsState } from '../atoms/state/filteredItemsState';
import { useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
/**
 * 商品一覧ページのページネーションコントロールを提供します。
 * - Recoilのページネーションの状態を更新し、ページネーションを制御します。
 * - フィルターされたアイテムが変更されたら、ページネーションの現在のページ番号を1にリセットします。
 * - 次のページへ進む処理を提供します。
 * - 前のページへ戻る処理を提供します。
 *
 * @returns ページネーションコントロールエレメント
 */
export const PaginationControls = () => {
  // Recoilからページネーションの状態を取得
  const [pagination, setPagination] = useRecoilState(paginationState);
  const filteredItems = useRecoilValue(filteredItemsState);

  // ページネーションの情報を変数に格納
  const { currentPage, itemsPerPage } = pagination;

  // 総ページ数を計算（全アイテム数 ÷ 1ページあたりのアイテム数、小数点切り上げ）
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 「Previous」「Next」ボタンが無効化されるべきかどうかのフラグ
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  // 現在のページから±2ページの範囲でページ番号を表示
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  // ページ番号の配列を作成
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  // フィルターされたアイテムが変更されたら、ページネーションの現在のページ番号を1にリセット
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [filteredItems,setPagination]);

  if (totalPages === 1) return null;

  // スクロール処理 (ページネーションのボタンを押した時に画面をスクロールさせる)
  const handleScroll = () => {
    window.scroll({
      top: 300,
      left: 0,
      behavior: 'smooth',
    });
  };

  // 次、前のページへ進む処理
  const handleNext = () => {
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    handleScroll();
  };
  const handlePrev = () => {
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    handleScroll();
  };

  // ページ番号をクリックした時の処理
  const handlePageNumberClick = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      padding={3}
    >
      <ButtonGroup variant="outlined">
        {/* 前のページへのボタン */}
        <Button
          variant={'outlined'}
          onClick={handlePrev}
          disabled={isPrevDisabled}
          startIcon={<NavigateBeforeIcon />}
        >
          前へ
        </Button>
        {/* 現在のページ番号と総ページ数 */}
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageNumberClick(page)}
            disabled={page === currentPage}
          >
            {page}
          </Button>
        ))}
        {/* 次のページへのボタン */}
        <Button
          variant={'outlined'}
          onClick={handleNext}
          disabled={isNextDisabled}
          endIcon={<NavigateNextIcon />}
        >
          次へ
        </Button>
      </ButtonGroup>
    </Box>
  );
};
