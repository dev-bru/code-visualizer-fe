
const CodePanel = ({ code, currentLine }: { code: string; currentLine?: number }) => {
  const lines = code.split('\n');

  return (
    <div style={codePanelStyles.panel}>
      <div style={codePanelStyles.header}>
        <span>📄</span>
        <span style={codePanelStyles.title}>Code</span>
      </div>
      <div style={codePanelStyles.content}>
        <table style={codePanelStyles.table}>
          <tbody>
            {lines.map((line, index) => (
              <tr
                key={index}
                style={{
                  ...codePanelStyles.row,
                  ...(index + 1 === currentLine ? codePanelStyles.currentRow : {}),
                }}
              >
                <td style={codePanelStyles.lineNumber}>{index + 1}</td>
                <td style={codePanelStyles.gutter}>
                  {index + 1 === currentLine && <span>▶</span>}
                </td>
                <td style={codePanelStyles.lineContent}>
                  <code>{line || ' '}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const codePanelStyles = {
  panel: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden' as const,
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: '#f9f9f7',
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '8px',
  },
  title: {
    color: 'var(--color-text)',
  },
  content: {
    flex: 1,
    overflow: 'auto' as const,
    backgroundColor: '#fafaf8',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: 'var(--font-family-mono)',
    fontSize: '13px',
    lineHeight: '1.6',
  },
  row: {
    transition: 'background-color 0.15s ease',
  },
  currentRow: {
    backgroundColor: 'var(--color-highlight)',
  },
  lineNumber: {
    padding: '0 12px',
    textAlign: 'right' as const,
    userSelect: 'none' as const,
    color: 'var(--color-text-light)',
    backgroundColor: '#f0f0ed',
    width: '40px',
    minWidth: '40px',
    borderRight: '1px solid var(--color-border)',
    fontSize: '12px',
  },
  gutter: {
    width: '24px',
    minWidth: '24px',
    padding: '0 8px',
    textAlign: 'center' as const,
    userSelect: 'none' as const,
    color: 'var(--color-primary)',
  },
  lineContent: {
    padding: '0 16px',
    color: 'var(--color-text)',
    wordBreak: 'break-all' as const,
  },
};

export default CodePanel;