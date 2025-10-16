import React from 'react';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'percentage' | 'currency' | 'change';
  align?: 'left' | 'right' | 'center';
}

export interface TableRow {
  [key: string]: any;
}

interface DataTableProps {
  columns: TableColumn[];
  data: TableRow[];
  title?: string;
  maxRows?: number;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  title, 
  maxRows = 10 
}) => {
  const formatCellValue = (value: any, column: TableColumn) => {
    if (value === null || value === undefined) return '-';
    
    switch (column.type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(value);
      case 'percentage':
        return `${typeof value === 'number' ? value.toFixed(2) : value}%`;
      case 'number':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(value);
      case 'change':
        const changeClass = value >= 0 ? 'positive' : 'negative';
        const changeSymbol = value >= 0 ? '+' : '';
        return (
          <span className={changeClass}>
            {changeSymbol}{typeof value === 'number' ? value.toFixed(2) : value}%
          </span>
        );
      default:
        return String(value);
    }
  };

  const getCellClass = (column: TableColumn) => {
    const classes = [];
    if (column.type === 'number' || column.type === 'currency' || column.type === 'percentage') {
      classes.push('number');
    }
    if (column.align) {
      classes.push(`text-${column.align}`);
    }
    return classes.join(' ');
  };

  const displayData = data.slice(0, maxRows);

  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <div className="card-title">{title}</div>
        </div>
      )}
      <div className="card-content no-padding">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={getCellClass(column)}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className={getCellClass(column)}>
                    {formatCellValue(row[column.key], column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};