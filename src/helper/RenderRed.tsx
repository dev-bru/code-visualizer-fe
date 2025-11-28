/* eslint-disable @typescript-eslint/no-explicit-any */
type EncodedValue = string | number | boolean | null | ["REF", number];

export const renderRef = (
  value: EncodedValue,
  heap: Record<string, any>
): React.ReactNode => {
  if (Array.isArray(value) && value[0] === "REF") {
    const id = String(value[1]);
    const entry = heap[id];
    if (!entry)
      return (
        <>
          → <span data-ref-id={id}>#{id}</span>
        </>
      );

    const [tag, payload] = entry as [string, any];

    if (tag === "CLASS") {
      return (
        <>
          → <span data-ref-id={id}>class {payload}</span>
        </>
      );
    }
    if (tag === "INSTANCE") {
      return (
        <>
          →{" "}
          <span data-ref-id={id}>
            {payload} instance #{id}
          </span>
        </>
      );
    }
    if (tag === "LIST") {
      return (
        <>
          → <span data-ref-id={id}>list #{id}</span>
        </>
      );
    }
    if (tag === "DICT") {
      return (
        <>
          → <span data-ref-id={id}>dict #{id}</span>
        </>
      );
    }
    if (tag === "FUNCTION") {
      return (
        <>
          → <span data-ref-id={id}>{payload}</span>
        </>
      );
    }
    return (
      <>
        → <span data-ref-id={id}>#{id}</span>
      </>
    );
  }

  return <>{String(value)}</>;
};
