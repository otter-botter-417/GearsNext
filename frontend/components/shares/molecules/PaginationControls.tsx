import { useRecoilState } from 'recoil';
import { paginationState } from '../atoms/state/paginationState';

/**
 * PaginationControls コンポーネント
 *
 * 商品一覧ページのページネーションコントロール。
 *
 * @returns ページネーションコントロールエレメント
 */
export const PaginationControls = () => {
  const [pagination, setPagination] = useRecoilState(paginationState);

  // 次のページへ進む処理
  const handleNext = () => {
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };

  // 前のページへ戻る処理
  const handlePrev = () => {
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
  };

  const { currentPage, itemsPerPage, totalItems } = pagination;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div>
      {totalPages > 1 && (
        <>
          <button onClick={handlePrev} disabled={isPrevDisabled}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={isNextDisabled}>
            Next
          </button>
        </>
      )}
    </div>
  );
};
