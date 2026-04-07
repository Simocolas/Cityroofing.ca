interface QuickAnswerBoxProps {
  children: React.ReactNode;
}

export default function QuickAnswerBox({ children }: QuickAnswerBoxProps) {
  return (
    <div
      style={{
        borderLeft: '4px solid var(--color-primary)',
        backgroundColor: 'var(--color-surface)',
        padding: '24px 28px',
        borderRadius: '0 6px 6px 0',
        marginBottom: '48px',
      }}
    >
      <p
        style={{
          fontSize: '11px',
          letterSpacing: '2px',
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Quick Answer
      </p>
      <p
        style={{
          color: 'var(--color-text-primary)',
          fontSize: '16px',
          lineHeight: 1.7,
        }}
      >
        {children}
      </p>
    </div>
  );
}
