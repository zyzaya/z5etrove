type Row = Record<string, any>;
type FilterCallback = (row: Row) => boolean;
type CompareEntries = (a: string, b: string) => number;
type CompareRows = (a: Row, b: Row) => number;
type CustomClassElementNames = {
    filterContainer?: string;
    filter?: string;
    paginationContainer?: string;
    paginationInfo?: string;
    paginationButton?: string;
    paginationPrevious?: string;
    paginationCurrent?: string;
    paginationNext?: string;
    table?: string;
    tr?: string;
    th?: string;
    thead?: string;
    tbody?: string;
    td?: string;
    selected?: string;
};
type CustomDataAttributeElementNames = {
    filterContainer?: Record<string, string>;
    filter?: Record<string, string>;
    paginationContainer?: Record<string, string>;
    paginationInfo?: Record<string, string>;
    paginationButton?: Record<string, string>;
    paginationPrevious?: Record<string, string>;
    paginationCurrent?: Record<string, string>;
    paginationNext?: Record<string, string>;
    table?: Record<string, string>;
    tr?: Record<string, string>;
    th?: Record<string, string>;
    thead?: Record<string, string>;
    tbody?: Record<string, string>;
    td?: Record<string, string>;
    selected?: Record<string, string>;
};
type ColumnConfiguration = {
    /**
     * The identifier of the column. Used to indicate
     * the column when configuring the grid.
     */
    id: string;
    /**
     * The displayed name of the column
     * Default is the same as id.
     */
    name?: string;
    /**
     * When set to a boolean it defines if the grid can (or cannot)
     * be sorted by that column
     * Default value is true.
     *
     * Alternatively it can be set to a compare function that takes
     * two rows (a, b) as parameters and returns 0, >0, or <0.
     *
     * return value | sort order |
     * :----------- | ---------- |
     * \> 0         | sort a after b, e.g. b, a |
     * \< 0         | sort b after a, e.g. a, b |
     * === 0        | keep original order of a and b |
     *
     */
    sort?: boolean | CompareEntries;
    /**
     * If the column should be displayed.
     * Defaults value is true.
     */
    visible?: boolean;
};
type Configuration = {
    /**
     * Contains the grid. Cannot have any child elements.
     */
    parent: HTMLElement;
    /**
     * Defines the columns of the grid.
     */
    columns: Array<ColumnConfiguration | string>;
    /**
     * Defines what is displayed in the cells of the table.
     * Default value is an empty array.
     *
     * An array where each element is a row. Rows can be described using either
     * an array or an object.
     *
     * - **array**: Defines the row as an array of strings. Each
     * string is a column and will be in the same order that the column headings
     * are defined in.
     * - **object**: Defines the row using key-value pairs. The key is the name of the
     * column as defined in the column configuration. The value is a string that is
     * displayed in the cell
     *
     * Extra values or values with a key that doesn't match a column are ignored.
     * If additional columns are added later these values can still be displayed,
     * but only if they have a key.
     *
     * Values that are not explicitly defined are set to an empty string.
     */
    data?: Array<Row | Array<string>>;
    /**
     * Defines how pagination functions in the grid.
     * Default value is false.
     *
     * - **false**: pagination is disabled and all values are displayed
     * on a single page.
     * - **number**: defines how many rows are displayed per page.
     * Must be positive.
     */
    pagination?: false | number;
    /**
     * Defines conditions to hide or display certain rows
     * Default value is an empty string.
     *
     * - **string**: only displays rows that have a cell that contains that string
     * - **FilterCallback**: a function that accepts a row as an argument and returns a boolean.
     * If true that row will be displayed, otherwise it will be hidden. The row
     * argument is an object where the keys are column names and the values are
     * the entries in that column.
     */
    filter?: string | FilterCallback;
    /**
     * Enables or disables selections
     * Default value is true.
     */
    selection?: boolean;
    /**
     * Indicates if the default search box elements should be displayed.
     * Default value is true.
     */
    searchbox?: boolean;
    /**
     * Fires when the value of the filter is changed through the ui.
     * Does not trigger if the filter is changed programmatically.
     * @param value The value the filter is set to
     */
    onFilter?: (value: string) => void;
    /**
     * Fires when the page is changed through the ui.
     * Does not trigger if the page is changed programmatically.
     * @param page The current page
     */
    onPageChange?: (page: number) => void;
    /**
     * Fires when the data is sorted through the ui.
     * Does not trigger if the data is sorted programmatically.
     * @param column The id of the column the data is sorted by.
     * @param ascending If the data is sorted in ascending order. Null if the data is switched to unsorted
     */
    onSort?: (column: string, ascending: boolean) => void;
    /**
     * Fires when the user clicks on one of the cells of the table.
     * @param column The column that was clicked. Left most column is 0, than 1, etc. Only visible columns are counted.
     * @param row The row that was clicked. Top column is 0, then 1 below that, etc. Only visible rows are counted.
     * @param columnName The name, as defined in the configuration, of the column clicked.
     * @param data The row, as key-value pairs. Key is the name of the column, value is the value of the record for that column. This includes hidden columns.
     */
    onClick?: (column: number, row: number, columnName: string, data: Row) => void;
    className?: CustomClassElementNames;
    dataAttribute?: CustomDataAttributeElementNames;
};
declare class zGrid {
    private currentPage;
    private columns;
    private data;
    private displayed_data;
    private pagination;
    private filter;
    private selection;
    private selected;
    private showFilter;
    private sortConfig;
    private parent;
    private body;
    private head;
    private ui_filter;
    private ui_pages;
    private ui_header_row;
    private header_cells;
    private pages_info;
    private pages_info_container;
    private onFilter;
    private onPageChange;
    private onSort;
    private onClick;
    private className;
    private dataAttribute;
    /**
     *
     * @param {Configuration} config
     * A configuration object defining how the grid
     * functions and the data it contains.
     * @param config.parent The HTMLElement that contains the grid
     * @param config.columns The columns that the grid contains
     * @param config.data The data within the grid
     * @param config.pagination How the grid handles pagination
     * @param config.filter How the grid is filtered
     */
    constructor(config: Configuration);
    private configureParent;
    private configureColumns;
    private initializeRow;
    private configureData;
    private configurePagination;
    private configureFilter;
    private configureClassName;
    private configureDataAttributes;
    private configureUI;
    reconfigure(config: Partial<Configuration>): void;
    /**
     * Sets the selected row
     * @param id The id value of the row to select
     * @returns The data of the row selected, or null or no row matches the id
     */
    setSelected(id: any): Row | null;
    /**
     * Gets the selected row.
     * @returns The data of the currently selected row or null if no row is selected
     */
    getSelected(): Row | null;
    /**
     * Adds a row with the specified data
     * @param data The data of the row, in the same format as configuration
     */
    addRow(data: Row | Array<string>): void;
    /**
     * Gets the data of a specific row
     * @param id The value of the id column
     * @returns An object representing the found row, or undefined if no row is found
     */
    getRow(id: any): Row;
    /**
     * Modifies the data in a single row
     * @param id The id of row to change
     * @param data The data to set the row to in the same format as configuration
     * with the exception that if no id is defined it will keep its original id
     */
    setRow(id: any, data: Row | Array<string>): void;
    /**
     * Removes a row
     * @param id  The value of the id column
     * @returns The data of the row as key/value pairs where the
     * keys are column ids, and the values are what is in the column.
     * If no row is found returns undefined.
     */
    removeRow(id: any): Row | undefined;
    /**
     * Changes the value of a specific cell
     * @param id The value of the id column of the row to change
     * @param column The column id of the cell to change
     * @param value The value to change the cell to
     */
    setCell(id: any, column: string, value: string): void;
    /**
     * Gets the data stored in zgrid, ignoring filter
     * sorting, and pagination
     * @returns An array of objects. Each element of the array is a single row.
     * The objects are key-value pairs where the key is the name of a column and
     * the value is what is in that cell
     */
    getRawData(): Array<Row>;
    /**
     * Gets the currently displayed data, after filtering
     * sorting, and pagination are applied.
     * @returns An array of objects. Each element of the array is a single row.
     * The objects are key-value pairs where the key is the name of a column and
     * the value is what is in that cell.
     */
    getData(): Array<Row>;
    get totalPages(): number;
    get page(): number;
    set page(page: number);
    /**
     * Defines conditions to hide or display certain rows
     * @param filter How to filter the data
     *
     * - **string**: Only displays rows that have a cell that contains
     * that string
     * - **FilterCallback**: a function that accepts a row as an argument and returns a boolean.
     * If true that row will be displayed, otherwise it will be hidden. The row
     * argument is an object where the keys are column names and the values are
     * the entries in that column.
     */
    setFilter(filter?: string | FilterCallback): void;
    /**
     * Clears any existing sort.
     */
    sort(): void;
    /**
     * Clears any existing sort when sort is set to false.
     * @param sort
     */
    sort(sort: false): void;
    /**
     * Sorts data by using the given compare function.
     * @param sort
     * A compare function that takes
     * two rows (a, b) as parameters and returns 0, >0, or <0.
     *
     * return value | sort order |
     * :----------- | ---------- |
     * \> 0         | sort a after b, e.g. b, a |
     * \< 0         | sort b after a, e.g. a, b |
     * === 0        | keep original order of a and b |
     */
    sort(sort: CompareRows): void;
    /**
     * Sorts the data by the named column. If the configuration for that
     * column has a sort function that function is used to sort it. Otherwise it uses
     * Javascript's comparison operators.
     * @param column The name of the column to sort by.
     */
    sort(column: string): void;
    /**
        * Sorts the data by the named column. If the configuration for that
     * column has a sort function that function is used to sort it. Otherwise it uses
     * Javascript's comparison operators.
     * @param column The name of the column to sort by.
     * @param ascending Whether to sort in ascending or descending order.
     */
    sort(column: string, ascending: boolean): void;
    private updateDisplayedData;
    private render;
    private renderHeader;
    private renderData;
}
export { zGrid };
