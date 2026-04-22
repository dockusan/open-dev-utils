import { useCallback, useEffect, useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { TwoPanel } from '@/components/TwoPanel';
import { Textarea } from '@/components/ui/textarea';
import { convertCodeStringToSql } from '@/lib/sqlStringToSql';

const SAMPLE_INPUT = `"SELECT ast.* " +
                            "FROM research_response.survey_response_tracker srt " +
                            "JOIN research_response.offline_sync_data osd " +
                            "  ON srt.task_instance_id = osd.task_instance_id " +
                            "JOIN research_response.activity_submission_tracking ast " +
                            "  ON ast.offline_sync_data_id = osd.id " +
                            " AND ast.completion_time_utc = srt.completion_time_utc " +
                            "WHERE srt.id = :surveyResponseTrackerId"`;

export function SqlStringExtractor({ toolId }: { toolId: string }) {
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [output, setOutput] = useState('');

  const convert = useCallback((value: string) => {
    if (!value.trim()) {
      setOutput('');
      return;
    }

    try {
      setOutput(convertCodeStringToSql(value));
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    }
  }, []);

  useEffect(() => {
    convert(input);
  }, [convert, input]);

  return (
    <div id={toolId} className="h-full p-6">
      <TwoPanel
        leftTitle="Java / JavaScript SQL String"
        leftPanel={
          <Textarea
            placeholder="Paste Java or JavaScript SQL string here..."
            className="h-full resize-none border-0 bg-transparent p-4 font-mono text-sm outline-none focus-visible:ring-0"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        }
        rightTitle="SQL Query"
        rightPanel={
          <Textarea
            readOnly
            className="h-full resize-none border-0 bg-transparent p-4 font-mono text-sm outline-none focus-visible:ring-0"
            value={output}
          />
        }
        rightActions={<CopyButton value={output} disabled={!output || output.startsWith('Error:')} />}
      />
    </div>
  );
}
