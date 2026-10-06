interface Props {
  sent?: boolean;
  error?: string | null;
  sentMessage: string;
}

/** Inline success / error status for lead forms. */
export function FormStatus({ sent, error, sentMessage }: Props) {
  if (sent) {
    return (
      <div role="status" className="rounded-[10px] bg-success-soft px-4 py-3.5 text-[14px] font-semibold text-success-ink">
        {sentMessage}
      </div>
    );
  }
  if (error) {
    return (
      <div role="alert" className="rounded-[10px] bg-[#FBEAE7] px-4 py-3.5 text-[14px] font-semibold text-error">
        {error}
      </div>
    );
  }
  return null;
}
