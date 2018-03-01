import {
  UniqueViolationError,
  NotNullViolationError,
  DBError
} from 'objection-db-errors';

export default function errorHandler(err, req, res, next) {
  if (err instanceof UniqueViolationError) {
    console.log(
      `Unique constraint ${err.constraint} failed for table ${
        err.table
      } and columns ${err.columns}`
    );
  } else if (err instanceof NotNullViolationError) {
    console.log(
      `Not null constraint failed for table ${err.table} and column ${
        err.column
      }`
    );
  } else if (err instanceof DBError) {
    console.log('Some unknown DB error:', err);
  } else {
    console.log('Database error:', JSON.stringify(err, null, 4));
  }

  res.status(err.status || 500).json({ message: err.message });
}
