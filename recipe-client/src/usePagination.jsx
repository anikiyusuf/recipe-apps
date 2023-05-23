import { useMemo } from "react";

    export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) =>{
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize )

        const totalPageNumbers = siblingCount + 5;

        if(totalPageNumbers >= totalPageCount){
            return range( 1 , totalPageCount)
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount , 1)
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount, 
            totalPageCount
        );

        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex  < totalPageCount - 2
        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        if(!shouldShowLeftDots && shouldShowRightDots){
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(1 , leftItemCount)
            // eslint-disable-next-line no-undef
            return [ ...leftRange , DOTS , totalPageCount]
        }

        if(shouldShowLeftDots && shouldShowRightDots){
            let middleRange = range(leftSiblingIndex ,rightSiblingIndex )
            // eslint-disable-next-line no-undef
            return [firstPageIndex , DOTS , ...middleRange , lastPageIndex]
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [totalCount , pageSize , siblingCount ,currentPage ])
    return paginationRange
}



const range = ( start , end ) => {
    let length = end - start + 1

    return Array.from({ length} , (_ , idx) => idx + start)
}

export default usePagination