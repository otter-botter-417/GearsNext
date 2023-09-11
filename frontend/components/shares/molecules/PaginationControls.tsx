import { useRecoilState } from 'recoil';
import { paginationState } from '../atoms/state/paginationState';

/**
 * 商品一覧ページのページネーションコントロール
 * @returns 
 */
export const PaginationControls = () => {
  const [pagination, setPagination] = useRecoilState(paginationState);

  const handleNext = () => {
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };

  const handlePrev = () => {
    setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
  };

  return (
    <div>
      <button onClick={handlePrev} disabled={pagination.currentPage === 1}>
        Previous
      </button>
      <span>Page {pagination.currentPage}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
