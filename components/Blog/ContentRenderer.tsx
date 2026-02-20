"use client";

interface ContentRendererProps {
  content: string;
}

interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

export function ContentRenderer({ content }: ContentRendererProps) {
  let parsed: { type: string; content?: TipTapNode[] };
  
  try {
    parsed = JSON.parse(content);
  } catch {
    return <p className="text-muted-foreground">Content could not be rendered.</p>;
  }

  const renderNode = (node: TipTapNode, index: number): React.ReactNode => {
    const key = `${node.type}-${index}`;

    switch (node.type) {
      case "doc":
        return node.content?.map((child, i) => renderNode(child, i));

      case "paragraph":
        return (
          <p key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </p>
        );

      case "heading": {
        const level = (node.attrs?.level as number) || 2;
        const text = node.content?.map((c) => c.text || "").join("") || "";
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const HeadingTag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
        return (
          <HeadingTag key={key} id={id}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        );
      }

      case "text": {
        let element: React.ReactNode = node.text;
        if (Array.isArray(node.marks)) {
          for (const mark of node.marks) {
            switch (mark.type) {
              case "bold":
                element = <strong key={key}>{element}</strong>;
                break;
              case "italic":
                element = <em key={key}>{element}</em>;
                break;
              case "code":
                element = <code key={key}>{element}</code>;
                break;
              case "link":
                element = (
                  <a key={key} href={mark.attrs?.href as string} target="_blank" rel="noopener noreferrer">
                    {element}
                  </a>
                );
                break;
            }
          }
        }
        return element;
      }

      case "bulletList":
        return (
          <ul key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </ul>
        );

      case "orderedList":
        return (
          <ol key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </ol>
        );

      case "listItem":
        return (
          <li key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </li>
        );

      case "blockquote":
        return (
          <blockquote key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </blockquote>
        );

      case "codeBlock":
        return (
          <pre key={key}>
            <code>{node.content?.map((c) => c.text).join("")}</code>
          </pre>
        );

      case "image":
        return (
          <figure key={key} className="my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.attrs?.src as string}
              alt={(node.attrs?.alt as string) || ""}
              className="rounded-lg w-full h-auto"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {node.attrs?.alt && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {node.attrs.alt as string}
              </figcaption>
            )}
          </figure>
        );

      case "youtube":
        return (
          <div key={key} className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${node.attrs?.src}`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case "table":
        return (
          <table key={key}>
            <tbody>
              {node.content?.map((child, i) => renderNode(child, i))}
            </tbody>
          </table>
        );

      case "tableRow":
        return (
          <tr key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </tr>
        );

      case "tableCell":
        return (
          <td key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </td>
        );

      case "tableHeader":
        return (
          <th key={key}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </th>
        );

      case "horizontalRule":
        return <hr key={key} />;

      case "hardBreak":
        return <br key={key} />;

      default:
        return null;
    }
  };

  return (
    <div className="prose">
      {parsed.content?.map((node, i) => renderNode(node, i))}
    </div>
  );
}
