import { describe, expect, it } from 'vitest';
import { convertCodeStringToSql, extractSqlFromCode } from './sqlStringToSql';

describe('extractSqlFromCode', () => {
  it('extracts SQL from concatenated Java strings', () => {
    const input = `"SELECT ast.* " +
      "FROM rr.srttt srt " +
      "JOIN rr.osd osd " +
      "  ON srt.tii = osd.tii " +
      "JOIN rr.astr ast " +
      "  ON ast.osdi = osd.id " +
      " AND ast.completion_time_utc = srt.completion_time_utc " +
      "WHERE srt.id = :surveyResponseTrackerId"`;

    expect(extractSqlFromCode(input)).toBe(
      'SELECT ast.* FROM rr.srttt srt JOIN rr.osd osd   ON srt.tii = osd.tii JOIN rr.astr ast   ON ast.osdi = osd.id  AND ast.completion_time_utc = srt.completion_time_utc WHERE srt.id = :surveyResponseTrackerId'
    );
  });

  it('keeps dynamic expressions as placeholders', () => {
    const input = `const sql = "SELECT * FROM users WHERE id = " + userId + " AND status = " + status;`;

    expect(extractSqlFromCode(input)).toBe(
      'SELECT * FROM users WHERE id = {{userId}} AND status = {{status}}'
    );
  });

  it('supports template literals', () => {
    const input = 'const sql = `SELECT * FROM orders WHERE tenant_id = ${tenantId}`;';

    expect(extractSqlFromCode(input)).toBe(
      'SELECT * FROM orders WHERE tenant_id = {{tenantId}}'
    );
  });

  it('passes through plain SQL unchanged before formatting', () => {
    const input = 'select * from users where id = 1';

    expect(convertCodeStringToSql(input)).toBe(
      ['SELECT', '  *', 'FROM', '  users', 'WHERE', '  id = 1'].join('\n')
    );
  });
});
