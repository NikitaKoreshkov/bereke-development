type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
