'use client';

type Props = {
    pagination: {
        total: number;
        totalPage: number;
        currentPage: number;
        pageSize: number;
    };
    setFilters: (updater) => void;
};

const Pagination = ({ pagination, setFilters }: Props) => {
    const { currentPage, totalPage, total, pageSize } = pagination;

    // Calculate start and end indices for display
    const startIdx = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endIdx = Math.min(currentPage * pageSize, total);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPage) return;
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    // Generate page numbers for display (show up to 5 pages around current)
    const getPageNumbers = () => {
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPage, currentPage + 2);
        if (currentPage <= 2) end = Math.min(5, totalPage);
        if (currentPage >= totalPage - 1) start = Math.max(1, totalPage - 4);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    if (totalPage <= 1) return null;

    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-6 px-2">
            {/* Showing X–Y of Z Students */}
            <span className="text-sm text-gray-600 dark:text-gray-300">
                Showing <span className="font-bold">{startIdx}</span>-
                <span className="font-bold">{endIdx}</span> of <span className="font-bold">{total}</span> items
            </span>

            {/* Page X of Y and page buttons */}
            <div className="flex items-center gap-2">
                <button
                    className="px-4 py-2 bg-[#205D80] text-white rounded-lg font-semibold disabled:opacity-60"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {/* Page number buttons */}
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1 rounded-lg font-semibold border transition
                            ${page === currentPage
                                ? 'bg-[#205D80] text-white border-[#205D80]'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 hover:bg-blue-50 dark:hover:bg-blue-800'
                            }`}
                        onClick={() => handlePageChange(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="px-4 py-2 bg-[#205D80] text-white rounded-lg font-semibold disabled:opacity-60"
                    disabled={currentPage === totalPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            {/* Page X of Y */}
            <span className="text-gray-700 dark:text-gray-200 text-sm">
                Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPage}</span>
            </span>
        </div>
    );
};

export default Pagination;
